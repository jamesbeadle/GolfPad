import { writable } from "svelte/store";
import type { GolfCourseTeeGroup } from "../../../../declarations/backend/backend.did";

export const currentCourseStore = writable<GolfCourseTeeGroup | null>(null);
