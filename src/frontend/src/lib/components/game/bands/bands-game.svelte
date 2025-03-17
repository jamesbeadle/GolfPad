<script lang="ts">
    import type { Game, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import BandsComplete from "./bands-complete.svelte";
    import BandsPlay from "./bands-play.svelte";
    import BandsPredict from "./bands-predict.svelte";

    export let game: Game;
    export let players: GolferSummary[];
</script>
{#if Object.keys(game.status)[0] == 'Unplayed'}
    <BandsPredict {game} {players} />
{/if}

{#if Object.keys(game.status)[0] == 'Active'}
    <BandsPlay {game} {players} />
{/if}

{#if Object.keys(game.status)[0] == 'Complete'}
    <BandsComplete {game} {players} />
{/if}