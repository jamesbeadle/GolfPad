import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import { ActorFactory } from "../utils/actor-factory";
import type {
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

  async function createUser(
    username: string,
    handicap: [number] | [],
    profilePicture: File | null,
    principalId: PrincipalId,
  ): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      const readFileAsArrayBuffer = (file: File): Promise<Uint8Array> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            resolve(new Uint8Array(arrayBuffer));
          };
          reader.onerror = () => {
            reject(new Error("Error reading file"));
          };
        });
      };

      try {
        var extension = "";
        const maxPictureSize = 500;
        if (profilePicture && profilePicture.size > maxPictureSize * 1024) {
          throw new Error("File size exceeds the limit of 500KB");
        }

        if (profilePicture) {
          extension = getFileExtensionFromFile(profilePicture);
        }

        let dto: MyGolferDTO = {
          username: username,
          handicap: handicap,
          golferPicture: profilePicture
            ? [await readFileAsArrayBuffer(profilePicture)]
            : [],
          golferPictureExtension: extension,
          principalId: principalId,
        };

        const result = await identityActor.createUser(dto);
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

    let getProfileResponse = await identityActor.getGolfer();
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
    updateProfilePicture,
    isUsernameAvailable,
    isAdmin,
  };
}

export const userStore = createUserStore();
