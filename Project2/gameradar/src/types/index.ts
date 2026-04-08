export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string | null;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
  developers?: { id: number; name: string }[];
  description_raw?: string;
  metacritic?: number;
}

export interface WishlistGame {
  _id?: string;
  gameId: number;
  name: string;
  released: string;
  background_image: string | null;
}
