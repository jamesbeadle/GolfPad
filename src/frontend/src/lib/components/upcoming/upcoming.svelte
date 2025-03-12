<script lang="ts">
    import { onMount } from "svelte";
    import BrandPanelInset from "../shared/brand-panel-inset.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { gameStore } from "$lib/stores/game-store";

    let isLoading = true;
    let isLoadingMore = false;
    let currentPage = 1n;
    let upcomingGames: UpcomingGames = { games: [], page: currentPage }; 
    let hasMore = true;

    onMount(async () => {
        await loadUpcomingGames(currentPage);
    });

    async function loadUpcomingGames(page: bigint) {
        try {
            authStore.subscribe(async (store) => {
                let principalId = store.identity?.getPrincipal();

                if(!principalId){
                    return;
                }
                
                const dto: GetUpcomingGames = {
                    page: page,
                    user_id: principalId ? principalId.toString()
                };

                const newGames = await gameStore.getUpcomingGames(dto);
                
                upcomingGames = {
                    entries: [...upcomingGames.entries, ...newGames.entries],
                    page: currentPage
                };
                
                hasMore = upcomingGames.entries.length > 0;
            });
        } catch (error) {
            console.error('Error loading buzz entries:', error);
        } finally {
            isLoading = false;
            isLoadingMore = false;
        }
    }

    async function loadMore() {
        if (!hasMore || isLoadingMore) return;
        
        isLoadingMore = true;
        currentPage += 1n;
        await loadBuzzEntries(currentPage);
    }

</script>
<BrandPanelInset title="UPCOMING" subTitle="YOUR SCHEDULED MATCHES">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#each upcomingEntries.entries as buzzItem}
            <UpcomingGameRow {buzzItem} />
        {/each}

        {#if upcomingEntries.entries.length > 0}
            <div class="load-more-container">
                {#if isLoadingMore}
                    <LocalSpinner />
                {:else if hasMore}
                    <button on:click={loadMore} class="more-button">
                        More
                    </button>
                {:else}
                    <p>No more entries to load</p>
                {/if}
            </div>
        {/if}
    {/if}
</BrandPanelInset> 