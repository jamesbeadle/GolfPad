import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import type {
  AddShot,
  Buzz,
  ClubShots,
  CreateUser,
  DeleteShot,
  GetBuzz,
  GetClubShots,
  GetProfile,
  GetShotAverages,
  GetUpcomingGames,
  IsUsernameAvailable,
  Profile,
  ShotAverages,
  UpcomingGames,
  UpdateFirstName,
  UpdateHandicap,
  UpdateHomeCourse,
  UpdateLastName,
  UpdateProfilePicture,
  UpdateShot,
  UpdateUsername,
  UsernameAvailable,
  RemoveUserGolfCourse,
  GetUserFavouriteCourses,
  UserFavouriteCourses,
  GetFriends,
  Friends,
} from "../../../../declarations/backend/backend.did";
import { isError } from "$lib/utils/helpers";

export class UserService {
  //User Query Functions:

  async getProfile(dto: GetProfile): Promise<Profile> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getProfile(dto);
    if (isError(result)) throw new Error("Failed to get profile");
    return result.ok;
  }

  async getBuzz(dto: GetBuzz): Promise<Buzz> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getBuzzEntries(dto);
    if (isError(result)) throw new Error("Failed to get buzz entries");
    return result.ok;
  }

  async getUpcomingGames(dto: GetUpcomingGames): Promise<UpcomingGames> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getUpcomingGames(dto);
    if (isError(result)) throw new Error("Failed to get upcoming games");
    return result.ok;
  }

  async isUsernameAvailable(
    dto: IsUsernameAvailable,
  ): Promise<UsernameAvailable> {
    return false; //TODO
  }

  async getShotAverages(dto: GetShotAverages): Promise<ShotAverages> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getShotAverages(dto);
    if (isError(result)) throw new Error("Failed to get shot averages");
    return result.ok;
  }

  async getUserFavouriteCourses(
    dto: GetUserFavouriteCourses,
  ): Promise<UserFavouriteCourses> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getUserFavouriteCourses(dto);
    if (isError(result))
      throw new Error("Failed to get user favourite courses.");
    return result.ok;
  }

  async getClubShots(dto: GetClubShots): Promise<ClubShots> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getClubShots(dto);
    if (isError(result)) throw new Error("Failed to get club shots");
    return result.ok;
  }

  async getFriends(dto: GetFriends): Promise<Friends> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getFriends(dto);
    if (isError(result)) throw new Error("Failed to get friends");
    return result.ok;
  }

  //Golfer Profile Commands:

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

  async updateUsername(dto: UpdateUsername): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
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

  async updateHandicap(dto: UpdateHandicap): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateHandicap(dto);
      return result;
    } catch (error) {
      console.error("Error updating handicap:", error);
      throw error;
    }
  }

  async updateFirstName(dto: UpdateFirstName): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateFirstName(dto);
      return result;
    } catch (error) {
      console.error("Error updating first name:", error);
      throw error;
    }
  }

  async updateLastName(dto: UpdateLastName): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateLastName(dto);
      return result;
    } catch (error) {
      console.error("Error updating last name:", error);
      throw error;
    }
  }

  async updateHomeCourse(dto: UpdateHomeCourse): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateHomeCourse(dto);
      return result;
    } catch (error) {
      console.error("Error updating home course:", error);
      throw error;
    }
  }

  async updateProfilePicture(dto: UpdateProfilePicture): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
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

  async addShot(dto: AddShot): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.addShot(dto);
      return result;
    } catch (error) {
      console.error("Error adding golf shot:", error);
      throw error;
    }
  }

  async updateShot(dto: UpdateShot): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateShot(dto);
      return result;
    } catch (error) {
      console.error("Error updating golf shot:", error);
      throw error;
    }
  }

  async deleteShot(dto: DeleteShot): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.deleteShot(dto);
      return result;
    } catch (error) {
      console.error("Error deleting golf shot:", error);
      throw error;
    }
  }

  async removeUserGolfCourse(dto: RemoveUserGolfCourse): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.removeUserGolfCourse(dto);
      return result;
    } catch (error) {
      console.error("Error removing user golf course:", error);
      throw error;
    }
  }
}
