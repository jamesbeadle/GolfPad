import { writable } from "svelte/store";
import { GolfCoursesService } from "$lib/services/golf-course-service";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  GetGolfCourses,
  GolfCourse,
  GolfCourses,
} from "../../../../declarations/backend/backend.did";
import type UpdateGolfCourse from "$lib/components/goverance/golf-course/update-golf-course.svelte";

function createCourseStore() {
  const { subscribe, set } = writable<GolfCourse[]>([]);

  async function getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    return await new GolfCoursesService().getGolfCourse(dto);
  }
  async function getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    return await new GolfCoursesService().getGolfCourses(dto);
  }

  return {
    subscribe,
    setCourse: (course: GolfCourse[]) => set(course),
    getGolfCourse,
    getGolfCourses,
  };
}
export const courseStore = createCourseStore();
