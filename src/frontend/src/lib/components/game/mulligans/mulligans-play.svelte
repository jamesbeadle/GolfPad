<script lang="ts">
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import MulligansGameDetail from "./mulligans-game-detail.svelte";
    import MulligansPlayersScores from "./mulligans-players-scores.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;

</script>

<div class="flex flex-col w-full md:flex-row">
    <div class="w-full md:w-1/3">
        <GameCourseInfoSummary golfCourse={golfCourse!} date={game.teeOffTime} />
    </div>

    <div class="w-full mt-2 md:mt-0 md:w-1/3">
        <MulligansPlayersScores {players} />
    </div>
    <div class="w-full mt-4 md:mt-0 md:w-1/3">
        <MulligansGameDetail {players} golfCourse={golfCourse!} />
    </div>
</div>

