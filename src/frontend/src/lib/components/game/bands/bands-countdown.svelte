<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GetGolfCourse, GolfCourse, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import GameCourseInfoSummary from "../game-course-info-summary.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { toasts } from "$lib/stores/toasts-store";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import BandsPlayerSummary from "./bands-player-summary.svelte";

    export let game: Game;
    let players: GolferSummary[] = [];

    let isLoading = true;
    let golfCourse: GolfCourse | null = null;
    let countdown: string = "";
    let gameStart: bigint | undefined;

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

    async function fetchGolfCourse() {
        try {
            let dto: GetGolfCourse = { id: game.courseId };
            golfCourse = await golfCourseStore.getGolfCourse(dto);
            gameStart = game.teeOffTime;
            if (gameStart !== undefined) {
                updateCountdown(gameStart);
            }
        } catch {
            toasts.addToast({ type: "error", message: "Error loading golf course." });
        } finally {
            isLoading = false;
        }
    }

    fetchGolfCourse();

    onMount(() => {
        let interval: NodeJS.Timeout | undefined;

        const checkGameStart = setInterval(() => {
            if (gameStart !== undefined) {
                clearInterval(checkGameStart);
                interval = setInterval(() => {
                    updateCountdown(gameStart!);
                }, 1000);
            }
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
        <BandsPlayerSummary {players} />
        <p>{countdown}</p>
    </div>
{/if}