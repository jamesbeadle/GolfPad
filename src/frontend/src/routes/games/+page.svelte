<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { gameStore } from "$lib/stores/game-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GameSummaries, GetGameSummaries } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import GameSummaryHeader from "$lib/components/game/game-summary-header.svelte";
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
            gameSummaries = sortGameSummaries(gameSummaries);
            
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

    function sortGameSummaries(gameSummaries: GameSummaries): GameSummaries {
        const sortedEntries = [...gameSummaries.entries].sort((a, b) => {
            const statusPriority = {
                'Unplayed': 1,
                'Active': 2,
                'Complete': 3
            } as const;
            
            const statusA = Object.keys(a.status)[0] as keyof typeof statusPriority;
            const statusB = Object.keys(b.status)[0] as keyof typeof statusPriority;
            
            return statusPriority[statusA] - statusPriority[statusB];
        });

        return { ...gameSummaries, entries: sortedEntries };
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="MY GAMES" buttonTitle="NEW GAME" buttonCallback={createNew}>
            <div class="flex flex-col -mx-[0.7rem]">
                <div class="rounded-lg bg-BrandLightGray">
                    <div class="px-4">
                        <GameSummaryHeader />
                    </div>
                    <div class="px-4 space-y-4">
                        {#if gameSummaries}
                            {#if gameSummaries.entries.length > 0}
                                {#each gameSummaries?.entries! as gameSummary}
                                    <GameSummaryRow {gameSummary} />
                                {/each}
                            {:else}
                                <p>You have no games.</p>
                            {/if}                

                            <PaginationRow {changePage} {page} total={gameSummaries.total} pageSize={gameSummaries.pageSize} typeName='game summary' />
                        {:else}
                            <p>Error loading game summaries.</p>
                        {/if}
                    </div>
                </div>
            </div>
        </ListViewPanel>
    {/if}
</Layout>