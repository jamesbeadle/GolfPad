import { authStore } from "$lib/stores/auth-store";
import { getFileExtensionFromFile, isError } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import { ActorFactory } from "$lib/utils/actor.factory";
import { UserService } from "$lib/services/user-service";
import { userIdCreatedStore } from "$lib/stores/user-control-store";
import type {
  GetProfile,
  Profile,
  UpdateProfilePicture,
  UpdateUsername,
  CreateProfile,
  IsUsernameValid,
} from "../../../../declarations/backend/backend.did";

function createUserStore() {
  const { subscribe, set } = writable<Profile | null>(null);

  //Syncing and caching of store data

  async function sync() {
    let localStorageString = localStorage.getItem("user_profile_data");
    if (localStorageString) {
      const localProfile = JSON.parse(localStorageString);
      set(localProfile);
      return;
    }
    try {
      await cacheProfile();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async function cacheProfile() {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    let getProfileResponse = await identityActor.getProfile({});
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching user profile");
      throw new Error("Failed to fetch user profile");
      return;
    }
    let profileData = getProfileResponse.ok;
    set(profileData);
    userIdCreatedStore.set({ data: profileData.principalId, certified: true });
  }

  //User Query Functions

  async function getProfile(): Promise<Profile | null> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    let getProfileResponse = await identityActor.getProfile({});
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching user profile");
      return null;
    }
    return getProfileResponse.ok;
  }

  /*   async function getUpcomingGames(
    dto: GetUpcomingGames,
  ): Promise<UpcomingGames> {
    return new UserService().getUpcomingGames(dto);
  } */

  async function isUsernameValid(dto: IsUsernameValid): Promise<boolean> {
    return new UserService().isUsernameValid(dto);
  }

  //User Commands Functions

  async function createUser(dto: CreateProfile): Promise<any> {
    return new UserService().createProfile(dto);
  }

  async function updateUsername(dto: UpdateUsername): Promise<any> {
    return new UserService().updateUsername(dto);
  }

  async function updateProfilePicture(
    principalId: string,
    picture: File,
  ): Promise<any> {
    try {
      const maxPictureSize = 1000;
      const extension = getFileExtensionFromFile(picture);

      if (picture.size > maxPictureSize * 1024) {
        return null;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(picture);
      reader.onloadend = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        try {
          const identityActor = await ActorFactory.createIdentityActor(
            authStore,
            process.env.BACKEND_CANISTER_ID ?? "",
          );

          let dto: UpdateProfilePicture = {
            profilePicture: [uint8Array],
          };
          const result = await identityActor.updateUserPicture(dto);
          if (isError(result)) {
            console.error("Error updating profile picture");
            return;
          }

          await cacheProfile();
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  }

  async function isAdmin(): Promise<boolean> {
    return new UserService().isAdmin();
  }

  return {
    subscribe,
    sync,
    cacheProfile,
    getProfile,
    createUser,
    updateUsername,
    updateProfilePicture,
    isAdmin,
    isUsernameValid,
  };
}

export const userStore = createUserStore();
