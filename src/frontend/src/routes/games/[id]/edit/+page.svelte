<script lang="ts">
    import Layout from "../../../Layout.svelte";


</script>

<Layout>
    {#if Object.keys(game.status)[0] != "Unplayed"}
        <p>Game cannot be edited after it has begun.</p>
    {:else}
        <EditGame />

    <!-- 
        -- add or remove players
        -- change date
        -- change course 
        -- change tee
    -->
    {/if}
</Layout>