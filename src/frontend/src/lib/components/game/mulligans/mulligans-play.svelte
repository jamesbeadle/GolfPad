<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import MulligansGameDetail from "./mulligans-game-detail.svelte";
    import MulligansPlayersScores from "./mulligans-players-scores.svelte";

    export let game: Game;

    let isLoading = true;


</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <GameCourseInfoSummary golfCourse={golfCourse!} />
        <MulligansPlayersScores {game} />
        <MulligansGameDetail />
    </div>
{/if}

