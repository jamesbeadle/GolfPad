import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GetGolfCourse,
  GetGolfCourses,
  GolfCourse,
  GolfCourses,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor.factory";

export class GolfCoursesService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    const result = await this.actor.getGolfCourse(dto);
    if (isError(result)) throw new Error("Failed to get golf course");
    return result.ok;
  }

  async getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    const result = await this.actor.getGolfCourses(dto);
    if (isError(result)) throw new Error("Failed to get golf courses");
    return result.ok;
  }
}
