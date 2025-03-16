<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <GameCourseInfoSummary golfCourse={golfCourse!} />
        <BandsPlayerScores {game} />
        <BandsGameDetail />
    </div>
{/if}
