export type GameType =
  | "mulligans"
  | "prophet"
  | "bands"
  | "build-it"
  | "next-up";

export type OpponentConfig = {
  multiple?: boolean;
  maxPlayers?: number;
  playerLabels?: string[];
};

export type GameConfig = {
  title: string;
  opponentConfig: OpponentConfig;
};
