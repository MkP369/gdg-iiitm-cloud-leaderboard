import "../styles/Leaderboard.css";
import blueTick from "../assets/bluetick.jpg";

export default function Leaderboard({ data, searchTerm }) {
  return (
    <div className="leaderboard-container">
      {searchTerm && (
        <div className="search-results-info">
          {data.length > 0 ? (
            <p>
              Found {data.length} participant{data.length !== 1 ? "s" : ""}{" "}
              matching "{searchTerm}"
            </p>
          ) : (
            <p>No participants found matching "{searchTerm}"</p>
          )}
        </div>
      )}

      <table className="leaderboard-table">
        <thead className="leaderboard-header">
          <tr>
            <th className="rank-cell">Rank</th>
            <th className="rank-change-cell">Change</th>
            <th className="name-cell">User Name</th>
            <th className="badges-cell">Skill Badges</th>
            <th className="games-cell">Arcade Games</th>
            <th className="status-cell">Profile Status</th>
            <th className="redemption-cell">Redemption Status</th>
          </tr>
        </thead>
        <tbody className="leaderboard-body">
          {data.map((entry) => (
            <tr key={entry.profileURL}>
              <td className="rank-cell">{entry.rank}</td>
              <td className="rank-change-cell">
                {entry.rankChange === null ? (
                  <span className="rank-new">NEW</span>
                ) : entry.rankChange > 0 ? (
                  <span className="rank-up">
                    ↗ {entry.rankChange}
                  </span>
                ) : entry.rankChange < 0 ? (
                  <span className="rank-down">
                    ↘ {Math.abs(entry.rankChange)}
                  </span>
                ) : (
                  <span className="rank-same">—</span>
                )}
              </td>
              <td className="name-cell">
                <a
                  href={entry.profileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  {entry.userName}
                </a>
                {entry.skillBadges >= 19 && entry.arcadeGames >= 1 && (
                  <img src={blueTick} alt="Completed" className="blue-tick" />
                )}
              </td>
              <td className="badges-cell">{entry.skillBadges}</td>
              <td className="games-cell">{entry.arcadeGames}</td>
              <td className="status-cell">
                <span
                  className={
                    entry.profileStatus === "All Good"
                      ? "status-good"
                      : "status-issue"
                  }
                >
                  {entry.profileStatus}
                </span>
              </td>
              <td className="redemption-cell">
                <span
                  className={
                    entry.redemptionStatus === "Yes"
                      ? "redemption-yes"
                      : "redemption-no"
                  }
                >
                  {entry.redemptionStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
