import { writable } from "svelte/store";
import { PlayerServices } from "$lib/services/player-services";
import type { GolferDTO } from "../../../../declarations/backend/backend.did";

function createPlayerStore() {
  const { subscribe, set } = writable<GolferDTO[]>([]);

  async function getPlayer(playerId: number): Promise<GolferDTO[]> {
    return new PlayerServices().getPlayer(playerId);
  }

  async function listPlayers(searchTerm: string = "") {
    return new PlayerServices().listPlayers(searchTerm);
  }
  return {
    subscribe,
    setPlayer: (player: GolferDTO[]) => set(player),
    getPlayer,
    listPlayers,
  };
}
export const playerStore = createPlayerStore();
