import { writable } from "svelte/store";
import { gameStore } from "$lib/stores/game-store";
import type {
  Game,
  GameId,
  GetGame,
  AddGameScore,
} from "../../../../declarations/backend/backend.did";
import { isError } from "$lib/utils/helpers";

export const gameStateStore = writable<Game | null>(null);

export async function loadGame(dto: GetGame): Promise<void> {
  try {
    const result = await gameStore.getGame(dto);
    if (isError(result)) {
      console.error("Error Loading game", result);
    }
    gameStateStore.set(result);
  } catch (error) {
    console.error("Error Loading Game: ", error);
  }
}

export async function saveGame(dto: AddGameScore): Promise<void> {
  try {
    const result = await gameStore.addGameScore(dto);
    if (isError(result)) {
      console.error("Error Saving Game", result);
    }
    gameStateStore.set(result);
  } catch (error) {
    console.error("Error Saving Game: ", error);
  }
}
