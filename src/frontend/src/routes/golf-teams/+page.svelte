<script lang="ts">
    import { onMount } from "svelte";
    
    import Layout from "../Layout.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { toasts } from "$lib/stores/toasts-store";

    let isLoading = true;

    onMount( async () => {
    });

    async function createNew(){
        toasts.addToast({type: 'info', message: 'Golf Teams coming soon.'})
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <ListViewPanel title="GOLF TEAMS" buttonTitle="CREATE GOLF TEAM" buttonCallback={createNew}>
           <p>Golf Teams Coming Soon.</p>
        </ListViewPanel>
    {/if}
</Layout>