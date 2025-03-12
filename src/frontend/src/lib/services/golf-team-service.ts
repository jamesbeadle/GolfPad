import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  CreateGolfTeam,
  GetGolfTeams,
  GolfTeams,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class GolfTeamService {
  constructor() {}

  async getGolfTeams(dto: GetGolfTeams): Promise<GolfTeams> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfTeams(dto);

      if (isError(result)) {
        console.error("Error Fetching Golf Teams", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golf Teams", error);
      throw error;
    }
  }

  async createGolfTeam(dto: CreateGolfTeam): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createGolfTeam(dto);
      return result.ok;
    } catch (error) {
      console.error("Error creating golf team:", error);
      throw error;
    }
  }
}
