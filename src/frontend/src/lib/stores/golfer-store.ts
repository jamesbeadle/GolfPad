import type {
  GetGolfer,
  Golfer,
  Golfers,
  ListGolfers,
  GolferSummary,
} from "../../../../declarations/backend/backend.did";
import { GolferService } from "$lib/services/golfer-service";

function createGolferStore() {
  async function listGolfers(dto: ListGolfers): Promise<Golfers> {
    return new GolferService().listGolfers(dto);
  }

  async function getGolfer(dto: GetGolfer): Promise<Golfer> {
    return new GolferService().getGolfer(dto);
  }

  return {
    listGolfers,
    getGolfer,
  };
}

export const golferStore = createGolferStore();
