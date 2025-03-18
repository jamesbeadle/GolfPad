<script lang="ts">
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import BandsGameDetail from "./bands-game-detail.svelte";
    import BandsPlayersScores from "./bands-player-scores.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;

</script>

<div class="flex flex-col w-full">
    <GameCourseInfoSummary golfCourse={golfCourse!} />
    <BandsPlayersScores {game} {players} />
    <BandsGameDetail {game} {players} golfCourse={golfCourse!} />
</div>

