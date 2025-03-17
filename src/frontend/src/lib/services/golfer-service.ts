import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  GameGolferSummaries,
  GetGameGolferSummaries,
  GetGolfer,
  GetGolfers,
  Golfer,
  Golfers,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class GolferService {
  constructor() {}

  //Getters

  async getGolfers(dto: GetGolfers): Promise<Golfers> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfers(dto);

      if (isError(result)) {
        console.error("Error Fetching Golfers", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golfers", error);
      throw error;
    }
  }

  async getGolfer(dto: GetGolfer): Promise<Golfer> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfer(dto);

      if (isError(result)) {
        console.error("Error Fetching Golfer", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golfer", error);
      throw error;
    }
  }

  async getGameGolferSummaries(
    dto: GetGameGolferSummaries,
  ): Promise<GameGolferSummaries> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfer(dto);

      if (isError(result)) {
        console.error("Error Fetching Golfer", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golfer", error);
      throw error;
    }
  }
}
