<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatUnixDateToSmallReadable } from "$lib/utils/helpers";
    import type { GameSummary } from "../../../../../declarations/backend/backend.did";

    export let gameSummary: GameSummary;

    async function loadGame(){
        goto(`/games/${gameSummary.id}`)
    }
</script>

<div class="row">
    <div class="w-1/4">
        <div class="flex flex-row">
            <div class="w-1/5">
                <img class="rounded" src="mulligans.jpg" alt="game-icon" />
            </div>
            <div class="w-4/5">
                <p>MULLIGANS</p>
                <p>{formatUnixDateToSmallReadable(gameSummary.date)}</p>
            </div>
        </div>
    </div>
    <div class="w-1/4">
        {#each gameSummary.players as player}
            <!-- //TODO load player face icon, load default icon while load and cache profile picture, need to max cache up to some limit and implement first in first out -->
        {/each}
    </div>
    <div class="w-1/4">
        {#if Object.keys(gameSummary.status)[0] == 'Unlpayed'}
            <p class="brand-blue">UPCOMING</p>
        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Active'}
        <p class="brand-green">Live</p>

        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Complete'}
            <!-- //TODO This sets the result of the game in relation to the user so they know where they finished -->
        {/if}
    </div>
    <div class="w-1/4">
        {#if Object.keys(gameSummary.status)[0] == 'Unlpayed'}
            <button on:click={loadGame} class="button-predict">Predict</button>
        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Active'}
        <button on:click={loadGame} class="button-play">Play</button>

        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Complete'}
            <button on:click={loadGame} class="button-view">View</button>
        {/if}
    </div>
</div>