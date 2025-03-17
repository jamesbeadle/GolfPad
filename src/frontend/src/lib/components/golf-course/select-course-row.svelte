<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
import type { GolfCourseId, GolfCourseSummary, GolfCourseVersion } from "../../../../../declarations/backend/backend.did";

    export let golfCourse: GolfCourseSummary;
    export let selectCourse: (courseId: GolfCourseId, courseVersion: GolfCourseVersion) => void;
</script>
<div class="flex flex-row items-center">
    <img src={getImageURL(golfCourse.mainImage)} alt="Golf Course" class="w-6" />
    <div>{golfCourse.name}</div>
    <button on:click={() => selectCourse(golfCourse.id, golfCourse.version)} class="brand-button">SELECT</button>
</div>