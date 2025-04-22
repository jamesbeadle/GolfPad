import { LeaderboardService } from "$lib/services/leaderboard-service";
import type {
  GetFantasyLeaderboard,
  FantasyLeaderboard,
} from "../../../../declarations/backend/backend.did";

function createLeaderboardStore() {
  async function getLeaderboard(
    dto: GetFantasyLeaderboard,
  ): Promise<FantasyLeaderboard> {
    return new LeaderboardService().getLeaderboard(dto);
  }

  return {
    getLeaderboard,
  };
}

export const leaderboardStore = createLeaderboardStore();
