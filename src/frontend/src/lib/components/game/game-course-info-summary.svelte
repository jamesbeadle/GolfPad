<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
    import type { GolfCourse } from "../../../../../declarations/backend/backend.did";

    export let golfCourse: GolfCourse;

</script>
<div class="flex flex-row">
    <div class="w-1/5">
        <img src={getImageURL(golfCourse.mainImage)} alt='course' class="w-full m-1 rounded"/>
    </div>
    <div class="w-4/5 flex flex-col">
        <p class="tiny-header">COURSE</p>
        <p class="strong-text">{golfCourse.name}</p>
    </div>
</div>