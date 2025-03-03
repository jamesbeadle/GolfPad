import { writable } from "svelte/store";
import { GameServices } from "$lib/services/game-service";
import type {
  GameDTO,
  CreateGameDTO,
} from "../../../../declarations/backend/backend.did";

function createGameStore() {
  const { subscribe, set } = writable<GameDTO[]>([]);

  async function getGame(gameId: number): Promise<GameDTO> {
    return new GameServices().getGame(gameId);
  }

  async function createGame(
    dto: CreateGameDTO,
  ): Promise<{ ok?: bigint; err?: string }> {
    return new GameServices().createGame(dto);
  }

  return {
    subscribe,
    setGame: (game: GameDTO[]) => set(game),
    getGame,
    createGame,
  };
}
export const gameStore = createGameStore();
