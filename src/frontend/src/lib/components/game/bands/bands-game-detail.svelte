<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, BandsScores, BandsCategory, BandsCategoryResult, BandsPrediction, AddGameScore } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import CompleteIcon from "$lib/icons/complete-icon.svelte";
    import FailedIcon from "$lib/icons/failed-icon.svelte";
    import CompleteIconInactive from "$lib/icons/complete-icon-inactive.svelte";
    import FailedIconInactive from "$lib/icons/failed-icon-inactive.svelte";
    import { gameStore } from "$lib/stores/game-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { getImageURL } from "$lib/utils/helpers";
    import { bandsCategoryDetails } from "$lib/types/bands-categories";

    export let game: Game;
    export let golfCourse: GolfCourseTeeGroup;
    export let players: GolferSummary[];

    let isLoading = true;
    let scores: BandsScores | null = null;
    let currentHole: number = 1;
    let currentPar: number = 0;
    let currentSI: number = 0;
    let currentYardage: bigint = 0n;

    // State to track temporary category inputs (yes/no) for the current hole
    let categoryInputs: Record<string, Record<BandsCategory, boolean | undefined>> = {};

    type BandsCategoryKey = keyof typeof bandsCategoryDetails;

    // Helper to get category display details
    function getCategoryDetails(category: BandsCategory): { description: string; points: number } {
        const categoryKey = Object.keys(category)[0] as BandsCategoryKey;
        return bandsCategoryDetails[categoryKey];
    }

    // Check if a category is active for the current hole based on prediction start hole
    function isCategoryActive(prediction: BandsPrediction, category: BandsCategory, currentHole: number): boolean {
        const startHoleMap: Record<BandsCategory, number> = {
            "#NoTreeOrBunker": prediction.wontHitTreeOrBunkerStartHole,
            "#NoLostBall": prediction.wontLoseBallStartHole,
            "#Hit2Of3Fairways": prediction.hit2Of3FairwaysStartHole,
            "#Hit2Of3Greens": prediction.hit2Of3GreensStartHole,
            "#OnePutt2Of3Greens": prediction.singlePutt2Of3GreensStartHole,
            "#NoDoubleBogeyOrWorse": prediction.wontDoubleBogeyStartHole,
            "#NoBogeyOrWorse": prediction.wontBogeyStartHole,
            "#ParOrBetter": prediction.parOrUnderStartHole,
            "#UnderPar": prediction.underParStartHole,
        };

        const startHole = startHoleMap[Object.keys(category)[0] as BandsCategory];
        return currentHole >= startHole && currentHole <= startHole + 2;
    }

    // Initialize game data on mount
    onMount(async () => {
        try {
            setGameInfo();
            // Initialize categoryInputs for all players
            players.forEach((player) => {
                categoryInputs[player.principalId] = {};
            });
        } catch (error) {
            console.error("Error processing game data:", error);
        } finally {
            isLoading = false;
        }
    });

    // Set game info based on current hole
    function setGameInfo() {
        const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
        if (gameType === "Bands" && game.scoreDetail && game.scoreDetail.length > 0) {
            const scoreDetail = game.scoreDetail[0];
            if ("BandsScores" in scoreDetail) {
                scores = scoreDetail.BandsScores as BandsScores;
                currentHole = scores.currentHole;
                const currentHoleDetail = golfCourse.holes.find((x) => x.number === currentHole);
                if (currentHoleDetail) {
                    currentPar = currentHoleDetail.par;
                    currentSI = currentHoleDetail.strokeIndex;
                    currentYardage = currentHoleDetail.yardage;
                }
            }
        }
    }

    // Navigate to the previous hole
    function goToPreviousHole() {
        if (currentHole > 1) {
            currentHole -= 1;
            setGameInfo();
            // Reset inputs for the new hole
            players.forEach((player) => {
                categoryInputs[player.principalId] = {};
            });
        }
    }

    // Navigate to the next hole or finish
    async function goToNextHole() {
        if (currentHole < 18) {
            await saveCategoryUpdates();
            currentHole += 1;
            setGameInfo();
            // Reset inputs for the new hole
            players.forEach((player) => {
                categoryInputs[player.principalId] = {};
            });
        } else {
            await saveCategoryUpdates();
            console.log("Game finished!"); // Add finish logic here
        }
    }

    // Update category status in temporary state
    function updateCategoryStatus(playerId: string, category: BandsCategory, completed: boolean) {
        categoryInputs[playerId] = {
            ...categoryInputs[playerId],
            [category]: completed,
        };
    }

    // Save category updates to the store
    async function saveCategoryUpdates() {
        if (!scores) return;

        const updatedPlayers = scores.players.map((playerResult) => {
            const prediction = game.predictions.find((p) => p.golferId === playerResult.principalId);
            if (!prediction) return playerResult;

            const updatedCategories = [...playerResult.categories];
            const activeCategories = Object.keys(prediction)
                .filter((key) => key.endsWith("StartHole"))
                .map((key) => {
                    const categoryKey = key.replace("StartHole", "") as BandsCategoryKey;
                    return { category: { [categoryKey]: null } as BandsCategory, startHole: prediction[key as keyof BandsPrediction] as number };
                })
                .filter(({ category, startHole }) => isCategoryActive(prediction, category, currentHole))
                .map(({ category }) => category);

            activeCategories.forEach((category) => {
                const input = categoryInputs[playerResult.principalId]?.[category];
                if (input !== undefined) {
                    const existingCategoryIndex = updatedCategories.findIndex(
                        (c) => Object.keys(c.bandsCategory)[0] === Object.keys(category)[0]
                    );
                    if (existingCategoryIndex !== -1) {
                        updatedCategories[existingCategoryIndex] = {
                            bandsCategory: category,
                            completed: input,
                        };
                    } else {
                        updatedCategories.push({
                            bandsCategory: category,
                            completed: input,
                        });
                    }
                }
            });

            return {
                ...playerResult,
                categories: updatedCategories,
            };
        });

        const updatedScores: BandsScores = {
            ...scores,
            players: updatedPlayers,
            currentHole: currentHole + 1,
        };

        const scoreDTO: BandsScore = {
            predictions: updatedPlayers.flatMap((player) =>
                player.categories.map((cat) => ({
                    bandsCategory: cat.bandsCategory,
                    completed: cat.completed,
                    failed: !cat.completed,
                    startHole: game.predictions.find((p) => p.golferId === player.principalId)?.[Object.keys(cat.bandsCategory)[0] + "StartHole"] || 1,
                }))
            ),
        };

        const dto: AddGameScore = {
            detail: {
                BandsScores: scoreDTO,
            },
            gameId: game.id,
            holeNumber: currentHole,
            submittedById: players[0].principalId, // Adjust based on current user
        };

        try {
            await gameStore.addGameScore(dto);
            scores = updatedScores; // Update local state
        } catch (error) {
            toasts.addToast({ type: "error", message: "Error saving game." });
        }
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
                <img src={getImageURL(golfCourse.imageUrl)} alt="Course" class="w-16 h-16 mr-2" />
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
                {#each scores?.players ?? [] as playerResult}
                    {@const player = players.find((p) => p.principalId === playerResult.principalId)}
                    {@const prediction = game.predictions.find((p) => p.golferId === playerResult.principalId)}
                    {#if player && prediction}
                        <div class="flex items-center mb-2">
                            <div class="flex items-center w-1/3">
                                <img src={getImageURL(player.profilePicture)} alt={player.name} class="w-8 h-8 rounded-full mr-2" />
                                <p class="font-medium">{player.name.toUpperCase()}</p>
                            </div>
                            <div class="w-2/3">
                                {#each Object.keys(prediction) as key}
                                    {@const categoryKey = key.replace("StartHole", "") as BandsCategoryKey}
                                    {@const category: BandsCategory = { [categoryKey]: null } as BandsCategory}
                                    {@const startHole = prediction[key as keyof BandsPrediction] as number}
                                    {#if isCategoryActive(prediction, category, currentHole)}
                                        <div class="flex items-center mb-2">
                                            <p class="w-2/3">{getCategoryDetails(category).description}</p>
                                            <div class="w-1/3 flex space-x-2">
                                                <button
                                                    class="w-6 h-6"
                                                    on:click={() => updateCategoryStatus(playerResult.principalId, category, true)}
                                                    class:bg-green-500={categoryInputs[playerResult.principalId]?.[category] === true}
                                                    class:bg-gray-300={categoryInputs[playerResult.principalId]?.[category] !== true}
                                                >
                                                    <CompleteIcon class="w-6" />
                                                </button>
                                                <button
                                                    class="w-6 h-6"
                                                    on:click={() => updateCategoryStatus(playerResult.principalId, category, false)}
                                                    class:bg-red-500={categoryInputs[playerResult.principalId]?.[category] === false}
                                                    class:bg-gray-300={categoryInputs[playerResult.principalId]?.[category] !== false}
                                                >
                                                    <FailedIcon class="w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
                            </div>
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