import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import { ActorFactory } from "$lib/utils/ActorFactory";
import type {
  CreateGolferDTO,
  MyGolferDTO,
  PrincipalId,
  UpdateGolferDTO,
  UpdateGolferPictureDTO,
} from "../../../../declarations/backend/backend.did";
import { UserService } from "$lib/services/user-service";

function createUserStore() {
  const { subscribe, set } = writable<any>(null);

  async function sync() {
    let localStorageString = localStorage.getItem("user_profile_data");
    if (localStorageString) {
      const localProfile = JSON.parse(localStorageString);
      set(localProfile);
      console.log("Existing User");
      return false;
    }
    try {
      await cacheProfile();
      console.log("New User");
      return true;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async function isAdmin(): Promise<boolean> {
    return new UserService().isAdmin();
  }

  async function createUser(
    username: string,
    handicap: [number] | [],
  ): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      try {
        let dto: CreateGolferDTO = {
          username: username,
          handicap: handicap,
        };

        const result = await identityActor.createGolfer(dto);
        return result;
      } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async function updateUser(updatedUser: UpdateGolferDTO): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateUserDetail(updatedUser);
      sync();
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async function updateProfilePicture(picture: File): Promise<any> {
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

          let dto: UpdateGolferPictureDTO = {
            golferPicture: uint8Array,
            golferPictureExtension: extension,
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

  function getFileExtensionFromFile(file: File): string {
    const filename = file.name;

    const lastIndex = filename.lastIndexOf(".");

    return lastIndex !== -1 ? filename.substring(lastIndex + 1) : "";
  }

  async function isUsernameAvailable(username: string): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.isUsernameTaken(username);
      return result;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async function cacheProfile() {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    let getProfileResponse = await identityActor.getMyGolfer();
    console.log("getProfileResponse: ", getProfileResponse);
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching user profile");
      return;
    }
    let profileData = getProfileResponse.ok;
    set(profileData);
  }

  return {
    subscribe,
    sync,
    createUser,
    updateUser,
    cacheProfile,
    updateProfilePicture,
    isUsernameAvailable,
    isAdmin,
  };
}

export const userStore = createUserStore();
