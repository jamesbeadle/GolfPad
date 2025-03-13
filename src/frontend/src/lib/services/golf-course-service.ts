import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GetGolfCourse,
  GetGolfCourses,
  GolfCourse,
  GolfCourses,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";

export class GolfCoursesService {
  constructor() {}

  //Queries

  async getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfCourses(dto);
    if (isError(result)) throw new Error("Failed to get golf courses");
    return result.ok;
  }

  async getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfCourse(dto);
    if (isError(result)) throw new Error("Failed to get golf course");
    return result.ok;
  }

  //Commands

  
}
