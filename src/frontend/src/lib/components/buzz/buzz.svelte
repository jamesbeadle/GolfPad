<script lang="ts">
    import { onMount } from "svelte";


    import BrandPanel from "../shared/brand-panel.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import BuzzRow from "./buzz-row.svelte";
    import { appStore } from "$lib/stores/app-store";
    import type { BuzzEntries, GetBuzzEntries } from "../../../../../declarations/backend/backend.did";
    import { authStore } from "$lib/stores/auth-store";

    let isLoading = true;
    let isLoadingMore = false;
    let currentPage = 1n;
    let buzzEntries: BuzzEntries = { entries: [], page: currentPage }; 
    let hasMore = true;

    onMount(async () => {
        await loadBuzzEntries(currentPage);
    });

    async function loadBuzzEntries(page: bigint) {
        try {
            authStore.subscribe(async (store) => {
                let principalId = store.identity?.getPrincipal();
                
                const dto: GetBuzzEntries = {
                    page: page,
                    user_id: principalId ? principalId.toString() : ''
                };

                const newEntries = await appStore.getBuzzEntries(dto);
                
                buzzEntries = {
                    entries: [...buzzEntries.entries, ...newEntries.entries],
                    page: currentPage
                };
                
                hasMore = newEntries.entries.length > 0;
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
<BrandPanel title="The Buzz" subTitle="The latest Matches">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#each buzzEntries.entries as buzzItem}
            <BuzzRow {buzzItem} />
        {/each}

        {#if buzzEntries.entries.length > 0}
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
</BrandPanel>