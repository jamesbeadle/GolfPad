import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import { ActorFactory } from "$lib/utils/ActorFactory";
import { UserService } from "$lib/services/user-service";
import type {
  CreateUser,
  GetProfile,
  UpdateFirstName,
  UpdateHandicap,
  UpdateHomeCourse,
  UpdateLastName,
  UpdateProfilePicture,
  UpdateUsername,
} from "../../../../declarations/backend/backend.did";

function createUserStore() {
  const { subscribe, set } = writable<any>(null);

  async function sync() {
    console.log("syncing user storage");
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

  async function isAdmin(): Promise<boolean> {
    return new UserService().isAdmin();
  }

  async function createUser(dto: CreateUser): Promise<any> {
    return new UserService().createUser(dto);
  }

  async function updateUsername(dto: UpdateUsername): Promise<any> {
    return new UserService().updateUsername(dto);
  }

  async function updateHandicap(dto: UpdateHandicap): Promise<any> {
    return new UserService().updateHandicap(dto);
  }

  async function updateFirstName(dto: UpdateFirstName): Promise<any> {
    return new UserService().updateFirstName(dto);
  }

  async function updateLastName(dto: UpdateLastName): Promise<any> {
    return new UserService().updateLastName(dto);
  }

  async function updateHomeCourse(dto: UpdateHomeCourse): Promise<any> {
    return new UserService().updateHomeCourse(dto);
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

          let dto: UpdateProfilePicture = {
            principalId: "",
            profilePicture: [uint8Array],
            profilePictureExtension: extension,
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

    authStore.subscribe(async (user) => {
      let principalId = user.identity?.getPrincipal().toString();
      if (!principalId) {
        return;
      }

      let dto: GetProfile = {
        principalId,
      };

      let getProfileResponse = await identityActor.getProfile(dto);
      console.log("getProfileResponse: ", getProfileResponse);
      let error = isError(getProfileResponse);
      if (error) {
        console.error("Error fetching user profile");
        return;
      }
      let profileData = getProfileResponse.ok;
      set(profileData);
    });
  }

  return {
    subscribe,
    sync,
    createUser,
    updateUsername,
    updateHandicap,
    updateFirstName,
    updateLastName,
    updateHomeCourse,
    cacheProfile,
    updateProfilePicture,
    isUsernameAvailable,
    isAdmin,
  };
}

export const userStore = createUserStore();
