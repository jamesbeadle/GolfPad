<script lang="ts">
    import { getImageURL, formatUnixDateToSmallReadable } from "$lib/utils/helpers";
    import type { GolfCourseTeeGroup } from "../../../../../declarations/backend/backend.did";

    export let golfCourse: GolfCourseTeeGroup;
    export let date: bigint;

</script>
<div class="flex flex-row items-start justify-between pb-4 border-b border-BrandDivider">
    <div class="flex flex-row items-center space-x-4">
        <img src={getImageURL(golfCourse.mainImage)} alt='course' class="w-20 h-20 rounded-lg"/>
        <div class="flex flex-col gap-1">
            <p class="tiny-header">COURSE</p>
            <p class="text-xl text-black condensed">{golfCourse.name.toUpperCase()}</p>
        </div>
    </div>
    <div class="flex flex-col items-center gap-1">
        <p class="tiny-header">DATE</p>
        <p class="text-xl text-center text-black condensed">{formatUnixDateToSmallReadable(date)}</p>
        <span 
            class="px-3 py-1 text-xs text-white rounded-full" 
            style="background-color: {golfCourse.colour}"
        >
            {golfCourse.name}
        </span>
    </div>
</div>