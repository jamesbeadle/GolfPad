
<script lang="ts">

    export let game: Game;
</script>

<div class="flex flex-row">
    {#each game.players as player}
        <p>{player.name}</p>
    {/each}
</div>