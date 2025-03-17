
<script lang="ts">
    import type { GolferSummary } from "../../../../../../declarations/backend/backend.did";


    export let players: GolferSummary[];
</script>

<div class="flex flex-row">
    {#each players as player}
        <p>{player.name}</p> <!-- // TODO-->
    {/each}
</div>