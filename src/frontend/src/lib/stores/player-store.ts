import { writable } from "svelte/store";
import { PlayerServices } from "$lib/services/player-services";
import type {
  CreateGolferDTO,
  GolferDTO,
} from "../../../../declarations/backend/backend.did";

function createPlayerStore() {
  const { subscribe, set } = writable<GolferDTO[]>([]);

  async function getPlayer(playerId: number): Promise<GolferDTO[]> {
    return new PlayerServices().getPlayer(playerId);
  }

  async function listPlayers(searchTerm: string = "") {
    return new PlayerServices().listPlayers(searchTerm);
  }

  async function createPlayer(player: CreateGolferDTO) {
    return new PlayerServices().createPlayer(player);
  }

  return {
    subscribe,
    setPlayer: (player: GolferDTO[]) => set(player),
    createPlayer,
    getPlayer,
    listPlayers,
  };
}
export const playerStore = createPlayerStore();
