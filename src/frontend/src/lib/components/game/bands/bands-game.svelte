<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";
    import BandsComplete from "./bands-complete.svelte";
    import BandsPlay from "./bands-play.svelte";
    import BandsPredict from "./bands-predict.svelte";

    export let game: Game;
</script>
{#if Object.keys(game.status)[0] == 'Unplayed'}
    <BandsPredict {game} />
{/if}

{#if Object.keys(game.status)[0] == 'Active'}
    <BandsPlay {game} />
{/if}

{#if Object.keys(game.status)[0] == 'Complete'}
    <BandsComplete {game} />
{/if}