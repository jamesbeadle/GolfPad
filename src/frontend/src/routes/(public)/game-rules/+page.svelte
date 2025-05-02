<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    onMount(() => {
        window.scrollTo(0, 0);
    });

    const selectedGame = writable("Mulligans");
</script>

    <div class="w-full max-w-4xl p-4 mx-auto text-black">
        <h2 class="mt-3 mb-6 text-2xl font-black text-black md:text-4xl">
            GAMEPLAY RULES
        </h2>

        <p class="mb-6 text-base leading-relaxed md:text-lg">
            Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.
        </p>

        <div class="mb-4 border-b border-gray-300">
            <div class="flex flex-wrap space-x-2 overflow-x-auto md:space-x-4">
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Mulligans') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    onclick={() => selectedGame.set('Mulligans')}
                >
                <span class="condensed">MULLIGANS</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Bands') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    onclick={() => selectedGame.set('Bands')}
                >
                <span class="condensed">BANDS</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Build It') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    onclick={() => selectedGame.set('Build It')}
                >
                <span class="condensed">BUILD IT</span>
                </button>
                <button
                    class="text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Next Up') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}"
                    onclick={() => selectedGame.set('Next Up')}
                >
                <span class="condensed">NEXT UP</span>
                </button>
            </div>
        </div>

        <div class="p-4 bg-white rounded-lg shadow-lg md:p-6">
            {#if $selectedGame === 'Mulligans'}
                <div class="flex flex-col items-center mb-4 md:flex-row">
                    <img src="prophet.png" alt="mulligans" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base">
                    <li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li>
                    <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li>
                    <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li>
                    <li>A golfer can use as many mulligans as they have available on any hole.</li>
                    <li>A golfer can build up as many mulligans as they can.</li>
                    <li>The game is decided when a golfer is winning by more holes than are available to play.</li>
                </ul>
            {/if}

            {#if $selectedGame === 'Bands'}
                <div class="flex flex-col items-center mb-4 md:flex-row">
                    <img src="bands.png" alt="bands" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">BANDS</h3>
                </div>
                <p class="mb-4 text-sm text-gray-700 md:text-base">
                    Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.
                </p>

                <p class="mb-4 text-sm text-gray-700 md:text-base">
                    The points for each band are as follows:
                </p>

                <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base">
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
                <p class="mt-4 text-sm text-gray-700 md:text-base">
                    A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.
                </p>
            {/if}


            {#if $selectedGame === 'Build It'}
                <div class="flex flex-col items-center mb-4 md:flex-row">
                    <img src="build-it.png" alt="build-it" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base">
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
                <div class="flex flex-col items-center mb-4 md:flex-row">
                    <img src="next-up.png" alt="next-up" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4" />
                    <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base">
                    <li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li>
                    <li>If a golfer wins the hole they are defending, they get 3 points.</li>
                    <li>If a golfer wins a hole they are not defending, they get 1 point.</li>
                    <li>The winner is the golfer with the most points at the end of the round.</li>
                    <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li>
                </ul>
            {/if}
        </div>
    </div>
