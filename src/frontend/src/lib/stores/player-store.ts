import { writable } from "svelte/store";
import { PlayerServices } from "$lib/services/player-service";
import type {
  CreateGolferDTO,
  GolferDTO,
  UpdateGolferPictureDTO,
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

  async function saveGolferPicture(dto: UpdateGolferPictureDTO) {
    return new PlayerServices().saveGolferPicture(dto);
  }

  return {
    subscribe,
    setPlayer: (player: GolferDTO[]) => set(player),
    createPlayer,
    getPlayer,
    listPlayers,
    saveGolferPicture,
  };
}
export const playerStore = createPlayerStore();
