import { writable } from "svelte/store";
import { CourseServices } from "$lib/services/course-services";
import type {
  GolfCourseDTO,
  PaginationFilters,
} from "../../../../declarations/backend/backend.did";

function createCourseStore() {
  const { subscribe, set } = writable<GolfCourseDTO[]>([]);

  async function getCourse(courseId: number): Promise<GolfCourseDTO[]> {
    return new CourseServices().getCourse(courseId);
  }
  async function getCourses(
    filters: PaginationFilters,
  ): Promise<GolfCourseDTO[]> {
    const courses = await new CourseServices().getCourses(filters);
    return courses.courses;
  }

  return {
    subscribe,
    setCourse: (course: GolfCourseDTO[]) => set(course),
    getCourse,
    getCourses,
  };
}
export const courseStore = createCourseStore();
