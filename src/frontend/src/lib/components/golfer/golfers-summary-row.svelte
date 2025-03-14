<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatUnixDateToReadable, getImageURL } from "$lib/utils/helpers";
    import type { GolfCourseSummary, GolferSummary } from "../../../../../declarations/backend/backend.did";

    export let golfer: GolferSummary;
    export let homeCourse: GolfCourseSummary;

    function selectGolfer(){
        goto(`/golfer/${golfer.principalId}`)
    }

</script>

<div class="flew flex-row">
    <button class="w-full" onclick={selectGolfer}>
        <div class="w-1/4">
            <div class="flex flex-row items-center">
                <img src={getImageURL(golfer.profilePicture)} class="w-6 mr-2" alt={`profile-${golfer.principalId}`} />
                <div class="flex flex-col">
                    <p>{golfer.name}</p>
                    <p>{formatUnixDateToReadable(golfer.joinedOn)}</p>
                </div>
            </div>
        </div>
        <div class="w-1/4">
            <div class="flex flex-row items-center">
                <div class="flex flex-row items-center">
                    <img src={getImageURL(homeCourse.mainImage)} class="w-6 mr-2" alt={`course-${homeCourse.id}`} />
                    <div class="flex flex-col">
                        <p>{homeCourse.name}</p>
                    </div>
                </div>
            </div>
        </div>

    </button>
</div>