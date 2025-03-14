<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { golfTeamStore } from "$lib/stores/golf-team-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GolfTeams, GetGolfTeams } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    let isLoading = true;
    let golfTeams: GolfTeams | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
    });

    async function createNew(){
        
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="GOLF TEAMS" buttonTitle="ADD GOLF TEAM" buttonCallback={createNew}>
           <p>Golf Teams Coming Soon.</p>
        </ListViewPanel>
    {/if}
</Layout>