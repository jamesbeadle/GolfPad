<script lang="ts">
    import { goto } from "$app/navigation";
    import { tournamentStore } from "$lib/stores/tournament-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { convertDateInputToUnixNano } from "$lib/utils/helpers";
    import type { CreateTournament } from "../../../../../../../declarations/backend/backend.did";
    
    import BrandPanel from "$lib/components/shared/brand-panel.svelte";
    import BasicInfo from "$lib/components/tournaments/create/basic-info.svelte";
    import TournamentInstance from "$lib/components/tournaments/create/tournament-instance.svelte";
    import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
    
    interface CreateTournamentInstance {
        tournamentId: number;
        golfCourseId: number;
        year: number;
        startDate: number;
        endDate: number;
    };
    let isLoading = $state(false);
    let name = $state("");
    let tournamentId = $state(0);
    let golfCourseId = $state(0);
    let startDateInput = $state("");
    let endDateInput = $state("");

    let year = $derived(startDateInput ? new Date(startDateInput).getFullYear() : 0);
    let startDate = $derived(startDateInput ? Number(convertDateInputToUnixNano(startDateInput)) : 0);
    let endDate = $derived(endDateInput ? Number(convertDateInputToUnixNano(endDateInput)) : 0);
    let validDates = $derived(startDate && endDate && endDate >= startDate);

    async function submitTournament() {
        if (!name) {
            alert("Please enter a tournament name");
            return;
        }

        if (!golfCourseId || !validDates) {
            alert("Please fill all tournament instance fields and ensure end date is after start date");
            return;
        }

        const dto: CreateTournament = {
            name
        };
        isLoading = true;
        try {
            await tournamentStore.createTournament(dto);
            await submitTournamentInstance();
            toasts.addToast({type: 'success', message: 'Tournament created successfully!', duration: 5000});
            goto("/tournaments");
        } catch (error) {
            console.error("Failed to create tournament:", error);
            toasts.addToast({type: 'error', message: 'Failed to create tournament', duration: 5000});
        } finally {
            isLoading = false;
        }
    }

    async function submitTournamentInstance() {
        const dto: CreateTournamentInstance = {
            tournamentId,
            golfCourseId,
            year,
            startDate,
            endDate
        };

        try {
            console.log(dto);
            //await tournamentStore.createTournamentInstance(dto);
        } catch (error) {
            console.error("Failed to create tournament instance:", error);
        }
    }
</script>

<BrandPanel title="CREATE TOURNAMENT" subTitle="">
    {#if isLoading}
        <FullScreenSpinner message="Creating tournament" />
    {:else}
        <form onsubmit={submitTournament} class="space-y-6">
            <div class="grid grid-cols-1 gap-4">
                <BasicInfo bind:name />

                <TournamentInstance
                    tournamentId={tournamentId}
                    bind:golfCourseId
                    bind:startDateInput
                    bind:endDateInput
                />
            </div>

            <div class="flex justify-end pt-6">
                <button
                    type="button"
                    class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
                    onclick={() => goto("/tournaments")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-BrandForest hover:bg-BrandForest/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
                >
                    {isLoading ? 'Creating...' : 'Create Tournament'}
                </button>
            </div>
        </form>
    {/if}
</BrandPanel>
