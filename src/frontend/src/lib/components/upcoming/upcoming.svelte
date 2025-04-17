<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { userStore } from "$lib/stores/user-store";
    import type { GetUpcomingGames, UpcomingGames } from "../../../../../declarations/backend/backend.did";
    import UpcomingRow from "./upcoming-row.svelte";
    import BrandPanelInset from "../shared/brand-panel-inset.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";

    let isLoading = true;
    let isLoadingMore = false;
    let currentPage = 1n;
    let upcomingGames: UpcomingGames | null = null;

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
                    principalId: principalId ? principalId.toString() : ''
                };

                upcomingGames = await userStore.getUpcomingGames(dto);
            });
        } catch (error) {
            console.error('Error loading upcoming games:', error);
        } finally {
            isLoading = false;
            isLoadingMore = false;
        }
    }

    function createNew(){
        goto('/games/create')
    }
    

</script>

<BrandPanelInset title="UPCOMING" subTitle="YOUR SCHEDULED MATCHES">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#if upcomingGames}
            {#each upcomingGames.entries as upcomingGame}
                <UpcomingRow {upcomingGame} />
            {/each}
        {/if}

        <div class="flex items-center justify-center mt-4">
            <button
                onclick={createNew}
                class="flex justify-center w-full px-6 py-3 text-lg font-bold text-black rounded-lg bg-BrandYellow hover:bg-BrandYellow/80">
                    <span class="flex items-center justify-center w-6 h-6 mr-2 text-xl font-bold bg-black rounded-full shadow-md text-BrandYellow">+</span>
                    NEW GAME
            </button>
        </div>
    {/if}
</BrandPanelInset> 

