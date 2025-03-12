import { writable } from "svelte/store";
import type {
  GetGolfers,
  Golfers,
} from "../../../../declarations/backend/backend.did";
import { GolferService } from "$lib/services/golfer-service";

function createGolferStore() {
  async function getGolfers(dto: GetGolfers): Promise<Golfers> {
    return new GolferService().getGolfers(dto);
  }

  return {
    getGolfers,
  };
}

export const golferStore = createGolferStore();
