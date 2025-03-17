<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourse, MulligansScores } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";

    export let game: Game;
    export let golfCourse: GolfCourse;

    let isLoading = true;
    let scores: MulligansScores | null = null;
    let currentHole: number = 1;
    let currentPar: number = 4;
    let currentSI: number = 1;
    let currentYardage: number = 350;

    onMount(() => {
        try {
            const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
            switch (gameType) {
                case "Mulligans":
                    if (game.scoreDetail && game.scoreDetail.length > 0) {
                        const scoreDetail = game.scoreDetail[0];
                        if(!scoreDetail){ return }
                        if ("MulligansScores" in scoreDetail) {
                            scores = scoreDetail.MulligansScores as MulligansScores;
                            let mulligansResults = scores.results;

                            if (mulligansResults.length > 0) {
                                const highestHole = mulligansResults
                                    .sort((a, b) => b.holeNumber - a.holeNumber)[0]
                                    .holeNumber;
                                currentHole = highestHole < golfCourse.totalHoles ? highestHole + 1 : golfCourse.totalHoles;
                            } else {
                                currentHole = 1;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error processing game data:", error);
        } finally {
            isLoading = false;
        }
    });

    
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <p>Scorecard</p>
    </div>

    <div class="flex flex-row">
        <div class="w-1/4">
            <div class="flex flex-col">
                <p class="text-xs">HOLE</p>
                <p>{currentHole}</p>
            </div>
        </div>
        <div class="w-1/4">
            <div class="flex flex-col">
                <p class="text-xs">PAR</p>
                <p>{currentPar}</p>
            </div>
        
        </div>
        <div class="w-1/4">
            <div class="flex flex-col">
                <p class="text-xs">YARDS</p>
                <p>{currentYardage}</p>
            </div>
        </div>
        <div class="w-1/4">
            <div class="flex flex-col">
                <p class="text-xs">S.I.</p>
                <p>{currentSI}</p>
            </div>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="w-1/2">
            <p>PLAYER</p>
        </div>
        <div class="w-1/2">
            <p>AVAILABLE MULLIGANS</p>
        </div>
    </div>

    {#each game.playerIds as player}
        <div class="w-1/2">
            <UserProfileScoreWidget />
        </div>
        <div class="w-1/4">
            <p>{ if(scores.) player.availableMulligans}</p>
        </div>
        <div class="w-1/4">
            <button class="brand-button">USE</button>
        </div>
    {/each}

    <div class="flex flex-row">
        <div class="w-1/2">
            <p>WINNER</p>
        </div>
        <div>
            <p>SELECT THE WINNER OF THE HOLE</p>
        </div>
    </div>

    <div class="flex flex-row">

        {#each players as player}
            <div class="w-1/2">
                <UserSelectWidget />
            </div>
        {/each}
    </div>

    <div class="flex flex-row">
        <button class="w-1/2">PREVIOUS HOLE</button>
        <button class="w-1/2">NEXT HOLE</button>
    </div>
{/if}