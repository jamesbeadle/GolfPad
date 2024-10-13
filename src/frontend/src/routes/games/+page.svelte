<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import { goto } from "$app/navigation";
    import { golferGameSummary, getGolferGameSummary } from "$lib/stores/golfer-summaries-store";
    import ShowSelectGameModal from "$lib/components/games/show-select-game-modal.svelte";

    let showNewGameModal = false;

    let pageFilters = {
        limit: BigInt(0),
        offset: BigInt(0),
    };

    // Fetch golfer game summaries on mount
    onMount(async () => {
        try {
            const result = await getGolferGameSummary(pageFilters);
            console.log(result);  // Log the result after it's fetched
        } catch (err) {
            console.error("Failed to fetch golfer game summaries:", err);
        }
    });
    //TODO needs to be more like figma
    function openGameModal() {
        showNewGameModal = true;
    }

    function closeGameModal() {
        showNewGameModal = false;
    }

    function handleGameSelection(event: CustomEvent) {
        const gameChoice = event.detail;
        closeGameModal();
        goto(`/${gameChoice}-new`);
    }

</script>

<Layout>
    <div class="w-full">
        <div class="w-full h-full p-2 px-4 text-black">
            <div class="flex items-center justify-between mb-4">
                <h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed">MY GAMES</h2>
                <button on:click={openGameModal} class="btn btn-new-game">New Game</button>
                {#if showNewGameModal}
                    <ShowSelectGameModal visible={showNewGameModal} closeModal={closeGameModal} on:gameSelected={handleGameSelection} />
                {/if}
            </div>

            <!-- Headings -->
            <div class="flex items-center p-4 font-bold table-headings condensed">
                <div class="w-2/6">Game</div>
                <div class="w-2/6">Players</div>
                <div class="w-1/6">Status</div>
                <div class="w-1/6"></div>
            </div>

            <!-- Check if there are no games -->
            {#if $golferGameSummary && $golferGameSummary.totalEntries === BigInt(0)}
                <!-- Content to display when totalEntries is 0 -->
                <p>No game history found. Start your first game!</p>
            {/if}

            <!-- Game List -->
            {#if $golferGameSummary && $golferGameSummary.entries.length > 0}
                {#each $golferGameSummary.entries as game}
                    <div class="game-list">
                        <div class="flex items-center p-4 game-type">
                            <div class="flex items-center game-info">
                                <!-- Game image -->
                            </div>
                            <div class="ml-4">
                                <h3 class="font-bold">{game.gameType}</h3>
                                <p class="text-sm">{new Date(Number(game.date) * 1000).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <!-- Players Column -->
                        <div class="flex ml-auto players">
                            {#each game.players as player}
                                <div class="hover-picture">
                                    <div class="p-2 bg-white rounded shadow-lg hover-player">
                                        <p class="font-bold">{player}</p>
                                        <button class="btn btn-view-player">View Player</button>
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <!-- Status Column -->
                        <div class="w-1/6 font-bold text-blue-500 status">
                            {game.status}
                        </div>

                        <!-- Button Column -->
                        <div class="w-1/6 actions">
                            <button class="btn btn-predict">Predict</button>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</Layout>


<style>
    /* Example button styling */
    .btn {
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-new-game {
        background-color: #f6c200;
        color: #1C4932;
        border: none;
    }

    .btn-predict {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
    }
    
    .table-headings{
        background-color: #f7f7f7;
        padding: 10px;
        font-size: 20px;
        width:100%;
        text-align: left;
        font-weight: bold;
    }

    .game-type h3 {
        font-weight: bold;
    }

    .game-list {
        background-color: #f7f7f7;
        border-top: 1px solid #eee;
        margin-top: 20px;
        text-align: left;
        width: 100%;
    }

    .game-type {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 20px 0;
    }

    .game-info {
        width: 60px;
        height: 60px;
        border-radius: 5px;
    }

    .players {
        display: flex;
        background-color: #f7f7f7;
    }

    .hover-picture {
        display: none;
        position: absolute;
        top: 50px;
        left: 0;
        z-index: 100;
    }

    .hover-player {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        padding: 10px;
    }

    .btn-view-player {
        background-color: #007bff;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .status {
        font-size: 18px;
        font-weight: bold;
        color: #007bff;
        background-color: #f7f7f7;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

/*     .no-games-message {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        color: gray;
    } */

    h2 {
        text-align: left;
        margin-left: 0;
    }

</style>