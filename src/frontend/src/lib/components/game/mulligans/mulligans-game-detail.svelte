<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, MulligansScores, GameScoreDetail, AddGameScore, MulligansHoleResult } from "../../../../../../declarations/backend/backend.did";
    import { currentHole, availableMulligans, mulligansHoleStates } from "$lib/derived/mulligans.derived";
    import { currentHoleStore } from "$lib/stores/current-hole-store";
    import { gameStateStore, saveGame } from "$lib/stores/game-state-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { get } from "svelte/store";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import UserSelectCell from "$lib/components/shared/user-select-cell.svelte";
    import HorizontalUsersProfile from "$lib/components/shared/horizontal-users-profile.svelte";
    import MulligansHoleDetail from "./mulligans-hole-detail.svelte";
    import ConfirmModal from "$lib/components/shared/confirm-modal.svelte";

    export let golfCourse: GolfCourseTeeGroup;
    export let players: GolferSummary[];

    let isLoading = true;
    let scores: MulligansScores | null = null;
    let currentPar: number = 0;
    let currentSI: number = 0;
    let currentYardage: bigint = 0n;

    let player1MulligansUsed = 0;
    let player2MulligansUsed = 0;
    
    let selectedWinner: GolferSummary | null = null;
    let showConfirmModal = false;
    let pendingWinner: GolferSummary | null = null;

    onMount(async () => {
        try {
            resetHole();
        } catch (error) {
            console.error("Error processing game data:", error);
        } finally {
            isLoading = false;
        }
    });

    $:  {
        const ch = $currentHole || 1;
        const holeDetail = golfCourse.holes.find(h => h.number === ch);
        if (holeDetail) {
            currentPar = holeDetail.par;
            currentSI = holeDetail.strokeIndex;
            currentYardage = holeDetail.yardage;
        }
    }

    $: {
        const ch = $currentHole || 1;
        const game = get(gameStateStore);
        const scoreDetail = game?.scoreDetail;
        const firstScore = scoreDetail?.[0];
        
        if (firstScore && "MulligansScores" in firstScore) {
            const ms = firstScore.MulligansScores as MulligansScores;
            const result = ms.results.find(r => r.holeNumber === ch);
            if (result) {
                //TODO: CHANGE WHEN BACKEND IS UPDATED
                player1MulligansUsed = result.golfer1MulliganUsed ? 1 : 0;
                player2MulligansUsed = result.golfer2MulliganUsed ? 1 : 0;
                selectedWinner = players.find(p => p.principalId === result.winner) || null;
            } else {
                resetState();
            }
        } else {
            resetState();
        }
    }

    $: currentHoleState = $mulligansHoleStates.find(state => state.holeNumber === $currentHole);

    function resetState() {
        player1MulligansUsed = 0;
        player2MulligansUsed = 0;
        selectedWinner = null;
    }

    $: player1MulligansAvailable = $availableMulligans[players[0].principalId] - player1MulligansUsed;
    $: player2MulligansAvailable = $availableMulligans[players[1].principalId] - player2MulligansUsed;

    function canUseMulligan(playerIndex: number): boolean {
        return playerIndex === 0 ? player1MulligansAvailable > 0 : player2MulligansAvailable > 0;
    }

    function handleUseMulligan(playerIndex: number, increment: boolean) {
        if (increment) {
            if (playerIndex === 0) {
                player1MulligansUsed++;
            } else {
                player2MulligansUsed++;
            }
            toasts.addToast({ type: 'success', message: 'Mulligan used successfully.', duration: 3000 });
        } else {
            if (playerIndex === 0 && player1MulligansUsed > 0) {
                player1MulligansUsed--;
            } else if (playerIndex === 1 && player2MulligansUsed > 0) {
                player2MulligansUsed--;
            }
            toasts.addToast({ type: 'success', message: 'Mulligan removed successfully.', duration: 3000 });
        }
    }

    function resetHole(){
        player1MulligansUsed = 0;
        player2MulligansUsed = 0;
        if (selectedWinner?.principalId) {
            selectedWinner = null;
        }
    }

    function previousHole() {
        currentHoleStore.update(n => n > 1 ? n - 1 : n);
        resetHole();
    }

    function nextHole() {
        currentHoleStore.update(n => n < golfCourse.totalHoles ? n + 1 : n);
        resetHole();
    }
    
    function handleWinnerClick(player: GolferSummary) {

        if (currentHoleState && currentHoleState.isLocked) {
            toasts.addToast({
            type: 'error',
            message: "Can't select winner until all previous holes have a winner.",
            duration: 3000
            });
            return;
        }
        if (selectedWinner?.principalId === player.principalId) {
            selectedWinner = null;
            return;
        }
        
        pendingWinner = player;
        showConfirmModal = true;
    }

    async function confirmWinner() {
        if (!pendingWinner) return;
        
        showConfirmModal = false;
        await handleWinnerSelection(pendingWinner);
        pendingWinner = null;
    }

    function cancelWinnerSelection() {
        showConfirmModal = false;
        pendingWinner = null;
    }

    async function handleWinnerSelection(player: GolferSummary) {
        if (selectedWinner?.principalId === player.principalId) {
            selectedWinner = null;
            return;
        }
        
        selectedWinner = player;
        try{
            await updateCurrentHoleWinner(player);
            toasts.addToast({ type: 'success', message: 'Score submitted successfully.', duration: 3000 });
            if($currentHole < golfCourse.totalHoles){
                nextHole();
            }else{
                //TODO: End game
                console.log("End game");
            }
        } catch (error) {
            console.error("Error updating current hole winner:", error);
            toasts.addToast({ type: 'error', message: 'Error updating current hole winner.', duration: 3000 });
        }
    }

    async function updateCurrentHoleWinner(player: GolferSummary) {
        currentHoleStore.subscribe(async (ch) => {
            await updateCurrentHoleWinnerInStore(ch, player);
        })();
    }

    async function updateCurrentHoleWinnerInStore(holeNumber: number, player: GolferSummary) {        
        gameStateStore.update(game => {
            if (!game) return game;

            if (!game.scoreDetail || game.scoreDetail.length === 0) {
                game.scoreDetail = [];
            }
            let currentMulligans: MulligansScores | null = null;
            const existingResult = game.scoreDetail[0]; 
            if (existingResult && "MulligansScores" in existingResult) {
                currentMulligans = existingResult.MulligansScores as MulligansScores;
            } else{
                currentMulligans = {
                    winner: "",
                    results: [],
                    score: 0n,
                    currentHole: holeNumber,
                    golfer2MulligansUsed: 0,
                    golfer2HolesWonCount: 0,
                    golfer1MulligansAvailable: 0,
                    golfer2MulligansAvailable: 0,
                    golfer1MulligansUsed: 0,
                    golfer1HolesWonCount: 0,
                }
                game.scoreDetail[0] = { MulligansScores: currentMulligans };
            }
            const newScore = BigInt(currentMulligans.golfer1HolesWonCount - currentMulligans.golfer2HolesWonCount);
            const newHoleResult: MulligansHoleResult = {
                holeNumber: holeNumber,
                golfer1MulliganUsed: player1MulligansUsed > 0,
                golfer2MulliganUsed: player2MulligansUsed > 0,
                score: newScore,
                winner: player.principalId,
            };

            const index = currentMulligans.results.findIndex(r => r.holeNumber === holeNumber);
            if (index === -1) {
                currentMulligans.results.push(newHoleResult);
            } else {
                currentMulligans.results[index] = newHoleResult;
            }

            currentMulligans.golfer1MulligansUsed += player1MulligansUsed;
            currentMulligans.golfer2MulligansUsed += player2MulligansUsed;
            if (player.principalId === players[0].principalId) {
                currentMulligans.golfer1HolesWonCount++;
            } else {
                currentMulligans.golfer2HolesWonCount++;
            }
            
            currentMulligans.score = newScore;
            currentMulligans.currentHole = holeNumber + 1;
            if (newScore > 0n) {
                currentMulligans.winner = players[0].principalId;
            } else if (newScore < 0n) {
                currentMulligans.winner = players[1].principalId;
            } else {
                currentMulligans.winner = "";
            }
                
            return game;
        });
        const currentGame: Game | null = $gameStateStore;
        const auth = get(authStore);
        
        if (!currentGame) return;

        const dto: AddGameScore = {
            gameId: currentGame.id,
            holeNumber: holeNumber,
            submittedById: auth.identity?.getPrincipal().toString() || "",
            detail: { 
                MulligansScores: {
                    golfer1MulliganUsed: player1MulligansUsed > 0,
                    golfer2MulliganUsed: player2MulligansUsed > 0,
                    hole: holeNumber,
                    winner: player.principalId
                }
            },
        };
        
        //await saveGame(dto);
    }
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <div class="flex flex-col w-full p-2 lg:p-4">
        <h2 class="text-2xl text-black condensed">SCORECARD</h2>
    </div>

    <div class="flex flex-col p-4 mt-4 bg-white border-b rounded-lg border-BrandLightGray">
        <MulligansHoleDetail holeNumber={$currentHole} par={currentPar} yards={currentYardage} strokeIndex={currentSI} />

        <div class="flex flex-row justify-between px-2 py-3 text-xl text-black border-b condensed border-BrandLightGray">
            <div>
                <p>PLAYER</p>
            </div>
            <div>
                <p>AVAILABLE MULLIGANS</p>
            </div>
        </div>
        <div class="flex flex-col py-4 space-y-4 border-b border-BrandLightGray">
            <div class="flex flex-row items-center justify-between">
                <div class="w-1/2">
                    <HorizontalUsersProfile player={players[0]} />
                </div>
                <div class="flex items-center justify-center w-1/6">
                    <p class="text-lg text-black condensed">{ player1MulligansAvailable }</p>
                </div>
                <div class="flex items-center justify-end w-2/6 space-x-2">
                    {#if player1MulligansUsed > 0}
                        <button 
                            class="px-3 py-2 text-xs rounded bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80"
                            on:click={() => handleUseMulligan(0, false)}
                        >
                            -
                        </button>
                        <div class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">
                            {player1MulligansUsed}
                        </div>
                    {/if}
                    <button 
                        class="text-xs py-2 rounded transition-colors duration-200 {player1MulligansUsed > 0 ? 'px-3 bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80' : 'px-6 bg-BrandForest text-BrandYellow hover:bg-BrandYellow hover:text-BrandForest'} {!canUseMulligan(0) && 'bg-BrandLightGray text-BrandDarkGray cursor-not-allowed'}"
                        on:click={() => handleUseMulligan(0, true)}
                        disabled={!canUseMulligan(0) || (currentHoleState && currentHoleState.isLocked)}
                    >
                        {player1MulligansUsed > 0 ? '+' : 'USE'}
                    </button>
                </div>
            </div>

            <div class="flex flex-row items-center justify-between">
                <div class="w-1/2">
                    <HorizontalUsersProfile player={players[1]} />
                </div>
                <div class="flex items-center justify-center w-1/6">
                    <p class="text-lg text-black condensed">{ player2MulligansAvailable }</p>
                </div>
                <div class="flex items-center justify-end w-2/6 space-x-2">
                    {#if player2MulligansUsed > 0}
                        <button 
                            class="px-3 py-2 text-xs rounded bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80"
                            on:click={() => handleUseMulligan(1, false)}
                        >
                            -
                        </button>
                        <div class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">
                            {player2MulligansUsed}
                        </div>
                    {/if}
                    <button 
                        class="text-xs py-2 rounded transition-colors duration-200 {player2MulligansUsed > 0 ? 'px-3 bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80' : 'px-6 bg-BrandForest text-BrandYellow hover:bg-BrandYellow hover:text-BrandForest'} {!canUseMulligan(1) && 'bg-BrandLightGray text-BrandDarkGray cursor-not-allowed'}"
                        on:click={() => handleUseMulligan(1, true)}
                        disabled={!canUseMulligan(1) || (currentHoleState && currentHoleState.isLocked)}
                    >
                        {player2MulligansUsed > 0 ? '+' : 'USE'}
                    </button>
                </div>
            </div>
        </div>
        
        <div class="flex flex-row items-center justify-between px-2 py-3 border-b border-BrandLightGray">
            <div>
                <p class="text-xl text-black condensed">WINNER</p>
            </div>
            <div>
                <p class="text-xs text-BrandDarkGray">SELECT THE WINNER OF THE HOLE</p>
            </div>
        </div>

        <div class="flex flex-row mt-4 space-x-4">
            <div class="w-1/2">
                <UserSelectCell 
                    player={players[0]} 
                    isSelected={selectedWinner?.principalId === players[0].principalId}
                    onClick={() => handleWinnerClick(players[0])}
                />
            </div>
            <div class="w-1/2">
                <UserSelectCell 
                    player={players[1]} 
                    isSelected={selectedWinner?.principalId === players[1].principalId}
                    onClick={() => handleWinnerClick(players[1])}
                />
            </div>
        </div>

    </div>

    <div class="flex flex-row p-3 mt-4 space-x-3 bg-white rounded-lg">
        <button 
            class="w-1/2 px-8 py-2 text-base rounded transition-colors duration-200 {$currentHole > 1 ? 'bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80' : 'bg-BrandLightGray text-BrandDarkGray cursor-not-allowed'}"
            on:click={previousHole}
            disabled={$currentHole <= 1}
        >
            PREVIOUS HOLE
        </button>
        <button 
            class="w-1/2 px-8 py-2 text-base rounded transition-colors duration-200 {$currentHole < golfCourse.totalHoles ? 'bg-BrandYellow text-BrandForest hover:bg-BrandYellow/80' : 'bg-BrandLightGray text-BrandDarkGray cursor-not-allowed'}"
            on:click={nextHole}
            disabled={$currentHole >= golfCourse.totalHoles}
        >
            NEXT HOLE
        </button>
    </div>

    <ConfirmModal 
        isOpen={showConfirmModal}
        message={`Confirm ${pendingWinner?.name} as the winner for hole ${$currentHole}?`}
        onConfirm={confirmWinner}
        onCancel={cancelWinnerSelection}
    />
{/if}