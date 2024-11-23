import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GolfCourseDTO,
  PaginationFilters,
  CoursesDTO,
  CreateGolfCourseDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";
import { authStore } from "$lib/stores/auth-store";

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

  async createCourse(dto: CreateGolfCourseDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.createCourse(dto);
    if (isError(result)) {
      throw new Error("Error Creating Course");
    }
  }
}
