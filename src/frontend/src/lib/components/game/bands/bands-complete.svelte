<script lang="ts">
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, BandsScores, BandsCategoryResult, BandsCategory } from "../../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import UserProfileHorizontal from "$lib/components/shared/user-profile-horizontal.svelte";
    import CompleteIcon from "$lib/icons/complete-icon.svelte";
    import FailedIcon from "$lib/icons/failed-icon.svelte";

    export let game: Game;
    export let players: GolferSummary[];

    let isLoading = true;
    let scores: BandsScores | null = null;
    let winner: GolferSummary | null = null;

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
        if (game.status && Object.keys(game.status)[0] === "Complete") {
            if (game.scoreDetail && game.scoreDetail.length > 0) {
                const scoreDetail = game.scoreDetail[0];
                if(!scoreDetail) {return}
                if ("BandsScores" in scoreDetail) {
                    scores = scoreDetail.BandsScores as BandsScores;
                    const winnerData = scores.players.reduce((max, player) => 
                        (max.points > player.points) ? max : player
                    );
                    winner = players.find(p => p.principalId === winnerData.principalId) || null;
                }
            }
        }
    }

    function getPlayerCategoryResults(principalId: string): BandsCategoryResult[] {
        const playerScore = scores?.players.find(p => p.principalId === principalId);
        return playerScore?.categories || [];
    }

    function isCategoryCompleted(principalId: string, category: BandsCategory): boolean {
        return getPlayerCategoryResults(principalId).some(
            cr => Object.keys(cr.bandsCategory)[0] === Object.keys(category)[0] && cr.completed
        );
    }

    function isCategoryFailed(principalId: string, category: BandsCategory): boolean {
        return getPlayerCategoryResults(principalId).some(
            cr => Object.keys(cr.bandsCategory)[0] === Object.keys(category)[0] && cr.failed
        );
    }

    const targetCategories = [
        { category: { NoLostBall: null }, desc: "Won't lose a ball for 3 holes", points: 50 },
        { category: { Hit2Of3Fairways: null }, desc: "Hit 2/3 fairways", points: 25 },
        { category: { Hit2Of3Greens: null }, desc: "Hit green in 1", points: 25 },
        { category: { OnePutt2Of3Greens: null }, desc: "Only had one putt?", points: 25 },
        { category: { NoDoubleBogeyOrWorse: null }, desc: "Double bogey or better?", points: 25 },
        { category: { NoBogeyOrWorse: null }, desc: "Bogey or better?", points: 25 },
        { category: { ParOrBetter: null }, desc: "Par or better?", points: 25 },
        { category: { UnderPar: null }, desc: "Birdie or better?", points: 25 },
        { category: { NoTreeOrBunker: null }, desc: "Avoided all the trees and bunkers?", points: 25 },
    ];

    function startNewGame() {
        //TODO
    }
</script>

{#if isLoading}
    <LocalSpinner />
{:else if game.status && Object.keys(game.status)[0] === "Complete"}
    <div class="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
        <div class="bg-yellow-400 text-black p-2 flex justify-between items-center rounded-t-lg">
            <h1 class="text-xl font-bold">PLAYER DETAILS</h1>
        </div>
        <div class="p-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                    {#each players as player}
                        <UserProfileHorizontal golfer={player} />
                    {/each}
                </div>
                {#if winner}
                    <div class="text-right">
                        <p class="text-sm text-gray-500">GAME PLACE</p>
                        <p class="text-lg font-semibold">WINNER</p>
                        <p class="text-lg">{scores?.players.find(p => p.principalId === winner!.principalId)?.points || 0}</p>
                    </div>
                {/if}
            </div>
            <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 class="text-lg font-semibold mb-2">SCORECARD</h2>
                {#each players as player}
                    <div class="mb-4">
                        <h3 class="text-md font-medium mb-2">{player.name} ({player.handicap?.[0] || 'N/A'})</h3>
                        {#each targetCategories as target}
                            <div class="flex justify-between items-center py-2">
                                <p class="text-sm">{target.desc}</p>
                                <div class="flex items-center space-x-2">
                                    {#if isCategoryCompleted(player.principalId, target.category)}
                                        <CompleteIcon className="w-5 text-green-500" />
                                        <span class="text-sm font-medium text-green-500">{target.points}</span>
                                    {:else if isCategoryFailed(player.principalId, target.category)}
                                        <FailedIcon className="w-5 text-red-500" />
                                        <span class="text-sm font-medium text-red-500">-</span>
                                    {:else}
                                        <span class="w-5"></span>
                                        <span class="text-sm font-medium">-</span>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                        <div class="flex justify-end mt-2">
                            <p class="text-lg font-semibold">Total: {scores?.players.find(p => p.principalId === player.principalId)?.points || 0}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <button
            class="w-full bg-yellow-500 text-white py-2 rounded-b-lg font-semibold"
            on:click={startNewGame}
        >
            NEW GAME
        </button>
    </div>
{:else}
    <p class="text-center text-gray-500">Game is not complete yet.</p>
{/if}