<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import LoggedInPlayersWithPlayer from "$lib/components/shared/logged-in-players-with-player.svelte";

    export let game: Game;
    export let golfCourse: GolfCourseTeeGroup;
    let players: GolferSummary[] = [];

    let isLoading = true;
    let countdown: string = "";

    function updateCountdown(teeOffTime: bigint) {
        const teeOffDate = new Date(Number(teeOffTime));
        const now = new Date();
        const timeDiff = teeOffDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
            countdown = "Game Begun";
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    onMount(() => {
        let interval: NodeJS.Timeout | undefined;

        const checkGameStart = setInterval(() => {
            clearInterval(checkGameStart);
            interval = setInterval(() => {
                updateCountdown(game.teeOffTime);
            }, 1000);
        }, 100);

        return () => {
            if (interval) clearInterval(interval);
            clearInterval(checkGameStart);
        };
    });
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <GameCourseInfoSummary golfCourse={golfCourse!} />
        <LoggedInPlayersWithPlayer {players} />
        <p>{countdown}</p>
    </div>
{/if}