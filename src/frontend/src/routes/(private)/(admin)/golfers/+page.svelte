<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { golferStore } from "$lib/stores/golfer-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { ListGolfers, Golfers } from './../../../../../../declarations/backend/backend.did.d.ts';
    
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GolfersSummaryRow from "$lib/components/golfer/golfers-summary-row.svelte";

    let isLoading = $state(true);
    let golfers: Golfers | null = $state(null);
    let page = $state(1n);
    let totalPages = $state(1n); 

    onMount( async () => {
        loadGolfers(1n);
    });

    async function changePage(delta: bigint) {
        const newPage = page + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGolfers(page);
        }
    }

    async function loadGolfers(page: bigint) {
        isLoading = true;
        try {

            let dto: ListGolfers = {
                page
            };

            golfers = await golferStore.listGolfers(dto);
            sortGolfers();
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golfers.'});
            golfers = null;
        } finally {
            isLoading = false;
        }
    }

    async function sortGolfers() {
        if (golfers) {
            golfers.entries.sort((a, b) => Number(a.worldRanking) - Number(b.worldRanking));
        }
    }

    function createNew() {
        goto('/golfers/create');
    }

</script>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="GOLFERS" buttonTitle="ADD GOLFER" buttonCallback={createNew}>
            {#if golfers}
                {#if golfers.entries.length > 0}
                    {#each golfers?.entries! as golfer}
                        <GolfersSummaryRow {golfer} />
                    {/each}
                    <PaginationRow {changePage} {page} total={golfers.totalEntries} typeName='golfers' pageSize={golfers.page} />
                {:else}
                    <p class="text-center text-black">No golfers found.</p>
                {/if}                
            {:else}
                <p class="text-center text-black">Error loading golfers.</p>
            {/if}
        </ListViewPanel>
    {/if}