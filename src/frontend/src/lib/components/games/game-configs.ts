import type { GameType, GameConfig } from "$lib/types";

export const gameConfigs: Record<GameType, GameConfig> = {
  mulligans: {
    title: "Mulligans",
    opponentConfig: {
      multiple: true,
    },
  },
  prophet: {
    title: "Prophet",
    opponentConfig: {
      multiple: false,
    },
  },
  bands: {
    title: "Bands",
    opponentConfig: {
      multiple: true,
      maxPlayers: 4,
    },
  },
  "build-it": {
    title: "Build It",
    opponentConfig: {
      playerLabels: ["Player A", "Player B", "Player C"],
    },
  },
  "next-up": {
    title: "Next Up",
    opponentConfig: {
      multiple: true,
      maxPlayers: 2,
    },
  },
};
