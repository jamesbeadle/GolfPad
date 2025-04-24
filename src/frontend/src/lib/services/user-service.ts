import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import { get } from "svelte/store";
import type {
  CreateProfile,
  GetProfile,
  Profile,
  UpdateProfilePicture,
  UpdateUsername,
  IsUsernameValid,
} from "../../../../declarations/backend/backend.did";
import { isError } from "$lib/utils/helpers";

export class UserService {
  //User Query Functions:

  async getProfile(dto: GetProfile): Promise<Profile> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getProfile(dto);
    if (isError(result)) throw new Error("Failed to get profile");
    return result.ok;
  }

  async isUsernameValid(dto: IsUsernameValid): Promise<boolean> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.isUsernameValid(dto);
      return result.ok;
    } catch (error) {
      console.error("Error checking if username is valid:", error);
      return false;
    }
  }

  //Golfer Profile Commands:

  async createProfile(dto: CreateProfile): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createProfile(dto);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUsername(dto: UpdateUsername): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateUsername(dto);
      return result;
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }

  async updateProfilePicture(dto: UpdateProfilePicture): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateProfilePicture(dto);
      return result;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  }

  async isAdmin(): Promise<boolean> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const identity = get(authStore).identity;
    if (identity) {
      try {
        const principalId = identity.getPrincipal().toString();
        const result = await identityActor.isAdmin(principalId);
        if (isError(result))
          throw new Error("Failed to check if user is admin");
        return result.ok;
      } catch (error) {
        console.error("Error checking if user is admin:", error);
        return false;
      }
    }
    return false;
  }
}
