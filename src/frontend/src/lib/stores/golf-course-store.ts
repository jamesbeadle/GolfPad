import { GolfCoursesService } from "$lib/services/golf-course-service";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  GetGolfCourses,
  GolfCourse,
  GolfCourses,
} from "../../../../declarations/backend/backend.did";
import type UpdateGolfCourse from "$lib/components/goverance/golf-course/update-golf-course.svelte";

function createGolfCourseStore() {
  
  async function getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    return await new GolfCoursesService().getGolfCourses(dto);
  }

  async function getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    return await new GolfCoursesService().getGolfCourse(dto);
  }
  
  async function addGolfCourse(dto: CreateGolfCourse): Promise<void> {
    return await new GolfCoursesService().addGolfCourse(dto);
  }
  
  async function updateGolfCourse(dto: UpdateGolfCourse): Promise<void> {
    return await new GolfCoursesService().updateGolfCourse(dto);
  }

  return {
    getGolfCourse,
    getGolfCourses,
    addGolfCourse,
    updateGolfCourse
  };
}
export const golfCourseStore = createGolfCourseStore();
