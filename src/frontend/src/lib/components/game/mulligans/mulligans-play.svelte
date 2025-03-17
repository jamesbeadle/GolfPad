<script lang="ts">
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import MulligansGameDetail from "./mulligans-game-detail.svelte";
    import MulligansPlayersScores from "./mulligans-players-scores.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;

</script>

<div class="flex flex-col w-full">
    <GameCourseInfoSummary golfCourse={golfCourse!} />
    <MulligansPlayersScores {game} {players} />
    <MulligansGameDetail {game} {players} golfCourse={golfCourse!} />
</div>

