<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { golferStore } from "$lib/stores/golfer-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { Golfers, GetGolfers } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import BrandPanel from "$lib/components/shared/brand-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GolfersSummaryRow from "$lib/components/golfer/golfers-summary-row.svelte";

    let isLoading = true;
    let golfers: Golfers | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
        loadGolfers();
    });

    async function changePage(delta: number) {
        const newPage = Number(page) + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGolfers();
        }
    }

    async function loadGolfers() {
        isLoading = true;
        try {
            const store = $authStore;
            const principalId = store.identity?.getPrincipal();

            if (!principalId) {
                goto('/');
                return;
            }

            let dto: GetGolfers = {
                page: page,
                user_id: principalId.toString(),
                searchTerm: '' //TODO implement search
            };

            golfers = await golferStore.getGolfers(dto);
            
            if (golfers?.total && golfers?.pageSize) {
                totalPages = BigInt(Math.ceil(Number(golfers.total) / Number(golfers.pageSize)));
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golfers.'});
            golfers = null;
        } finally {
            isLoading = false;
        }
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <BrandPanel title="GOLFERS" subTitle="ALL GOLFPAD PLAYERS">
            {#if golfers}

                {#if golfers.entries.length > 0}
                    {#each golfers?.entries! as golfer}
                        <GolfersSummaryRow {golfer} />
                    {/each}
                {:else}
                    <p>No golfers found.</p>
                {/if}                

                <PaginationRow {changePage} currentPage={Number(page)} {totalPages} />
            {:else}
                <p>Error loading golfers.</p>
            {/if}
        </BrandPanel>
    {/if}
</Layout>