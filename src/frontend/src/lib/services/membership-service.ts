import { isError } from "$lib/utils/helpers";
import { authStore } from "$lib/stores/auth-store";
import type {
  GolferNeurons,
  MembershipClaim,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor.factory";

export class MembershipService {
  constructor() {}

  async getUserNeurons(): Promise<GolferNeurons | undefined> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      const result = await identityActor.getUserNeurons();

      if (isError(result)) {
        throw new Error("Failed to get user neurons");
      }

      return result.ok;
    } catch (error) {
      throw error;
    }
  }

  async claimMembership(): Promise<MembershipClaim | undefined> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      const result = await identityActor.claimMembership();

      if (isError(result)) {
        console.error("Failed to claim membership", result);
        throw new Error("Failed to claim membership");
      }

      return result.ok;
    } catch (error) {
      throw error;
    }
  }
}
