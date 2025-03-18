<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, BandsScores, AddGameScore, BandsScore, BandsHoleResult, BandsCategory, PrincipalId, BandsPrediction } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { getImageURL } from "$lib/utils/helpers";
    import UserProfileHorizontal from "$lib/components/shared/user-profile-horizontal.svelte";
    import CompleteIconInactive from "$lib/icons/complete-icon-inactive.svelte";
    import CompleteIcon from "$lib/icons/complete-icon.svelte";
    import FailedIcon from "$lib/icons/failed-icon.svelte";
    import FailedIconInactive from "$lib/icons/failed-icon-inactive.svelte";
    import { gameStore } from "$lib/stores/game-store";
    import { authStore } from "$lib/stores/auth-store";
    
    export let game: Game;
    export let golfCourse: GolfCourseTeeGroup;
    export let players: GolferSummary[];

    let isLoading = true;
    let scores: BandsScores | null = null;
    let currentHole: number = 1;
    let currentPar: number = 0;
    let currentSI: number = 0;
    let currentYardage: bigint = 0n;

    let playerResults: BandsHoleResult[] = [];

    let playerHoleTargets: { golferId: string; category: BandsCategory; description: string }[] = [];

    onMount(async () => {
        try {
            setGameInfo();
        } catch (error) {
            console.error("Error processing game data:", error);
        } finally {
            isLoading = false;
        }
    });

    function setGameInfo() {
        const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
        if (gameType === "Bands") {
            
            if (game.scoreDetail && game.scoreDetail.length > 0) {
                const scoreDetail = game.scoreDetail[0];
                if (scoreDetail && "BandsScores" in scoreDetail) {
                    scores = scoreDetail.BandsScores as BandsScores;
                    currentHole = scores.currentHole;
                }
            }

            const currentHoleDetail = golfCourse.holes.find((x) => x.number === currentHole);
            if (currentHoleDetail) {
                currentPar = currentHoleDetail.par;
                currentSI = currentHoleDetail.strokeIndex;
                currentYardage = currentHoleDetail.yardage;
            }

            playerHoleTargets = [];
            const prediction = game.predictions[0];
            let bandsPredictions: BandsPrediction[] = [];
            
            if (prediction && "Bands" in prediction) {
                bandsPredictions = prediction.Bands;
            } else {
                console.warn("No Bands predictions found for this game.");
                return; 
            }

            bandsPredictions.forEach((prediction: BandsPrediction) => {
                const targetCategories = [
                    { start: prediction.wontHitTreeOrBunkerStartHole, category: { NoTreeOrBunker: null }, desc: "Avoided all the trees and bunkers?" },
                    { start: prediction.wontLoseBallStartHole, category: { NoLostBall: null }, desc: "Kept the same ball?" },
                    { start: prediction.hit2Of3FairwaysStartHole, category: { Hit2Of3Fairways: null }, desc: "Hit the fairway?" },
                    { start: prediction.hit2Of3GreensStartHole, category: { Hit2Of3Greens: null }, desc: "Hit the greed in regulation?" },
                    { start: prediction.singlePutt2Of3GreensStartHole, category: { OnePutt2Of3Greens: null }, desc: "Only had one putt?" },
                    { start: prediction.wontDoubleBogeyStartHole, category: { NoDoubleBogeyOrWorse: null }, desc: "Double bogey or better?" },
                    { start: prediction.wontBogeyStartHole, category: { NoBogeyOrWorse: null }, desc: "Bogey or better?" },
                    { start: prediction.parOrUnderStartHole, category: { ParOrBetter: null }, desc: "Par or better?" },
                    { start: prediction.underParStartHole, category: { UnderPar: null }, desc: "Birder or better?" },
                ];

                targetCategories.forEach(({ start, category, desc }) => {
                    if (start <= currentHole) {
                        playerHoleTargets.push({
                            golferId: prediction.golferId,
                            category: category as BandsCategory,
                            description: desc
                        });
                    }
                });
            });

            playerResults = playerResults.filter(result => {
                const holeResults = scores?.players.find(p => p.principalId === result.golferId)?.categories || [];
                return !holeResults.some(hr => hr.startHole === currentHole && 
                    Object.keys(hr.bandsCategory)[0] === Object.keys(result.category)[0]);
            });

        }
    }

    function completeCategory(golferId: string, category: BandsCategory) {
        playerResults = playerResults.filter(r => 
            !(r.golferId === golferId && Object.keys(r.category)[0] === Object.keys(category)[0])
        );
        playerResults.push({ golferId, completed: true, category, failed: false });
    }

    function failCategory(golferId: string, category: BandsCategory) {
        playerResults = playerResults.filter(r => 
            !(r.golferId === golferId && Object.keys(r.category)[0] === Object.keys(category)[0])
        );
        playerResults.push({ golferId, completed: false, category, failed: true });
    }

    function cancelCompleteCategory(golferId: string, category: BandsCategory) {
        playerResults = playerResults.filter(r => 
            !(r.golferId === golferId && Object.keys(r.category)[0] === Object.keys(category)[0])
        );
    }

    function cancelFailCategory(golferId: string, category: BandsCategory) {
        playerResults = playerResults.filter(r => 
            !(r.golferId === golferId && Object.keys(r.category)[0] === Object.keys(category)[0])
        );
    }

    function completedSelected(target: { golferId: string; category: BandsCategory }) {
        return playerResults.some(r => 
            r.golferId === target.golferId && 
            Object.keys(r.category)[0] === Object.keys(target.category)[0] && 
            r.completed
        );
    }

    function failedSelected(target: { golferId: string; category: BandsCategory }) {
        return playerResults.some(r => 
            r.golferId === target.golferId && 
            Object.keys(r.category)[0] === Object.keys(target.category)[0] && 
            r.failed
        );
    }

    async function goToPreviousHole() {
        await saveScore();
        if (currentHole > 1) {
            currentHole -= 1;
            setGameInfo();
        }
    }

    async function goToNextHole() {
        await saveScore();
        if (currentHole < 18) {
            
            currentHole += 1;
            setGameInfo();
        } else {
            
        }
    }

    async function saveScore(){

        const bandsScore: BandsScore = {
            hole: currentHole,
            playerResults
        };
        
        let dto: AddGameScore = {

            submittedById: $authStore.identity?.getPrincipal().toString() ?? "",
            gameId: game.id,
            detail: {
                BandsScores: bandsScore,
            },
            holeNumber: currentHole
        };

        await gameStore.addGameScore(dto);
    }

</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full">
        <div class="bg-yellow-400 text-black p-2 flex justify-between items-center">
            <h1 class="text-xl font-bold">BANDS</h1>
            <span class="text-green-600 font-semibold">LIVE</span>
        </div>
        <div class="p-4">
            <div class="flex items-center mb-4">
                <img src={getImageURL(golfCourse.mainImage)} alt="Course" class="w-16 h-16 mr-2" />
                <div>
                    <p class="text-lg font-semibold">{golfCourse.name}</p>
                    <p class="text-sm text-gray-600">10/08/24</p>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-4">
                {#each players as player}
                    {@const playerScore = scores?.players.find((p) => p.principalId === player.principalId)}
                    <div class="flex items-center">
                        <img src={getImageURL(player.profilePicture)} alt={player.name} class="w-10 h-10 rounded-full mr-2" />
                        <p class="text-lg">{playerScore?.points || 0}</p>
                    </div>
                {/each}
            </div>
            <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <div class="flex justify-between text-sm">
                    <p>HOLE</p>
                    <p>PAR</p>
                    <p>YARDS</p>
                    <p>S.I.</p>
                </div>
                <div class="flex justify-between font-bold">
                    <p>{currentHole.toString().padStart(2, "0")}</p>
                    <p>{currentPar}</p>
                    <p>{currentYardage.toString()}</p>
                    <p>{currentSI}</p>
                </div>
            </div>
            
            <div class="mb-4">
                <h2 class="text-lg font-semibold mb-2">PLAYER TARGETS</h2>
                
                {#each players as player}
                    {@const targets = playerHoleTargets.filter(t => t.golferId === player.principalId)}
                    {#if targets.length > 0}
                        <div class="mb-4">
                            <UserProfileHorizontal golfer={player} />
                            {#each targets as target}
                                <div class="flex flex-row py-2 items-center">
                                    <div class="w-2/3">
                                        <p>{target.description}</p>
                                    </div>
                                    <div class="w-1/3 flex justify-end space-x-2">
                                        {#if completedSelected(target)}
                                            <button on:click={() => cancelCompleteCategory(target.golferId, target.category)}>
                                                <CompleteIcon className="w-6" />
                                            </button>
                                        {:else}
                                            <button on:click={() => completeCategory(target.golferId, target.category)}>
                                                <CompleteIconInactive className="w-6" />
                                            </button>
                                        {/if}
                                        {#if failedSelected(target)}
                                            <button on:click={() => cancelFailCategory(target.golferId, target.category)}>
                                                <FailedIcon className="w-6" />
                                            </button>
                                        {:else}
                                            <button on:click={() => failCategory(target.golferId, target.category)}>
                                                <FailedIconInactive className="w-6" />
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                {/each}
            </div>

            <div class="flex space-x-4">
                <button class="w-1/2 bg-yellow-500 text-white py-2 rounded" on:click={goToPreviousHole}>PREVIOUS HOLE</button>
                <button
                    class="w-1/2 bg-green-700 text-white py-2 rounded"
                    on:click={goToNextHole}
                >
                    {currentHole < 18 ? "NEXT HOLE" : "FINISH"}
                </button>
            </div>
        </div>
    </div>
{/if}