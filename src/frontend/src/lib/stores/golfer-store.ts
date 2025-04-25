import type {
  GetGolfer,
  Golfer,
  Golfers,
  ListGolfers,
  GolferSummary,
  CreateGolfer,
  UpdateGolfer,
} from "../../../../declarations/backend/backend.did";
import { writable } from "svelte/store";
import { GolferService } from "$lib/services/golfer-service";

function createGolferStore() {
  const { subscribe, set } = writable<GolferSummary[]>([]);

  async function listGolfers(dto: ListGolfers): Promise<Golfers> {
    return new GolferService().listGolfers(dto);
  }

  async function getGolfer(dto: GetGolfer): Promise<Golfer> {
    return new GolferService().getGolfer(dto);
  }

  async function createGolfer(dto: CreateGolfer): Promise<any> {
    return new GolferService().createGolfer(dto);
  }

  async function updateGolfer(dto: UpdateGolfer): Promise<any> {
    return new GolferService().updateGolfer(dto);
  }

  return {
    subscribe,
    set,
    listGolfers,
    getGolfer,
    createGolfer,
    updateGolfer,
  };
}

export const golferStore = createGolferStore();
