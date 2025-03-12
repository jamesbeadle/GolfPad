<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { golfTeamStore } from "$lib/stores/golf-team-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GolfTeams, GetGolfTeams } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import GolfTeamSummaryRow from "$lib/components/golf-team/golf-team-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = true;
    let golfTeams: GolfTeams | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
        loadGolfTeams();
    });

    function createNew(){
        goto('/golf-Teams/create')
    }

    async function changePage(delta: number) {
        const newPage = Number(page) + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGolfTeams();
        }
    }

    async function loadGolfTeams() {
        isLoading = true;
        try {
            const store = $authStore;
            const principalId = store.identity?.getPrincipal();

            if (!principalId) {
                goto('/');
                return;
            }

            let dto: GetGolfTeams = {
                page: page,
                user_id: principalId.toString(),
                searchTerm: '' //TODO implement search
            };

            golfTeams = await golfTeamStore.getGolfTeams(dto);
            
            if (golfTeams?.total && golfTeams?.pageSize) {
                totalPages = BigInt(Math.ceil(Number(golfTeams.total) / Number(golfTeams.pageSize)));
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golf teams.'});
            golfTeams = null;
        } finally {
            isLoading = false;
        }
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
    <!-- - Search for a new team
        - Add it to my favourite teams -->
       
        <ListViewPanel title="GOLF TEAMS" buttonTitle="ADD GOLF TEAM" buttonCallback={createNew}>
            {#if golfTeams}

                {#if golfTeams.entries.length > 0}
                    {#each golfTeams?.entries! as golfTeam}
                        <GolfTeamSummaryRow {golfTeam} />
                    {/each}
                {:else}
                    <p>No golf teams found.</p>
                {/if}                

                <PaginationRow {changePage} currentPage={Number(page)} {totalPages} />
            {:else}
                <p>Error loading golf teams.</p>
            {/if}
        </ListViewPanel>
    {/if}
</Layout>