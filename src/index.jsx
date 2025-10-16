import { h, render } from "preact";
import { useState } from "preact/hooks";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import SearchBar from "./components/SearchBar";
import Leaderboard from "./components/Leaderboard";
import leaderboard from "./data/leaderboard.json";
import "./styles/fonts.css";
import "./style.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchTerm
    ? leaderboard.filter((participant) =>
        participant.userName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : leaderboard;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main>
      <Navbar />
      <StatsCards />
      <SearchBar onSearch={handleSearch} />
      <Leaderboard data={filteredData} searchTerm={searchTerm} />
    </main>
  );
};

render(<App />, document.getElementById("app"));
