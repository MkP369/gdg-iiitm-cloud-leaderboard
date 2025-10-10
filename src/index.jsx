import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import Leaderboard from './components/Leaderboard';
import IntroVideo from './components/IntroVideo';
import leaderboard from './data/leaderboard.json';
import './style.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter leaderboard data based on search term
  const filteredData = searchTerm
    ? leaderboard.filter(participant =>
        participant.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : leaderboard;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main>
      <IntroVideo/>
      <Navbar/>
      <StatsCards />
      <SearchBar onSearch={handleSearch} />
      <Leaderboard data={filteredData} searchTerm={searchTerm} />
    </main>
  );
};

render(<App />, document.getElementById('app'));
