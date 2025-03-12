<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { golfChannelStore } from "$lib/stores/golf-channel-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GolfChannels, GetGolfChannels } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import GolfChannelSummaryRow from "$lib/components/golf-channel/golf-channel-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = true;
    let golfChannels: GolfChannels | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
        loadGolfChannels();
    });

    function createNew(){
        goto('/golf-channels/create')
    }

    async function changePage(delta: number) {
        const newPage = Number(page) + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGolfChannels();
        }
    }

    async function loadGolfChannels() {
        isLoading = true;
        try {
            const store = $authStore;
            const principalId = store.identity?.getPrincipal();

            if (!principalId) {
                goto('/');
                return;
            }

            let dto: GetGolfChannels = {
                page: page,
                user_id: principalId.toString(),
                searchTerm: '' //TODO implement search
            };

            golfChannels = await golfChannelStore.getGolfChannels(dto);
            
            if (golfChannels?.total && golfChannels?.pageSize) {
                totalPages = BigInt(Math.ceil(Number(golfChannels.total) / Number(golfChannels.pageSize)));
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golf channels.'});
            golfChannels = null;
        } finally {
            isLoading = false;
        }
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="GOLF CHANNELS" buttonTitle="CREATE CHANNEL" buttonCallback={createNew}>
            {#if golfChannels}
                
                {#if golfChannels.entries.length > 0}
                    {#each golfChannels?.entries! as golfChannel}
                        <GolfChannelSummaryRow {golfChannel} />
                    {/each}
                {:else}
                    <p>No golf channels found.</p>
                {/if}                

                <PaginationRow {changePage} currentPage={Number(page)} {totalPages} />
            {:else}
                <p>Error loading golf channels.</p>
            {/if}
        </ListViewPanel>
    {/if}
</Layout>