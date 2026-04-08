import { useState, useEffect } from 'react';
import axios from 'axios';
import { WishlistGame } from '../types';
import './Wishlist.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`);
      setWishlist(res.data);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error('Failed to remove game', err);
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-card">
          <h2 className="wishlist-heading">Wishlist</h2>

          {loading ? (
            <div className="wishlist-loading">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="wishlist-skeleton" />
              ))}
            </div>
          ) : wishlist.length === 0 ? (
            <p className="wishlist-empty">
              Your wishlist is empty. Browse upcoming games and add some!
            </p>
          ) : (
            <div className="wishlist-list">
              {wishlist.map((game) => (
                <div key={game._id} className="wishlist-item">
                  <div className="wishlist-cover">
                    {game.background_image ? (
                      <img src={game.background_image} alt={game.name} />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h4M15 12h4M12 8v4M12 16v1" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="3" fill="#555"/>
                      </svg>
                    )}
                  </div>
                  <div className="wishlist-info">
                    <p className="wishlist-name">{game.name}</p>
                    <p className="wishlist-date">Releases: {game.released || 'TBA'}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => game._id && handleRemove(game._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
