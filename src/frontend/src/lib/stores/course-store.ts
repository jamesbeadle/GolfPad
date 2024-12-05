import { writable } from "svelte/store";
import { CourseServices } from "$lib/services/course-services";
import type {
  GolfCourseDTO,
  PaginationFilters,
  CreateGolfCourseDTO,
  UpdateGolfCourseDTO,
} from "../../../../declarations/backend/backend.did";

function createCourseStore() {
  const { subscribe, set } = writable<GolfCourseDTO[]>([]);

  async function getCourse(courseId: number): Promise<GolfCourseDTO[]> {
    return await new CourseServices().getCourse(courseId);
  }
  async function getCourses(
    filters: PaginationFilters,
  ): Promise<GolfCourseDTO[]> {
    const courses = await new CourseServices().getCourses(filters);
    return courses.courses;
  }

  async function createCourse(
    createGolfCourseDTO: CreateGolfCourseDTO,
  ): Promise<void> {
    return await new CourseServices().createCourse(createGolfCourseDTO);
  }

  async function updateCourse(
    updateGolfCourseDTO: UpdateGolfCourseDTO,
  ): Promise<void> {
    return await new CourseServices().updateCourse(updateGolfCourseDTO);
  }

  return {
    subscribe,
    setCourse: (course: GolfCourseDTO[]) => set(course),
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
  };
}
export const courseStore = createCourseStore();
