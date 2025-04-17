import { derived } from "svelte/store";
import { gameStateStore } from "../stores/game-state-store";
import { currentCourseStore } from "../stores/current-course-store";
import { currentHoleStore } from "../stores/current-hole-store";
import type {
  MulligansScores,
  PrincipalId,
  MulligansHoleResult,
  Game,
} from "../../../../declarations/backend/backend.did";

export const mulligansScores = derived(gameStateStore, ($gameStateStore) => {
  if (!$gameStateStore || $gameStateStore.scoreDetail.length === 0) return null;
  const detail = $gameStateStore.scoreDetail[0];
  if ("MulligansScores" in detail) {
    return detail.MulligansScores as MulligansScores;
  }
  return null;
});

export const currentHole = derived(
  [mulligansScores, currentHoleStore],
  ([$mulligansScores, $currentHole]) => {
    return (
      $currentHole || ($mulligansScores ? $mulligansScores.currentHole : 1)
    );
  },
);

export const availableMulligans = derived(
  [mulligansScores, gameStateStore],
  ([$mulligansScores, $gameStateStore]) => {
    const result: Record<PrincipalId, number> = {};
    if (!$mulligansScores || !$gameStateStore) return result;

    const current = $mulligansScores.currentHole;
    const baseAwards = Math.floor((current - 1) / 3) + 1;

    const wins = {
      player1: $mulligansScores.golfer1HolesWonCount,
      player2: $mulligansScores.golfer2HolesWonCount,
    };

    const [player1, player2] = $gameStateStore.playerIds;

    result[player1] =
      baseAwards + wins.player1 - $mulligansScores.golfer1MulligansUsed;
    result[player2] =
      baseAwards + wins.player2 - $mulligansScores.golfer2MulligansUsed;
    console.log("availableMulligans", result);
    return result;
  },
);

export const holeWins = derived(mulligansScores, ($scores) => {
  if (!$scores) {
    return { player1: 0, player2: 0 };
  }
  return {
    player1: $scores.golfer1HolesWonCount,
    player2: $scores.golfer2HolesWonCount,
  };
});

export const mulligansMatchScore = derived(holeWins, ($wins) => {
  const diff = $wins.player1 - $wins.player2;
  if (diff === 0) return "ALL SQUARE";
  const absoluteDiff = Math.abs(diff);
  if (diff > 0) {
    return `${absoluteDiff} UP (Player1)`;
  } else {
    return `${absoluteDiff} UP (Player2)`;
  }
});

export interface MulligansHoleState {
  holeNumber: number;
  isComplete: boolean;
  isLocked: boolean;
}

export const mulligansHoleStates = derived(
  [gameStateStore, currentCourseStore],
  ([$gameState, $currentCourse]) => {
    if (!$gameState) return [];

    const totalHoles = $currentCourse?.totalHoles ?? 18;
    const holeResults: MulligansHoleResult[] =
      ($gameState as any).holeResults || [];

    let maxCompleted = 0;
    for (const result of holeResults) {
      if (result.winner && result.holeNumber > maxCompleted) {
        maxCompleted = result.holeNumber;
      }
    }

    const states: MulligansHoleState[] = [];
    for (let i = 1; i <= totalHoles; i++) {
      const result = holeResults.find((r) => r.holeNumber === i);
      const isComplete = result ? Boolean(result.winner) : false;
      const isLocked = i > maxCompleted + 1;
      states.push({
        holeNumber: i,
        isComplete: isComplete,
        isLocked: isLocked,
      });
    }
    return states;
  },
);
