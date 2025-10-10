// @ts-nocheck

// scripts/processLeaderboard.js
import { writeFileSync } from "fs";
import { parse } from "csv-parse/sync";
import fetch from "node-fetch";

// === CONFIG === 
const sheetId = "1X_FycrKBFJW5Ajsb9NOOeKi39-yWTud0TDyUOpy9DMM"; // 🔴 Put your Google Sheet ID here
if (!sheetId) throw new Error("❌ Missing Google Sheet ID!");

// === FETCH CSV ===
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

(async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status} ${res.statusText}`);
  const csv = await res.text();

  // === PARSE CSV ===
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  // === CLEAN DATA (omit emails!) ===
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

  // Helper function to define priority groups
  const getGroupPriority = (person) => {
    // Group 1 (highest priority): Redeemed and has progress
    if (person.redemptionStatus === "Yes" && (person.skillBadges > 0 || person.arcadeGames > 0)) {
      return 1;
    }
    // Group 2 (second priority): Redeemed but no progress
    if (person.redemptionStatus === "Yes" && person.skillBadges === 0 && person.arcadeGames === 0) {
      return 2;
    }
    // Group 3 (lowest priority): Haven't redeemed
    return 3;
  };

  // === SORT: Custom hierarchical sorting ===
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

  // === ASSIGN RANKS (Hierarchical with Custom Group Ranks) ===
  const leaderboard = [];
  
  // Pre-calculate the size of the lower-priority groups for their custom rank
  const group2Count = cleaned.filter(p => getGroupPriority(p) === 2).length;
  const group3Count = cleaned.filter(p => getGroupPriority(p) === 3).length;

  let lastRank = 0;
  let lastTopGroupPerson = null; 

  cleaned.forEach((row, index) => {
    const priority = getGroupPriority(row);
    let rank;

    if (priority === 1) {
      // Group 1: Assign normal competition rank (1, 2, 2, 4...)
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
      // Group 2: Rank is the total count of people in this group
      rank = group2Count > 0 ? group2Count : "-";
    } else { // priority === 3
      // Group 3: Rank is the total count of people in this group
      rank = group3Count > 0 ? group3Count : "-";
    }
    
    leaderboard.push({ ...row, rank });
  });

  // === WRITE JSON ===
  writeFileSync(
    "src/data/leaderboard.json",
    JSON.stringify(leaderboard, null, 2),
    "utf8"
  );
  console.log(`✅ Wrote ${leaderboard.length} rows → src/data/leaderboard.json`);
})().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});