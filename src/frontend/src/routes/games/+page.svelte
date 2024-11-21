<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import { golferSummariesStore } from "$lib/stores/golfer-summaries-store";
    import ShowSelectGameModal from "$lib/components/games/show-select-game-modal.svelte";
    import GameForm from "$lib/components/games/game-form.svelte";
    import type { PaginationFilters, GolferGameSummariesDTO } from "../../../../declarations/backend/backend.did";
    let showNewGameModal = false;

    let selectedGame: { game: string, config: any } | null = null;
    let gameSummaries: GolferGameSummariesDTO | undefined;

    onMount(async () => {
        try{
            const filters: PaginationFilters = {
                limit: BigInt(10),
                offset: BigInt(0),
            };
            gameSummaries = await golferSummariesStore.getGolferGameSummaries(filters);
            console.log(gameSummaries);
        }
        catch(err){
            console.error("Failed to fetch golfer game summaries:", err);
        }
    });
    function openGameModal() {
        showNewGameModal = true;
    }

    function closeGameModal() {
        showNewGameModal = false;
    }

    function handleGameSelection(event: CustomEvent) {
        selectedGame = event.detail;
    }

</script>

<Layout>
    <div class="w-full">
        <div class="w-full h-full p-2 px-4 text-black">
            <div class="flex items-center justify-between mb-4">
                <h2 class="px-2 my-3 text-3xl font-black text-black md:text-5xl condensed">MY GAMES</h2>
                <button on:click={openGameModal} class="mr-4 btn btn-new-game">New Game</button>
                {#if showNewGameModal}
                    <ShowSelectGameModal visible={showNewGameModal} closeModal={closeGameModal} on:gameSelected={handleGameSelection} />
                {/if}
            </div>

            <div class="flex items-center w-full p-4 text-xl font-bold text-left bg-gray-50 condensed">
                <div class="w-2/6">Game</div>
                <div class="w-2/6">Players</div>
                <div class="w-1/6">Status</div>
                <div class="w-1/6"></div>
            </div>

            <!-- {#if $golferGameSummary && $golferGameSummary.totalEntries === BigInt(0)}
                <p>No game history found. Start your first game!</p>
            {/if} -->

            <!-- Game List -->

            {#if $golferSummariesStore && $golferSummariesStore.entries.length > 0}
                {#each $golferSummariesStore.entries as game}
                    <div class="w-full mt-5 text-left border-t border-gray-200 bg-gray-50">
                        <div class="flex items-center p-4 border-b border-gray-200">
                            <div class="flex items-center rounded w-15 h-15">
                                <!-- Game image -->
                            </div>
                            <div class="ml-4">
                                <h3 class="font-bold">{game.gameType}</h3>
                                <p class="text-sm">{new Date(Number(game.date) * 1000).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="flex ml-auto bg-gray-50">
                            {#each game.players as player}
                                <div class="relative group">
                                    <div class="absolute left-0 z-50 hidden group-hover:block top-12">
                                        <p class="font-bold">{player}</p>
                                        <button class="px-2.5 py-1.5 bg-blue-500 text-white rounded">
                                            View Player
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <div class="w-1/6 text-lg font-bold text-blue-500 bg-gray-50">
                            {game.status}
                        </div>
                        <div class="w-1/6">
                            <button class="px-4 py-2.5 bg-blue-500 text-white font-bold rounded">
                                Predict
                            </button>
                        </div>
                    </div>
                {/each}
            {/if}

            {#if selectedGame}
                <GameForm 
                    gameTitle={selectedGame.config.title}
                    opponentConfig={selectedGame.config.opponentConfig}
                />
            {/if}
        </div>
    </div>
</Layout>
