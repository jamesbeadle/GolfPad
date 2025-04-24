<script lang="ts">
    import { getFlagComponent } from "$lib/utils/helpers";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";
    import ArrowUpIcon from "$lib/icons/arrow-up-icon.svelte";
    
    interface Props {
        golfer: GolferSummary;
        isSelected: boolean;
    }
    let { golfer, isSelected }: Props = $props();
</script>


<div class="flex items-center justify-between w-full px-2 py-2 sm:px-4">
    <div class="flex items-center space-x-2 sm:space-x-8">
        <span class="w-12 text-lg sm:w-16 sm:text-xl condensed text-BrandForest">
            #{golfer.worldRanking}
        </span>
        <div class="flex items-center space-x-1 sm:space-x-2">
            <div class="text-sm font-medium sm:text-base text-BrandTextBlack">
                {golfer.firstName} {golfer.lastName}
            </div>
            {#if true}
                {@const Flag = getFlagComponent(golfer.nationality)}
                {#if Flag}
                    <Flag class="hidden w-4 h-4 sm:block sm:w-5 sm:h-5" />
                {/if}
            {/if}
        </div>
    </div>
    {#if isSelected}
        <div class="flex flex-row items-center justify-center">
            <p class="text-xs sm:text-sm text-BrandForest">Golfer Already Selected</p>
        </div>
    {:else}
        <ArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" fill="BrandDarkGray" />
    {/if}
</div>