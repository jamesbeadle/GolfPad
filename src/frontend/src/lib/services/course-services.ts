import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GolfCourseDTO,
  PaginationFilters,
  CoursesDTO,
  CreateGolfCourseDTO,
  UpdateGolfCourseDTO,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";
import { ActorFactory } from "$lib/utils/ActorFactory";

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
    const result: any = await identityActor.createGolfCourse(dto);
    console.log("Result: ", result);
    if (isError(result)) {
      throw new Error("Error Creating Course");
    }
    return result;
  }

  async updateCourse(dto: UpdateGolfCourseDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.updateGolfCourse(dto);
    if (isError(result)) {
      throw new Error("Error Updating Course");
    }
  }
}
