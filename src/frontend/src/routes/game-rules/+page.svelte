<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import { writable } from "svelte/store";

    onMount(() => {
        window.scrollTo(0, 0);
    });

    const selectedGame = writable("Mulligans");

    const games = [
        {
            name: "Mulligans",
            rules: [
                "A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.",
                "Golfers play each hole in match play format.",
                "Scores are adjusted by a golfer's handicap using the stroke play system as per a standard club match play round.",
                "If a golfer wins a hole a mulligan is added to their available mulligans.",
                "A golfer can use as many mulligans as they have available on any hole.",
                "The game is decided as per a standard match play match, when a golfer is winning by more holes than are available to play, the match ends."
            ]
        },
        {
            name: "Bands",
            rules: [
                "Rule 1: Start from the blue tees.",
                "Rule 2: Avoid hazards where possible.",
                "Rule 3: Use the honor system for scoring.",
                "Rule 4: Respect the course and its players."
            ]
        },
        {
            name: "Built It",
            rules: [
                "Rule 1: Play in pairs for this game.",
                "Rule 2: Alternate shots between partners.",
                "Rule 3: The team with the lowest score wins.",
                "Rule 4: Keep communication open with your partner."
            ]
        },
        {
            name: "Next Up",
            rules: [
                "Rule 1: This is a timed round.",
                "Rule 2: Complete the course within the set time.",
                "Rule 3: The fastest and most accurate team wins.",
                "Rule 4: Ensure safety during speed play."
            ]
        }
    ];
</script>

<Layout>
    <div class="p-2 px-4 text-black h-full w-full">
        <h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed tracking-tight leading-tight">
          GAMEPLAY RULES
        </h2>

        <p class="text-lg leading-relaxed">
            Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.
        </p>

        <div class="border-b border-gray-300 mb-4">
            <div class="flex space-x-4">
                {#each games as game}
                    <button
                        class="text-lg pb-2 focus:outline-none {($selectedGame === game.name) ? 'border-b-2 border-blue-500' : 'text-gray-500'}"
                        on:click={() => selectedGame.set(game.name)}
                    >
                        {game.name}
                    </button>
                {/each}
            </div>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
            {#each games as game}
                {#if $selectedGame === game.name}
                    <h3 class="text-2xl font-semibold mb-4">{game.name}</h3>
                    <div class="text-sm text-gray-700 space-y-2">
                        {#each game.rules as rule}
                            <p>{rule}</p>
                        {/each}
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</Layout>

<style>
    button {
        transition: color 0.3s, border-color 0.3s;
    }
</style>
