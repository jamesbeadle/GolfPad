import { GolfCoursesService } from "$lib/services/golf-course-service";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  ListGolfCourses,
  GolfCourse,
  GolfCourses,
  UpdateGolfCourse,
  GolfCourseSummary,
} from "../../../../declarations/backend/backend.did";
import { writable } from "svelte/store";

function createGolfCourseStore() {
  const { subscribe, set } = writable<GolfCourseSummary[]>([]);

  async function listGolfCourses(
    dto: ListGolfCourses,
  ): Promise<GolfCourses | undefined> {
    return await new GolfCoursesService().listGolfCourses(dto);
  }

  async function getGolfCourse(
    dto: GetGolfCourse,
  ): Promise<GolfCourse | undefined> {
    return await new GolfCoursesService().getGolfCourse(dto);
  }

  async function createGolfCourse(dto: CreateGolfCourse): Promise<any> {
    return await new GolfCoursesService().createGolfCourse(dto);
  }

  async function updateGolfCourse(dto: UpdateGolfCourse): Promise<any> {
    return await new GolfCoursesService().updateGolfCourse(dto);
  }

  return {
    subscribe,
    set,
    getGolfCourse,
    listGolfCourses,
    createGolfCourse,
    updateGolfCourse,
  };
}
export const golfCourseStore = createGolfCourseStore();
