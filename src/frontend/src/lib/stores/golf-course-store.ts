import { GolfCoursesService } from "$lib/services/golf-course-service";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  GetGolfCourses,
  GetGolfCourseTees,
  GolfCourse,
  GolfCourses,
  GolfCourseTees,
  UpdateGolfCourse,
} from "../../../../declarations/backend/backend.did";

function createGolfCourseStore() {
  async function getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    return await new GolfCoursesService().getGolfCourses(dto);
  }

  async function getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    return await new GolfCoursesService().getGolfCourse(dto);
  }

  async function getGolfCourseTees(
    dto: GetGolfCourseTees,
  ): Promise<GolfCourseTees> {
    return await new GolfCoursesService().getGolfCourseTees(dto);
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
    updateGolfCourse,
    getGolfCourseTees,
  };
}
export const golfCourseStore = createGolfCourseStore();
