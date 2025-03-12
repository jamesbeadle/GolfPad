import { writable } from "svelte/store";
import { GameService } from "$lib/services/game-service";
import type {
  CreateGame,
  Game,
  GameSummaries,
  GetGameSummaries,
} from "../../../../declarations/backend/backend.did";

function createGameStore() {
  const { subscribe, set } = writable<Game[]>([]);

  async function getGameSummaries(
    dto: GetGameSummaries,
  ): Promise<GameSummaries> {
    return new GameService().getGameSummaries(dto);
  }

  async function getGame(gameId: number): Promise<Game> {
    return new GameService().getGame(gameId);
  }

  async function createGame(
    dto: CreateGame,
  ): Promise<{ ok?: bigint; err?: string }> {
    return new GameService().createGame(dto);
  }

  return {
    subscribe,
    setGame: (game: Game[]) => set(game),
    getGame,
    createGame,
    getGameSummaries,
  };
}
export const gameStore = createGameStore();
