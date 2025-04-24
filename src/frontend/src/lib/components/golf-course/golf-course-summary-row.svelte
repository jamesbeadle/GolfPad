<script lang="ts">
    import type { GolfCourseSummary } from "../../../../../declarations/backend/backend.did";
    import { goto } from "$app/navigation";

    interface Props {
        golfCourse: GolfCourseSummary;
    }

    const { golfCourse }: Props = $props();

    function selectGolfCourse() {
        goto(`/golf-course/${golfCourse.golfCourseId}`);
    }
</script>

<button 
    onclick={selectGolfCourse}
    class="w-full p-4 text-left transition-colors duration-200 border-b hover:bg-gray-50"
>
    <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex-1 min-w-0">
            <h3 class="text-lg font-medium truncate text-BrandForest">{golfCourse.name}</h3>
            <p class="mt-1 text-sm text-BrandDarkGray">
                Founded: {Number(golfCourse.founded)}
            </p>
        </div>
        <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0">
                    <span class="text-sm font-medium text-BrandDarkGray">Par</span>
                    <p class="text-lg font-semibold text-BrandForest sm:mt-1">{golfCourse.par}</p>
                </div>
                <div class="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0">
                    <span class="text-sm font-medium text-BrandDarkGray">Holes</span>
                    <p class="text-lg font-semibold text-BrandForest sm:mt-1">{golfCourse.totalHoles}</p>
                </div>
            </div>
        </div>
    </div>
</button>