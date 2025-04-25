import { isError } from "$lib/utils/helpers";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  ListGolfCourses,
  GolfCourse,
  GolfCourses,
  UpdateGolfCourse,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";

export class GolfCoursesService {
  constructor() {}

  //Queries

  async listGolfCourses(
    dto: ListGolfCourses,
  ): Promise<GolfCourses | undefined> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      let result = await identityActor.listGolfCourses(dto);
      if (isError(result)) throw new Error("Failed to get golf courses");
      return result.ok;
    } catch (error) {
      console.error("Error Getting Golf Courses", error);
      throw error;
    }
  }

  async getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse | undefined> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      let result = await identityActor.getGolfCourse(dto);
      if (isError(result)) throw new Error("Failed to get golf course");
      return result.ok;
    } catch (error) {
      console.error("Error Getting Golf Course", error);
      throw error;
    }
  }

  //Commands

  async createGolfCourse(dto: CreateGolfCourse): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      let result = await identityActor.createGolfCourse(dto);
      if (isError(result)) throw new Error("Failed to create golf course");
      return result.ok;
    } catch (error) {
      console.error("Error Creating Golf Course", error);
      throw error;
    }
  }

  async updateGolfCourse(dto: UpdateGolfCourse): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      let result = await identityActor.updateGolfCourse(dto);
      if (isError(result)) throw new Error("Failed to update golf course");
      return result.ok;
    } catch (error) {
      console.error("Error Updating Golf Course", error);
      throw error;
    }
  }
}
