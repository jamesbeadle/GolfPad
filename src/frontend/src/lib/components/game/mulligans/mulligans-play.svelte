<script lang="ts">
    import type { Game, GetGolfCourse, GolfCourse } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import MulligansGameDetail from "./mulligans-game-detail.svelte";
    import MulligansPlayersScores from "./mulligans-players-scores.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { toasts } from "$lib/stores/toasts-store";

    export let game: Game;

    let isLoading = true;
    let golfCourse: GolfCourse | null = null;
    
    async function fetchGolfCourse() {
        try {
            let dto: GetGolfCourse = { id: game.courseId };
            golfCourse = await golfCourseStore.getGolfCourse(dto);
        } catch {
            toasts.addToast({ type: "error", message: "Error loading golf course." });
        } finally {
            isLoading = false;
        }
    }

    fetchGolfCourse();

</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <GameCourseInfoSummary golfCourse={golfCourse!} />
        <MulligansPlayersScores {game} />
        <MulligansGameDetail {game} />
    </div>
{/if}

