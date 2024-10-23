<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../../Layout.svelte";
    import { goto } from "$app/navigation";
    import ShowSelectGameModal from "$lib/components/games/show-select-game-modal.svelte";
    
    export let params;

    let showNewGameModal = false;

    interface Player {
        name: string;
        image: string;
        score: string;
        isWinning:boolean;
        mulligans: number;
    }

    let gameStatus ='completed';
    let winner: string = '';

    let playerHoleScores = [
        { hole: 1, par: 4, score: null },
        { hole: 2, par: 4, score: null },
    ]

    let players:Player[] = [
        { name: "James", image: "/team/james.jpg", score: "1 UP", isWinning:true, mulligans: 1 },
        { name: "Josh", image: "/team/josh.jpg", score: "2 DOWN",  isWinning:false, mulligans: 1 },
        { name: "George", image: "/team/george.jpg", score: "1 DOWN", isWinning:false, mulligans: 1 }
    ];

    function submitGameDetails(){
        console.log(playerHoleScores);
        //TODO save to DTO
    }

    function generateGameId(){
        //TODO there is a getGameDTO with the game id inside it 
        return Math.random().toString(36).substr(2,9);
    }

    function handleNextHole() {
        //TODO get golf course info
    }

    function handlePreviousHole() {
        //TODO get golf course info
    }
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
        <div class="w-full p-2 px-4 text-black">
            <div class="flex items-center justify-between">
                <h2 class="mt-1 text-3xl font-black text-black md:text-5xl condensed"style="margin-left:10px;">GAME DETAILS</h2>
                {#if gameStatus === 'live'}
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span class="ml-2 mr-4 text-xl font-bold text-green-500">LIVE</span>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex w-full p-4 text-black bg-gray-100 ">
            <div class="w-1/3 rounded-lg">
                <img src="/hero.png" alt="Mulligans" class="game-image" />
            </div>

            <div class="flex flex-col items-start justify-center w-1/3 ml-8"style="margin-top: 10px;" >
                <span class="mb-0 text-sm font-medium text-gray-500 ">GAMETYPE</span>
                <h1 class="font-black text-7xl game-type condensed"style="line-height: 1;">
                    MULLI-<br>GANS
                </h1>
                <!--TODO needs to be replaced with date of game-->
                <div class= "flex flex-col"style="margin-top: 10px;">
                    <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">DATE</span>
                    <h3 class ="mb-4 text-4xl font-bold text-center condensed game-date">October 9 2024</h3>
                </div>
                <!--TODO needs to be replaced with actual course-->
                <div class="flex items-center justify-start course-details"style="margin-top: 10px;" >
                    <img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg course-image"/>
                    <div class= "flex flex-col">
                        <span class="mb-0 text-sm font-medium text-gray-500">COURSE</span>
                        <div>
                            <p class="text-3xl font-bold text-center condensed game-date">Course's Name</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!--TODO needs to be replaced with game info-->
            <div class="w-1/3">
                <h4 class="mt-8 mb-0 text-4xl font-bold condensed"style="margin-top: -3px;">PLAYER SCORES</h4>
                <div class="mt-2 bg-white rounded-lg player-details">
                    {#if gameStatus === 'completed'}
                        <div class="flex flex-col mb-3">
                            <div class="flex px-4 mt-6 mb-2 space-x-2">
                                <img src="/team/james.jpg" alt="Player 1" class="w-10 h-10 rounded-full">
                                <img src="/team/josh.jpg" alt="Player 2" class="w-10 h-10 rounded-full">
                                <img src="/team/george.jpg" alt="Player 3" class="w-10 h-10 rounded-full">
                            </div>
                            <hr class="my-2 mb-5 border-gray-300 border-t-1"style="border-color: #F3F3F3;"/>
                            <div class ="flex items-center justify-between bg-white">
                                <div class="flex flex-col px-4">
                                    <div class="font-medium text-gray-500 text-xxs">PLAYER</div>
                                    <p class="mb-2 text-lg font-bold condensed">James (18)</p>
                                </div>

                                <div class="flex flex-col">
                                    <div class="font-medium text-gray-500 text-xxs">GAME PLACE</div>
                                    <p class="mb-2 text-lg font-bold condensed">WINNER</p>
                                </div>

                                <div class="flex flex-col px-4">
                                    <div class="font-medium text-gray-500 text-xxs">PLAYER</div>
                                    <p class="mb-2 text-lg font-bold condensed">78 (+6)</p>
                                </div>
                            </div>
                            <hr class="mt-2 border-gray-300 border-t-1" style="border-color: #F3F3F3;" />
                        </div>
                        <div class="mt-2"style="margin-top: -15px;">
                            <table class="flex flex-col w-full border-collapse table-auto ">
                                <thread>
                                    <tr style="border-color: #F3F3F3; margin-top: -10px; border-top-width: 1px;">
                                        <th class="p-4 pr-10 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Hole</th>
                                        <th class="p-6 pr-10 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Par</th>
                                        <th class="p-6 pr-6 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Score</th>
                                        <th class="p-6 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">+/- Par</th>
                                    </tr>
                                </thread>
                                <tbody>
                                    <!--TODO needs to be replaced with game info-->
                                    <tr>
                                        <td class="p-4 pl-6 text-lg font-bold text-center border-b condensed">1</td>
                                        <td class="p-4 pl-16 text-lg text-center border-b">4</td>
                                        <td class="p-4 pl-16 text-lg text-center border-b">4</td>
                                        <td class="p-4 pl-16 text-lg text-center border-b">E</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button on:click={openGameModal} class="btn btn-new-game">New Game</button>
                                {#if showNewGameModal}
                                    <ShowSelectGameModal visible={showNewGameModal} closeModal={closeGameModal} on:gameSelected={handleGameSelection} />
                                {/if}
                        </div>
                    {:else if gameStatus === 'live'}
                        <div class="flex items-center px-4 mt-4 mb-2 space-x-4 bg-white rounded-md player-details">
                            {#each players as player, index}
                                <!-- Player Image -->
                                 <div class ="flex flex-col items-center p-4 bg-white rounded-lg"
                                    style="opacity: {player.isWinning ? '1' : '0.4'};"> 
                                    <img src={player.image} alt={player.name} class="w-12 h-12 rounded-full">
                                    <p class="mt-1 text-xl font-bold text-center text-black condensed"
                                        style="color: {player.isWinning ? '#000' : '#888'};">{player.score}
                                    </p>
                                 </div>
                                {#if index < players.length - 1}
                                    <div class="h-20 mt-2 border-l-2" style="border-color: #F3F3F3;"></div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
                {#if gameStatus === 'live'}
                    <h4 class="mt-4 mb-0 text-4xl font-bold condensed"style="margin-top: 8px;">SCORE CARD</h4>
                    <div class="p-4 mt-4 bg-white rounded-lg player-details"style="margin-top: 10px;">
                        <div class="grid grid-cols-4 gap-4 text-center">
                            <div class="relative flex items-center justify-center">
                                <div>
                                    <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">HOLE</span>
                                    <p class="text-4xl font-bold condensed">07</p>
                                </div>
                                <div class="absolute top-0 bottom-0 right-0 w-px" style="border-left: 1px solid #F3F3F3;"></div>
                            </div>
                            <div>
                                <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">PAR</span>
                                <p class="text-2xl font-bold condensed">4</p>
                            </div>
                            <div>
                                <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">YARDS</span>
                                <p class="text-2xl font-bold condensed">455</p>
                            </div>
                            <div>
                                <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">S.I</span>
                                <p class="text-2xl font-bold condensed">18</p>
                            </div>
                        </div>
                        <hr class="my-4 border-gray-300 border-t-1" style="border-color: #F3F3F3;" />
                        <div class="mt-4">
                            <div class="grid grid-cols-2 gap-4 mb-2">
                                <div class="text-xl font-bold condensed">Player</div>
                                <div class="text-xl font-bold text-right condensed">Available Mulligans</div>
                            </div>
                            {#each players as player (player.name)}
                                <div class="grid items-center grid-cols-2 gap-4 mt-2">
                                    <div class="flex items-center space-x-4">
                                        <img src={player.image} alt={player.name} class="w-10 h-10 rounded-full">
                                        <p class="text-lg font-bold condensed">{player.name}</p>
                                    </div>
                                    <div class="flex items-center justify-end space-x-4">
                                        <p class="text-lg text-left condensed" style="margin-right:30px">{player.mulligans}</p>
                                        <button class="btn btn-use">USE</button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <hr class="mt-6 border-gray-300 border-t-1" style="border-color: #F3F3F3;" />
                        <div class="mt-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="text-lg font-bold">Winner</div>
                                <div class="text-xs font-bold text-right text-gray-500 uppercase">Select Winner of the Hole</div>
                            </div>
                            <div class="flex mt-4 space-x-4">
                                {#each players as player}
                                    <button type="button" 
                                        class="flex items-center p-4 space-x-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                                        on:click={() => winner = player.name}
                                        class:bg-gray-100={winner === player.name}>
                                    <img src={player.image} alt={player.name} class="w-10 h-10 rounded-full">
                                    <p class="font-bold">{player.name}</p>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center p-2 mt-2 space-x-2 bg-white rounded-md" style="margin-top: 5px;">
                        <button class="btn-hole btn-prev">PREVIOUS HOLE</button>
                        <button class="btn-hole btn-next">NEXT HOLE</button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</Layout>
<style>
    .game-image {
        width: 100%;
        height: auto;
        border-radius:8px;
    }
    .course-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }
    .btn {
        padding: 4px 16px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        margin: 1rem 0 1rem 1.5rem;
        text-align: center;
    }
    .btn-new-game {
        background-color: #f6c200;
        color: #1C4932;
        border: none;
        width: 400px;
    }
    .btn-new-game:hover {
        background-color: #e4c013; /* Darker yellow on hover */
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); /* More shadow on hover */
    }
    .btn-use{
        background-color: #1C4932;
        color: #F4C802;
        border: none;
        border-radius: 12px;
        min-width: 80px;
    }
    .btn-hole{
        padding: 8px 16px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        min-width: 230px;
        text-align: center;
    }
    .btn-next {
        background-color: #F4C802;
        color: #1C4932;
    }
    .btn-next:hover {
        background-color: #e4b400;
    }
    .btn-prev {
        background-color: #1C4932;
        color: #F4C802; 
    }
    .btn-hole:disabled {
        cursor: not-allowed; 
    }

</style>