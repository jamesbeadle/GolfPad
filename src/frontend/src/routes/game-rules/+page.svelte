<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Layout from "../Layout.svelte";

    onMount(() => {
        window.scrollTo(0, 0);
    });

    const selectedGame = writable("Mulligans");
</script>

<Layout>
    <div class="p-4 text-black w-full max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-4xl font-black text-black mb-6 mt-3 tracking-tight leading-tight">
            GAMEPLAY RULES
        </h2>

        <p class="text-base md:text-lg leading-relaxed mb-6">
            Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.
        </p>

        <div class="border-b border-gray-300 mb-4">
            <div class="flex flex-wrap space-x-2 md:space-x-4 overflow-x-auto">
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Mulligans') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    on:click={() => selectedGame.set('Mulligans')}
                >
                <span class="condensed">MULLIGANS</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Bands') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    on:click={() => selectedGame.set('Bands')}
                >
                <span class="condensed">BANDS</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Build It') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    on:click={() => selectedGame.set('Build It')}
                >
                <span class="condensed">BUILD IT</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Next Up') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    on:click={() => selectedGame.set('Next Up')}
                >
                <span class="condensed">NEXT UP</span>
                </button>
            </div>
        </div>

        <div class="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {#if $selectedGame === 'Mulligans'}
                <div class="flex flex-col md:flex-row items-center mb-4">
                    <img src="mulligans.png" alt="mulligans" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3>
                </div>
                <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2">
                    <li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li>
                    <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li>
                    <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li>
                    <li>A golfer can use as many mulligans as they have available on any hole.</li>
                    <li>A golfer can build up as many mulligans as they can.</li>
                    <li>The game is decided when a golfer is winning by more holes than are available to play.</li>
                </ul>
            {/if}

            {#if $selectedGame === 'Bands'}
                <div class="flex flex-col md:flex-row items-center mb-4">
                    <img src="bands.png" alt="bands" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">BANDS</h3>
                </div>
                <p class="text-sm md:text-base text-gray-700 mb-4">
                    Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.
                </p>

                <p class="text-sm md:text-base text-gray-700 mb-4">
                    The points for each band are as follows:
                </p>

                <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2">
                    <li><span class="semi-bold">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class="semi-bold">15 points</span></li>
                    <li><span class="semi-bold">Band 2:</span> Holes where you won’t lose a ball. <span class="semi-bold">10 points</span></li>
                    <li><span class="semi-bold">Band 3:</span> Holes where you hit 2/3 fairways. <span class="semi-bold">20 points</span></li>
                    <li><span class="semi-bold">Band 4:</span> Holes where you hit 2/3 greens. <span class="semi-bold">25 points</span></li>
                    <li><span class="semi-bold">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class="semi-bold">30 points</span></li>
                    <li><span class="semi-bold">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class="semi-bold">35 points</span></li>
                    <li><span class="semi-bold">Band 7:</span> Holes where you won’t bogey or worse. <span class="semi-bold">40 points</span></li>
                    <li><span class="semi-bold">Band 8:</span> Holes where you’ll be par or under. <span class="semi-bold">45 points</span></li>
                    <li><span class="semi-bold">Band 9:</span> Holes where you’ll be under par. <span class="semi-bold">50 points</span></li>
                </ul>
                <p class="text-sm md:text-base text-gray-700 mt-4">
                    A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.
                </p>
            {/if}


            {#if $selectedGame === 'Build It'}
                <div class="flex flex-col md:flex-row items-center mb-4">
                    <img src="build-it.png" alt="build-it" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3>
                </div>
                <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2">
                    <li>A golfer can create a team in which they can compete against multiple other teams.</li>
                    <li>The golfer who created the team becomes the team's captain.</li>
                    <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li>
                    <li>A team captain invites other team's to join in a new game.</li>
                    <li>A team captain selects a period of time to build their team card over.</li>
                    <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li>
                    <li>The winners are the team with the lowest scorecard at the end of the game's duration.</li>
                </ul>
            {/if}

            {#if $selectedGame === 'Next Up'}
                <div class="flex flex-col md:flex-row items-center mb-4">
                    <img src="next-up.png" alt="next-up" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3>
                </div>
                <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2">
                    <li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li>
                    <li>If a golfer wins the hole they are defending, they get 3 points.</li>
                    <li>If a golfer wins a hole they are not defending, they get 1 point.</li>
                    <li>The winner is the golfer with the most points at the end of the round.</li>
                    <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li>
                </ul>
            {/if}
        </div>
    </div>
</Layout>

<style>
    button {
        transition: color 0.3s, border-color 0.3s;
    }
</style>
