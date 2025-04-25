<script lang="ts">
    import { goto } from "$app/navigation";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";
    import { getFlagComponent } from "$lib/utils/helpers";

    interface Props {
        golfer: GolferSummary;
    }

    const { golfer }: Props = $props();
    const Flag = getFlagComponent(golfer.nationality);

    function selectGolfer() {
        goto(`/golfer/${golfer.id}`);
    }
</script>

<button 
    onclick={selectGolfer}
    class="w-full p-4 text-left transition-colors duration-200 border-b hover:bg-gray-50"
>
    <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
                <h3 class="text-lg font-medium truncate text-BrandForest">
                    {golfer.firstName} {golfer.lastName}
                </h3>
                {#if Flag}
                    <Flag class="w-5 h-5" />
                {/if}
            </div>
        </div>
        <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0">
                <span class="text-sm font-semibold text-BrandDarkGray">World Ranking</span>
                <p class="text-lg condensed text-BrandForest sm:mt-1">#{golfer.worldRanking}</p>
            </div>
        </div>
    </div>
</button>