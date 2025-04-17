import type {
  GameGolferSummaries,
  GetGameGolferSummaries,
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

  async function getGameGolferSummaries(
    dto: GetGameGolferSummaries,
  ): Promise<GameGolferSummaries> {
    return new GolferService().getGameGolferSummaries(dto);
  }

  return {
    getGolfers,
    getGolfer,
    getGameGolferSummaries,
  };
}

export const golferStore = createGolferStore();
