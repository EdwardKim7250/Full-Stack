import { useNavigate } from 'react-router-dom';
import { Game } from '../types';
import './GameCard.css';

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
      <div className="game-card-image">
        {game.background_image ? (
          <img src={game.background_image} alt={game.name} />
        ) : (
          <div className="game-card-placeholder">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 20h6M23 20h6M20 13v6M20 21v6" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="4" fill="#555"/>
            </svg>
          </div>
        )}
      </div>
      <div className="game-card-info">
        <h3 className="game-card-title">{game.name}</h3>
        <p className="game-card-date">Releases: {game.released || 'TBA'}</p>
      </div>
    </div>
  );
}
