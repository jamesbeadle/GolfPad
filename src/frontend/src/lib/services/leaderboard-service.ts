import { ActorFactory } from "$lib/utils/actor.factory";
import { isError } from "$lib/utils/helpers";
import { authStore } from "$lib/stores/auth-store";
import type {
  FantasyLeaderboard,
  GetFantasyLeaderboard,
} from "../../../../declarations/backend/backend.did";

export class LeaderboardService {
  constructor() {}

  async getLeaderboard(
    dto: GetFantasyLeaderboard,
  ): Promise<FantasyLeaderboard> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getLeaderboard(dto);

      if (isError(result)) {
        console.error("Error Getting Leaderboard", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Getting Leaderboard", error);
      throw error;
    }
  }
}
