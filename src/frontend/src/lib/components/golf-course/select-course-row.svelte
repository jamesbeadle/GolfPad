<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
    import type { GolfCourseId, GolfCourseSummary } from "../../../../../declarations/backend/backend.did";

    interface Props {
        golfCourse: GolfCourseSummary;
        selectCourse: (courseId: GolfCourseId, courseVersion: GolfCourseVersion) => void;
    }
    
    let { golfCourse, selectCourse } : Props = $props();
    
</script>
<div class="flex flex-row items-center">
    <img src={getImageURL(golfCourse.mainImage)} alt="Golf Course" class="w-6" />
    <div>{golfCourse.name}</div>
    <button onclick={() => selectCourse(golfCourse.id, golfCourse.version)} class="brand-button">SELECT</button>
</div>