import leaderboard from "../data/leaderboard.json";
import "../styles/StatsCards.css";

export default function StatsCards() {
  const totalParticipants = 244;
  const completionGoal = 150;

  // Count eligible participants (19 skill badges + 1 arcade game)
  const eligibleParticipants = leaderboard.filter(
    (participant) =>
      participant.skillBadges >= 19 && participant.arcadeGames >= 1,
  ).length;

  // Calculate progress percentage
  const progressPercentage = Math.min(
    (eligibleParticipants / completionGoal) * 100,
    100,
  );

  return (
    <div className="stats-container">
      <div className="stats-cards">
        {/* Total Participants Card */}
        <div className="stats-card participants-card">
          <div className="card-content">
            <h3 className="card-title">Total Participants</h3>
            <p className="card-value">{totalParticipants.toLocaleString()}</p>
          </div>
        </div>

        {/* Eligible for Swags Card */}
        <div className="stats-card eligible-card">
          <div className="card-content">
            <h3 className="card-title">Swag Contenders</h3>
            <p className="card-value">{eligibleParticipants}</p>
          </div>
        </div>

        {/* Progress Card (Percentage only) */}
        <div className="stats-card progress-card">
          <div className="card-content">
            <h3 className="card-title">Goal Progress</h3>
            <p className="card-value">{progressPercentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
