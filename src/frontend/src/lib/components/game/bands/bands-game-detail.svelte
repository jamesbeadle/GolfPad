<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, BandsScores, BandsCategory, BandsScore, AddGameScore } from "../../../../../../declarations/backend/backend.did";
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

    type BandsCategoryKey = keyof typeof bandsCategoryDetails;

    function getCategoryDetails(category: BandsCategory): { description: string; points: number } {
        const categoryKey = Object.keys(category)[0] as BandsCategoryKey;
        return bandsCategoryDetails[categoryKey];
    }

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
        switch (gameType) {
            case "Bands":
                if (game.scoreDetail && game.scoreDetail.length > 0) {
                    const scoreDetail = game.scoreDetail[0];
                    if (!scoreDetail) return;
                    if ("BandsScores" in scoreDetail) {
                        scores = scoreDetail.BandsScores as BandsScores;
                        currentHole = scores.currentHole;
                        let currentHoleDetail = golfCourse.holes.find(x => x.number == currentHole);
                        if (currentHoleDetail) {
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

    // Check if a category is active for the current hole
    function isCategoryActive(startHole: number): boolean {
        const endHole = startHole + 2; // Category spans 3 holes
        return currentHole >= startHole && currentHole <= endHole;
    }

    // Navigate to the previous hole
    function goToPreviousHole() {
        if (currentHole > 1) {
            currentHole -= 1;
            setGameInfo();
        }
    }

    // Navigate to the next hole or finish
    function goToNextHole() {
        if (currentHole < 18) {
            currentHole += 1;
            setGameInfo();
        } else {
            // Handle game finish logic
            console.log("Game finished!");
        }
    }

    async function updateCategoryStatus(principalId: string, category: BandsCategory, startHole: number, completed: boolean, failed: boolean) {
        try {
            // Extract the category key (e.g., "NoLostBall")
            const categoryKey = Object.keys(category)[0] as BandsCategoryKey;

            // Construct the BandsCategory variant
            const bandsCategory: BandsCategory = { [categoryKey]: null } as BandsCategory;

            // Construct the BandsScore DTO
            /*
            const scoreDTO: BandsScore = {
                predictions: [
                    {
                        bandsCategory,
                        completed,
                        failed,
                        startHole: startHole as number,
                    },
                ],
            };

            // Construct the AddGameScore DTO
            const dto: AddGameScore = {
                detail: {
                    BandsScores: scoreDTO,
                },
                gameId: game.id,
                holeNumber: currentHole as number,
                submittedById: principalId,
            };

            await gameStore.addGameScore(dto);
            */
            setGameInfo();
        } catch (error) {
            toasts.addToast({ type: 'error', message: 'Error saving game.' });
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
                <p>{currentHole.toString().padStart(2, '0')}</p>
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
        <div class="w-4/5">
            <p>PLAYER</p>
        </div>
        <div class="w-1/5">
            <p>Targets</p>
        </div>
    </div>

    {#each scores?.players ?? [] as playerTarget}
        {@const player = players.find(x => x.principalId == playerTarget.principalId)}
        {#if player}
            <div class="flex flex-row items-center">
                <div class="w-1/3 flex items-center">
                    <img src={getImageURL(player.profilePicture)} alt="profile" class="w-8 h-8 rounded-full" />
                    <p class="ml-2">{player.name}</p>
                </div>
                <div class="w-2/3">
                    {#each playerTarget.categories as category}
                        {#if isCategoryActive(category.startHole)}
                            <div class="flex flex-row items-center">
                                <div class="w-2/3">
                                    <p>{getCategoryDetails(category.bandsCategory).description}</p>
                                </div>
                                <div class="w-1/3 flex flex-row">
                                    <div class="w-1/2">
                                        <button
                                            class="w-6 h-6"
                                            on:click={() => updateCategoryStatus(playerTarget.principalId, category.bandsCategory, category.startHole, true, false)}
                                            disabled={category.failed}
                                        >
                                            {#if category.completed}
                                                <CompleteIcon className="w-6" />
                                            {:else}
                                                <CompleteIconInactive className="w-6" />
                                            {/if}
                                        </button>
                                    </div>
                                    <div class="w-1/2">
                                        <button
                                            class="w-6 h-6"
                                            on:click={() => updateCategoryStatus(playerTarget.principalId, category.bandsCategory, category.startHole, false, true)}
                                            disabled={category.completed}
                                        >
                                            {#if category.failed}
                                                <FailedIcon className="w-6" />
                                            {:else}
                                                <FailedIconInactive className="w-6" />
                                            {/if}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/if}
    {/each}

    <div class="flex flex-row">
        <button class="w-1/2 bg-yellow-500 text-white" on:click={goToPreviousHole}>PREVIOUS HOLE</button>
        <button class="w-1/2 bg-gray-200 text-black" on:click={goToNextHole}>{currentHole < 18 ? "NEXT HOLE" : "FINISH"}</button>
    </div>
{/if}