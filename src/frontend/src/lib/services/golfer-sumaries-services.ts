import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GolferGameSummariesDTO,
  PaginationFilters,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";

export class GolferSummariesServices {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
  }

  async getGolferGameSummaries(
    filters: PaginationFilters,
  ): Promise<GolferGameSummariesDTO> {
    /* const identityActor = await ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.getMyGames(dto);
    if (isError(result)) {
        throw new Error("Error Fetching Golfer Game Summaries");
    }
    return result.ok; */
    const result = await this.actor.getMyGames(filters);
    if (isError(result)) throw new Error("Failed to get golfer game summaries");
    return result.ok;
  }
}
