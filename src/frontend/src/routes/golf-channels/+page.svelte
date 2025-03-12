<script lang="ts">
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import Layout from "../Layout.svelte";

    function createNew(){

    }

</script>
<Layout>
    
    <ListViewPanel title="GOLF CHANNELS" buttonTitle="CREATE CHANNEL" buttonCallback={createNew}>


    <!-- 
        List of golf channels
        Button to create new golf channel
        Click through to golf channel
    -->
    </ListViewPanel>
</Layout>