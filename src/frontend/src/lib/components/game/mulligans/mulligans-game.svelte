<script lang="ts">
    import type { Game, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import MulligansComplete from "./mulligans-complete.svelte";
    import MulligansCountdown from "./mulligans-countdown.svelte";
    import MulligansPlay from "./mulligans-play.svelte";

    export let game: Game;
    export let players: GolferSummary[];
</script>
{#if Object.keys(game.status)[0] == 'Unplayed'}
    <MulligansCountdown {game} {players} />
{/if}

{#if Object.keys(game.status)[0] == 'Active'}
    <MulligansPlay {game} {players} />
{/if}

{#if Object.keys(game.status)[0] == 'Complete'}
    <MulligansComplete {game} {players} />
{/if}