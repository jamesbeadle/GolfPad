<script lang="ts">
    import type { Game, GetGolfCourse, GolfCourse, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import MulligansGameDetail from "./mulligans-game-detail.svelte";
    import MulligansPlayersScores from "./mulligans-players-scores.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;

    let isLoading = true;

</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <GameCourseInfoSummary golfCourse={golfCourse!} />
        <MulligansPlayersScores {game} {players} />
        <MulligansGameDetail {game} {players} golfCourse={golfCourse!} />
    </div>
{/if}

