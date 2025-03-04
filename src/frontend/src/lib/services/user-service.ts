import { ActorFactory } from "$lib/utils/ActorFactory";
import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import type {
  CreateUser,
  UpdateFirstName,
  UpdateHandicap,
  UpdateHomeCourse,
  UpdateLastName,
  UpdateProfilePicture,
  UpdateUsername,
} from "../../../../declarations/backend/backend.did";

export class UserService {
  constructor() {
    authStore.sync();
  }

  async createUser(dto: CreateUser): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createUser(dto);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async updateUsername(dto: UpdateUsername): Promise<void> {}
  async updateHandicap(dto: UpdateHandicap): Promise<void> {}
  async updateFirstName(dto: UpdateFirstName): Promise<void> {}
  async updateLastName(dto: UpdateLastName): Promise<void> {}
  async updateHomeCourse(dto: UpdateHomeCourse): Promise<void> {}
  async updateProfilePicture(dto: UpdateProfilePicture): Promise<void> {}

  async isAdmin(): Promise<boolean> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.isAdmin();
    if (isError(result)) {
      throw new Error("Failed to check is admin");
    }
    return result.ok;
  }
}
