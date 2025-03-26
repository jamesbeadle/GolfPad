import { userStore } from "$lib/stores/user-store";
import { uint8ArrayToBase64 } from "$lib/utils/helpers";
import { derived, type Readable } from "svelte/store";
import type { GolfCourse } from "../../../../declarations/backend/backend.did";

export const userGetProfilePicture: Readable<string> = derived(
  userStore,
  ($user) => {
    if (!$user) {
      return "/default-profile-picture.jpg";
    }
    return getProfilePictureString($user.golferPicture);
  },
);

export function getProfilePictureString(profilePicture: any): string {
  try {
    if (!profilePicture) {
      return "/default-profile-picture.jpg";
    }

    if (
      Array.isArray(profilePicture) &&
      profilePicture[0] instanceof Uint8Array
    ) {
      const byteArray = profilePicture[0];
      return `data:image/png;base64,${uint8ArrayToBase64(byteArray)}`;
    }

    if (profilePicture instanceof Uint8Array) {
      return `data:image/png;base64,${uint8ArrayToBase64(profilePicture)}`;
    }

    if (typeof profilePicture === "string") {
      if (profilePicture.startsWith("data:image/")) {
        return profilePicture;
      }
      return `data:image/png;base64,${profilePicture}`;
    }

    return "/profile_placeholder.png";
  } catch (error) {
    console.error(error);
    return "/profile_placeholder.png";
  }
}

export const getCourseImage = (course: GolfCourse) => {
  return "course-placeholder.jpg";
};
