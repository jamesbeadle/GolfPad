import type {
  GetGolfer,
  GetGolfers,
  Golfer,
  Golfers,
} from "../../../../declarations/backend/backend.did";
import { GolferService } from "$lib/services/golfer-service";

function createGolferStore() {
  async function getGolfers(dto: GetGolfers): Promise<Golfers> {
    return new GolferService().getGolfers(dto);
  }

  async function getGolfer(dto: GetGolfer): Promise<Golfer> {
    return new GolferService().getGolfer(dto);
  }

  return {
    getGolfers,
    getGolfer,
  };
}

export const golferStore = createGolferStore();
