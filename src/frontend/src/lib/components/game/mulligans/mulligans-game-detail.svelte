<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GetGolfCourseTeeGroup, GolfCourse, GolferSummary, MulligansScores } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import UserProfileHorizontal from "$lib/components/shared/user-profile-horizontal.svelte";
    import UserSelectCell from "$lib/components/shared/user-select-cell.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { golferStore } from "$lib/stores/golfer-store";

    export let game: Game;
    export let golfCourse: GolfCourse;

    let isLoading = true;
    let scores: MulligansScores | null = null;
    let currentHole: number = 1;
    let currentPar: number = 0;
    let currentSI: number = 0;
    let currentYardage: bigint = 0n;
    let golferSummaries: GolferSummary[] = [];

    let player1MulligansAvailable = 0;
    let player2MulligansAvailable = 0;

    onMount(async () => {
        try {
            await setGolfCourseInfo();
            await setGolferSummaries();
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
                case "Mulligans":
                    if (game.scoreDetail && game.scoreDetail.length > 0) {
                        const scoreDetail = game.scoreDetail[0];
                        if(!scoreDetail){ return }
                        if ("MulligansScores" in scoreDetail) {
                            scores = scoreDetail.MulligansScores as MulligansScores;
                            let mulligansResults = scores.results;
                            player1MulligansAvailable = scores.golfer1MulligansAvailable;
                            player2MulligansAvailable = scores.golfer2MulligansAvailable;

                            if (mulligansResults.length > 0) {
                                const highestHole = mulligansResults
                                    .sort((a, b) => b.holeNumber - a.holeNumber)[0]
                                    .holeNumber;
                                currentHole = highestHole < golfCourse.totalHoles ? highestHole + 1 : golfCourse.totalHoles;
                            } else {
                                currentHole = 1;
                            }

                            let courseTees = golfCourse.tees.find(x => x.index == game.courseSnapshot.teeGroupIndex);
                            if(courseTees){
                                var currentTeeHole = courseTees.holes.find(x => x.number == currentHole);
                                if(!currentTeeHole){ return; }
                                currentPar = currentTeeHole.par;
                                currentSI = currentTeeHole.strokeIndex;
                                currentYardage = currentTeeHole.yardage;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
    }

    async function setGolferSummaries() {
        //For each golfer fetch their summary and store
        golferSummaries = await golferStore.getGameGolferSummaries();

    }

    async function setGolfCourseInfo() {
        golfCourse = await golfCourseStore.getGolfCourse({ id: golfCourse.id});
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

    <div class="flex flex-row">
        <div class="w-1/2">
            <p>PLAYER</p>
        </div>
        <div class="w-1/2">
            <p>AVAILABLE MULLIGANS</p>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="w-1/2">
            <UserProfileHorizontal golfer={golferSummaries[0]} />
        </div>
        <div class="w-1/4">
            <p>{ player1MulligansAvailable }</p>
        </div>
        <div class="w-1/4">
            <button class="brand-button">USE</button>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="w-1/2">
            <UserProfileHorizontal golfer={golferSummaries[1]} />
        </div>
        <div class="w-1/4">
            <p>{ player2MulligansAvailable }</p>
        </div>
        <div class="w-1/4">
            <button class="brand-button">USE</button>
        </div>
    </div>
    
    

    <div class="flex flex-row">
        <div class="w-1/2">
            <p>WINNER</p>
        </div>
        <div>
            <p>SELECT THE WINNER OF THE HOLE</p>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="w-1/2">
            <UserSelectCell golfer={golferSummaries[0]} />
        </div><div class="w-1/2">
            <UserSelectCell golfer={golferSummaries[1]} />
        </div>
    </div>

    <div class="flex flex-row">
        <button class="w-1/2">PREVIOUS HOLE</button>
        <button class="w-1/2">NEXT HOLE</button>
    </div>
{/if}