// @ts-nocheck

import { parse } from "csv-parse/sync";

const sheetId = Bun.env.GOOGLE_SHEET_ID;
if (!sheetId) throw new Error("❌ Missing GOOGLE_SHEET_ID environment variable!");

// === LOAD PREVIOUS LEADERBOARD FOR RANK COMPARISON ===
let previousLeaderboard = [];
try {
  const previousData = await Bun.file("src/data/leaderboard.json").text();
  previousLeaderboard = JSON.parse(previousData);
  console.log(`📊 Loaded ${previousLeaderboard.length} previous entries for rank comparison`);
} catch (error) {
  console.log("📊 No previous leaderboard found, this will be the first run");
}


const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

(async () => {

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status} ${res.statusText}`);
  const csv = await res.text();

  
  const records = parse(csv, { columns: true, skip_empty_lines: true });

 
  const cleaned = records.map((entry) => {
    const skillRaw = entry["# of Skill Badges Completed"] || "0";
    const arcadeRaw = entry["# of Arcade Games Completed"] || "0";

    const skillBadges = parseInt(skillRaw.replace(/[^\d-]/g, ""), 10) || 0;
    const arcadeGames = parseInt(arcadeRaw.replace(/[^\d-]/g, ""), 10) || 0;

    return {
      userName: (entry["User Name"] || "").trim(),
      profileURL: (entry["Google Cloud Skills Boost Profile URL"] || "").trim(),
      profileStatus: (entry["Profile URL Status"] || "").trim(),
      redemptionStatus: (entry["Access Code Redemption Status"] || "").trim(),
      skillBadges,
      arcadeGames,
    };
  });

  
  const getGroupPriority = (person) => {
    if (person.redemptionStatus === "Yes" && (person.skillBadges > 0 || person.arcadeGames > 0)) return 1;
    if (person.redemptionStatus === "Yes" && person.skillBadges === 0 && person.arcadeGames === 0) return 2;
    return 3;
  };

  cleaned.sort((a, b) => {
    const aPriority = getGroupPriority(a);
    const bPriority = getGroupPriority(b);

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    if (b.skillBadges !== a.skillBadges) return b.skillBadges - a.skillBadges;
    if (b.arcadeGames !== a.arcadeGames) return b.arcadeGames - a.arcadeGames;
    return a.userName.localeCompare(b.userName);
  });

  const leaderboard = [];
  
  const group1Count = cleaned.filter(p => getGroupPriority(p) === 1).length;
  const group2Count = cleaned.filter(p => getGroupPriority(p) === 2).length;

  let lastRank = 0;
  let lastTopGroupPerson = null; 

  cleaned.forEach((row, index) => {
    const priority = getGroupPriority(row);
    let rank;

    if (priority === 1) {
      const isTie = lastTopGroupPerson && 
                      row.skillBadges === lastTopGroupPerson.skillBadges &&
                      row.arcadeGames === lastTopGroupPerson.arcadeGames;
      if (isTie) {
        rank = lastRank;
      } else {
        rank = index + 1;
      }
      lastRank = rank;
      lastTopGroupPerson = row;
    } else if (priority === 2) {
      rank = group1Count + group2Count;
    } else { 
      rank = cleaned.length;
    }
    
    leaderboard.push({ ...row, rank });
  });

  // === CALCULATE RANK CHANGES ===
  leaderboard.forEach(person => {
    const previousEntry = previousLeaderboard.find(prev => prev.profileURL === person.profileURL);
    
    if (previousEntry) {
      const rankDifference = previousEntry.rank - person.rank; // Positive = moved up, Negative = moved down
      person.rankChange = rankDifference;
    } else {
      person.rankChange = null; // New entry
    }
  });

  
  await Bun.write(
    "src/data/leaderboard.json",
    JSON.stringify(leaderboard, null, 2)
  );

  console.log(`✅ Wrote ${leaderboard.length} rows → src/data/leaderboard.json`);
})().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
