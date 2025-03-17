<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, BandsScores } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import UserProfileHorizontal from "$lib/components/shared/user-profile-horizontal.svelte";
    import UserSelectCell from "$lib/components/shared/user-select-cell.svelte";

    export let game: Game;
    export let golfCourse: GolfCourseTeeGroup;
    export let players: GolferSummary[];

    let isLoading = true;
    let scores: BandsScores | null = null;
    let currentHole: number = 1;
    let currentPar: number = 0;
    let currentSI: number = 0;
    let currentYardage: bigint = 0n;

    onMount(async () => {
        try {
            setGameInfo();
        } catch (error) {
            console.error("Error processing game data:", error);
        } finally {
            isLoading = false;
        }
    });

    function setGameInfo(){
        const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
            switch (gameType) {
                case "Bands":
                    if (game.scoreDetail && game.scoreDetail.length > 0) {
                        const scoreDetail = game.scoreDetail[0];
                        if(!scoreDetail){ return }
                        if ("BandsScores" in scoreDetail) {
                            scores = scoreDetail.BandsScores as BandsScores;
                            currentHole = scores.currentHole;

                            let currentHoleDetail = golfCourse.holes.find(x => x.number == currentHole);
                            if(currentHoleDetail){
                                currentPar = currentHoleDetail.par;
                                currentSI = currentHoleDetail.strokeIndex;
                                currentYardage = currentHoleDetail.yardage;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
    }
    
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

    <!-- TODO -->

    <div class="flex flex-row">
        <button class="w-1/2">PREVIOUS HOLE</button>
        <button class="w-1/2">NEXT HOLE</button>
    </div>
{/if}