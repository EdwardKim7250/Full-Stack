import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Game } from '../types';
import './GameDetail.css';

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}`, {
          params: { key: RAWG_KEY },
        });
        setGame(res.data);
      } catch (err) {
        console.error('Failed to fetch game', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!game || added) return;
    setAdding(true);
    try {
      await axios.post(`${API_URL}/api/wishlist`, {
        gameId: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
      });
      setAdded(true);
    } catch (err) {
      console.error('Failed to add to wishlist', err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <div className="detail-skeleton" />
        </div>
      </div>
    );
  }

  if (!game) return <div className="detail-page"><p>Game not found.</p></div>;

  const platforms = game.platforms?.map((p) => p.platform.name) ?? [];
  const genres = game.genres?.map((g) => g.name).join(' · ') ?? '';
  const developer = game.developers?.[0]?.name ?? '';

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-card">
          <div className="detail-cover">
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} />
            ) : (
              <div className="detail-cover-placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M12 24h8M28 24h8M24 16v8M24 28v4" stroke="#888" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="5" fill="#555"/>
                </svg>
              </div>
            )}
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{game.name}</h1>
            <p className="detail-meta">
              {[developer, genres, game.released].filter(Boolean).join('  ·  ')}
            </p>

            {game.description_raw && (
              <p className="detail-description">
                {game.description_raw.slice(0, 300)}
                {game.description_raw.length > 300 ? '...' : ''}
              </p>
            )}

            <div className="platform-tags">
              {platforms.map((p) => (
                <span key={p} className="platform-tag">{p}</span>
              ))}
            </div>

            {game.metacritic && (
              <p className="metacritic">Metacritic: <strong>{game.metacritic}</strong></p>
            )}

            <button
              className={`wishlist-btn ${added ? 'added' : ''}`}
              onClick={handleAddToWishlist}
              disabled={adding || added}
            >
              {added ? '✓ Added to wishlist' : adding ? 'Adding...' : '+ Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
