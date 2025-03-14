<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { gameStore } from "$lib/stores/game-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GameSummaries, GetGameSummaries } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import GameSummaryRow from "$lib/components/game/game-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = true;
    let gameSummaries: GameSummaries | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
        loadGameSummaries();
    });

    function createNew(){
        goto('/games/create')
    }

    async function changePage(delta: bigint) {
        const newPage = page + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGameSummaries();
        }
    }

    async function loadGameSummaries() {
        isLoading = true;
        try {
            const store = $authStore;
            const principalId = store.identity?.getPrincipal();

            if (!principalId) {
                goto('/');
                return;
            }

            let dto: GetGameSummaries = {
                page: page,
                principalId: principalId.toString()
            };

            gameSummaries = await gameStore.getGameSummaries(dto);
            
            if (gameSummaries?.total && gameSummaries?.pageSize) {
                totalPages = BigInt(Math.ceil(Number(gameSummaries.total) / Number(gameSummaries.pageSize)));
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading game summaries.'});
            gameSummaries = null;
        } finally {
            isLoading = false;
        }
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="GAMES" buttonTitle="NEW GAME" buttonCallback={createNew}>
            {#if gameSummaries}
                
                {#if gameSummaries.entries.length > 0}
                    {#each gameSummaries?.entries! as game}
                        <GameSummaryRow {game} />
                    {/each}
                {:else}
                    <p>You have no games.</p>
                {/if}                

                <PaginationRow {changePage} {page} total={gameSummaries.total} pageSize={gameSummaries.pageSize} typeName='game summary' />
            {:else}
                <p>Error loading game summaries.</p>
            {/if}
        </ListViewPanel>
    {/if}
</Layout>