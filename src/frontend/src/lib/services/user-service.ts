import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import type {
  AddShot,
  Buzz,
  CreateUser,
  GetBuzz,
  GetShotAverages,
  IsUsernameAvailable,
  Profile,
  ShotAverages,
  UpdateFirstName,
  UpdateHandicap,
  UpdateHomeCourse,
  UpdateLastName,
  UpdateProfilePicture,
  UpdateUsername,
  UsernameAvailable,
} from "../../../../declarations/backend/backend.did";
import { isError } from "$lib/utils/helpers";

export class UserService {
  constructor() {
    authStore.sync();
  }
  async getProfile(): Promise<Profile | null> {
    return null;
  }

  //get upcoming games

  async getBuzz(dto: GetBuzz): Promise<Buzz> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getBuzzEntries(dto);
    if (isError(result)) throw new Error("Failed to get buzz entries");
    return result.ok;
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

  async isUsernameAvailable(
    dto: IsUsernameAvailable,
  ): Promise<UsernameAvailable> {
    return false; //TODO
  }

  async addShot(dto: AddShot): Promise<void> {}

  async getShotAverages(dto: GetShotAverages): Promise<ShotAverages> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getShotAverages(dto);
    if (isError(result)) throw new Error("Failed to get shot averages");
    return result.ok;
  }

  //friend stuff
  //get friend requests
}
