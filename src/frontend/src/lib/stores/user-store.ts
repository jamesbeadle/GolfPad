import { authStore } from "$lib/stores/auth-store";
import { writable } from "svelte/store";
import type {
  CreateUserDTO,
  UpdateUserDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../utils/actor-factory";
import { getFileExtensionFromFile, isError } from "$lib/utils/helpers";

function createUserStore() {
  const { subscribe, set } = writable<any>(null);

  async function sync() {
    let localStorageString = localStorage.getItem("user_data");
    if (localStorageString && localStorageString != "undefined") {
      const localUser = JSON.parse(localStorageString);
      set(localUser);
      return;
    }
    try {
      await cacheUser();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async function cacheUser() {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    let getUserResponse = await identityActor.getUser();
    let error = isError(getUserResponse);
    if (error) {
      console.error("Error fetching user user");
      return;
    }

    let userData = getUserResponse.ok;

    set(userData);
  }

  async function createUser(
    username: string,
    displayName: string,
    profilePicture: File | null,
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

        let dto: CreateUserDTO = {
          username: username,
          displayName: displayName,
          profilePicture: profilePicture
            ? await readFileAsArrayBuffer(profilePicture)
            : [],
          profilePictureExtension: extension,
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

  async function updateUser(updatedUser: UpdateUserDTO): Promise<any> {
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

  async function isUsernameTaken(username: string): Promise<any> {
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

  async function updateUserPicture(picture: File): Promise<any> {
    try {
      const maxPictureSize = 1000;

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
          const result = await identityActor.updateUserPicture(uint8Array);
          sync();
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }

  return {
    subscribe,
    sync,
    createUser,
    updateUser,
    updateUserPicture,
    isUsernameTaken,
  };
}

export const userStore = createUserStore();
