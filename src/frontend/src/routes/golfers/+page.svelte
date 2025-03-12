<script lang="ts">
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import Layout from "../Layout.svelte";

    function createNew(){
        
    }

</script>

<Layout>
    <ListViewPanel title="GOLF TEAMS" buttonTitle="NEW GOLF TEAM" buttonCallback={createNew}>

    <!--
        List of your golf teams
    -->
    </ListViewPanel>
</Layout>   