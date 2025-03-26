<script lang="ts">
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import MulligansComplete from "./mulligans-complete.svelte";
    import MulligansCountdown from "./mulligans-countdown.svelte";
    import MulligansPlay from "./mulligans-play.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;
</script>


{#if Object.keys(game.status)[0] == 'Unplayed'}
    <MulligansCountdown {game} {players} {golfCourse} />
{/if}

{#if Object.keys(game.status)[0] == 'Active'}
    <MulligansPlay {game} {players} {golfCourse} />
{/if}

{#if Object.keys(game.status)[0] == 'Complete'}
    <MulligansComplete {game} {players} {golfCourse} />
{/if}