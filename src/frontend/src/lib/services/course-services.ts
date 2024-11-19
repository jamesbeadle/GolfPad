import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GolfCourseDTO,
  PaginationFilters,
  CoursesDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";

export class CourseServices {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getCourse(courseId: number): Promise<GolfCourseDTO[]> {
    const result = await this.actor.getCourse(courseId);
    if (isError(result)) throw new Error("Failed to get course");
    return result.ok;
  }

  async getCourses(filters: PaginationFilters): Promise<CoursesDTO> {
    const result = await this.actor.listCourses(filters);
    if (isError(result)) throw new Error("Failed to get courses");
    return result.ok;
  }
}
