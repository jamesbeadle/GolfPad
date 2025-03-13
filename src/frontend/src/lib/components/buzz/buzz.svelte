<script lang="ts">
    import { onMount } from "svelte";
    import type { Buzz, GetBuzz } from "../../../../../declarations/backend/backend.did";
    import { hasMorePages } from "$lib/utils/helpers";
    import { authStore } from "$lib/stores/auth-store";
    import { userStore } from "$lib/stores/user-store";
    import BrandPanel from "../shared/brand-panel.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import BuzzRow from "./buzz-row.svelte";

    export let buzz: Buzz | null = null;
    let isLoading = true;
    let isLoadingMore = false;
    let currentPage = 1n;
    let hasMore = true;

    onMount(async () => {
        await loadBuzzEntries(currentPage);
    });

    async function loadBuzzEntries(page: bigint) {
        try {
            authStore.subscribe(async (store) => {
                let principalId = store.identity?.getPrincipal();
                
                const dto: GetBuzz = {
                    page: page,
                    principalId: principalId ? principalId.toString() : ''
                };

                buzz = await userStore.getBuzz(dto);
                
                hasMore = hasMorePages(buzz.page, buzz.pageSize, buzz.total);
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
        {#if buzz}
            {#each buzz.entries as buzzItem}
                <BuzzRow {buzzItem} />
            {/each}

            {#if buzz.entries.length > 0}
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
        {:else}
            <p>Feed not found</p>
        {/if}
    {/if}
</BrandPanel>