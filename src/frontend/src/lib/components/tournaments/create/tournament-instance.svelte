<script lang="ts">
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { onMount } from "svelte";
    import type { TournamentId, GolfCourseId } from "../../../../../../declarations/backend/backend.did";

    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    interface Props {
        tournamentId: TournamentId;
        golfCourseId: GolfCourseId;
        startDateInput: string;
        endDateInput: string;
    }

    let { tournamentId = $bindable(0), golfCourseId = $bindable(0), startDateInput = $bindable(""), endDateInput = $bindable("") }: Props = $props();
    let isLoading = $state(false);
    let validDates = $derived(startDateInput && endDateInput && new Date(endDateInput) >= new Date(startDateInput));

    onMount(async () => {
        isLoading = true;
        const result = await golfCourseStore.listGolfCourses({ page: 0n });
        if (result) {
            golfCourseStore.set(result.entries);
        }
        isLoading = false;
    });

</script>

{#if isLoading}
    <LocalSpinner message="Loading golf courses" />
{:else}
    <div class="space-y-4 text-black">
        <div>
            <label for="golfCourse" class="block text-sm font-medium text-gray-700">Golf Course</label>
            <select
                id="golfCourse"
                bind:value={golfCourseId}
                class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                required
            >
                <option value="0">Select Golf Course</option>
                {#each $golfCourseStore as course}
                    <option value={course.golfCourseId}>{course.name}</option>
                {/each}
            </select>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    id="startDate"
                    type="date"
                    bind:value={startDateInput}
                    class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                    required
                />
            </div>
            <div>
                <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    id="endDate"
                    type="date"
                    bind:value={endDateInput}
                    min={startDateInput}
                    class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                    required
                />
            </div>
        </div>

        {#if startDateInput && endDateInput && !validDates}
            <p class="text-sm text-BrandError">End date must be after start date</p>
        {/if}
    </div>
{/if}