export interface rowAndScore {
  row: number[];
  score: number;
}

export interface zeroValues {
  number: number;
  index: number;
}

export type Direction = "Right" | "Left" | "Up" | "Down";

export interface rowsAndScore {
  rows: number[][];
  score: number;
}
