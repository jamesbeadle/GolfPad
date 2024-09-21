import { userStore } from "$lib/stores/user-store";
import { derived, type Readable } from "svelte/store";

export const userGetAgentPicture: Readable<string> = derived(
  userStore,
  (user) =>
    user !== null &&
    user !== undefined &&
    user.userPicture !== undefined &&
    user.userPicture.length > 0
      ? URL.createObjectURL(new Blob([new Uint8Array(user.userPicture)]))
      : "placeholder.png",
);
