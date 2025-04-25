import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  GetGolfer,
  Golfer,
  Golfers,
  ListGolfers,
  CreateGolfer,
  UpdateGolfer,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class GolferService {
  constructor() {}
  
  async listGolfers(dto: ListGolfers): Promise<Golfers> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.listGolfers(dto);

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

  async createGolfer(dto: CreateGolfer): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.createGolfer(dto);

      if (isError(result)) {
        console.error("Error Creating Golfer", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Creating Golfer", error);
      throw error;
    }
  }

  async updateGolfer(dto: UpdateGolfer): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.updateGolfer(dto);

      if (isError(result)) {
        console.error("Error Updating Golfer", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Updating Golfer", error);
      throw error;
    }
  }
}
