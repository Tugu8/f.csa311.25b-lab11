export interface GameState {
  cells: Cell[];
  instructions: string; // Зааварчилгааны текст
}

export interface Cell {
  text: string;
  playable: boolean;
  x: number;
  y: number;
}
