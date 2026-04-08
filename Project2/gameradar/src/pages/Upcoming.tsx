import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { Game } from '../types';
import './Home.css';

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY;
const PLATFORMS: { label: string; id: number | null }[] = [
  { label: 'All', id: null },
  { label: 'PC', id: 4 },
  { label: 'PS5', id: 187 },
  { label: 'Xbox', id: 186 },
  { label: 'Switch', id: 7 },
];

export default function Upcoming() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlatform, setActivePlatform] = useState<number | null>(null);

  useEffect(() => {
    fetchGames();
  }, [activePlatform]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
        .toISOString().split('T')[0];

      const params: Record<string, string> = {
        key: RAWG_KEY,
        dates: `${today},${future}`,
        ordering: '-added',
        page_size: '18',
      };
      if (activePlatform) params.platforms = String(activePlatform);

      const res = await axios.get('https://api.rawg.io/api/games', { params });
      setGames(res.data.results);
    } catch (err) {
      console.error('Failed to fetch games', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-banner">
        <div className="banner-content">
          <h1>Most Anticipated</h1>
          <p>Games coming in the next 12 months</p>
        </div>
      </div>

      <div className="home-container">
        <div className="filter-bar">
          {PLATFORMS.map((p) => (
            <button
              key={p.label}
              className={`filter-btn ${activePlatform === p.id ? 'active' : ''}`}
              onClick={() => setActivePlatform(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
