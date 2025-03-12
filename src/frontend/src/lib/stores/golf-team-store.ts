import { writable } from "svelte/store";
import type {
  GetGolfTeams,
  GolfTeam,
  GolfTeams,
} from "../../../../declarations/backend/backend.did";
import { GolfTeamService } from "$lib/services/golf-team-service";

function createGolfTeamStore() {
  const { subscribe, set } = writable<GolfTeam | undefined>(undefined);

  async function getGolfTeams(dto: GetGolfTeams): Promise<GolfTeams> {
    return new GolfTeamService().getGolfTeams(dto);
  }

  return {
    subscribe,
    setGolfTeam: (golfTeam: GolfTeam) => set(golfTeam),
    getGolfTeams,
  };
}

export const golfTeamStore = createGolfTeamStore();
