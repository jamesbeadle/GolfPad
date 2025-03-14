<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";
    import MulligansComplete from "./mulligans-complete.svelte";
    import MulligansCountdown from "./mulligans-countdown.svelte";
    import MulligansPlay from "./mulligans-play.svelte";

    export let game: Game;
</script>
{#if Object.keys(game.status)[0] == 'Unplayed'}
    <MulligansCountdown {game} />
{/if}

{#if Object.keys(game.status)[0] == 'Active'}
    <MulligansPlay {game} />
{/if}

{#if Object.keys(game.status)[0] == 'Complete'}
    <MulligansComplete {game} />
{/if}