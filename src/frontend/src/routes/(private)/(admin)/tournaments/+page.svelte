<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { tournamentStore } from "$lib/stores/tournament-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { ListTournaments, Tournaments } from '../../../../../../declarations/backend/backend.did.js';
    
    import TournamentSummaryRow from "$lib/components/tournaments/tournament-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = $state(true);
    let tournaments: Tournaments | null = $state(null);
    let page = $state(1n); 
    let pageSize = $state(10n); 

    onMount( async () => {
        loadTournaments();
    });

    function createNew(){
        goto('/tournaments/create')
    }

    async function changePage(newPage: bigint) {
        if (!tournaments) return;

        const totalPages = tournaments.totalEntries / pageSize + (tournaments.totalEntries % pageSize > 0n ? 1n : 0n);
        if (newPage < 1n || newPage > totalPages) {
            return;
        }
        page = newPage;
        await loadTournaments();
    }

    async function loadTournaments() {
        isLoading = true;
        try {
            let dto: ListTournaments = {
                page: page
            };

            const result = await tournamentStore.listTournaments(dto);
            if (result) {
                tournaments = result;
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading tournaments.'});
            tournaments = null;
        } finally {
            isLoading = false;
        }
    }
</script>

    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="TOURNAMENTS" buttonTitle="ADD TOURNAMENT" buttonCallback={createNew}>
            {#if tournaments}
                {#if tournaments.entries.length > 0}
                    {#each tournaments?.entries! as tournament}
                        <TournamentSummaryRow {tournament} />
                    {/each}
                {:else}
                    <p class="text-center text-black">No tournaments found.</p>
                {/if}                

                <PaginationRow {changePage} {page} {pageSize} typeName="tournaments" total={tournaments.totalEntries} />
            {:else}
                <p class="text-center text-black">Error loading tournaments.</p>
            {/if}
        </ListViewPanel>
    {/if}
