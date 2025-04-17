<script lang="ts">
    import type { Game } from "../../../../../declarations/backend/backend.did";

    export let game: Game;
</script>

<div class="mb-4 space-y-4">
    <header class="flex flex-row justify-between">
        {#if Object.keys(game.gameType)[0] == 'Mulligans'}
            <h1 class="text-3xl text-black condensed">MULLIGANS</h1>
        {/if}
        {#if Object.keys(game.gameType)[0] == 'Bands'}
            <h1 class="text-3xl text-black condensed">BANDS</h1>
        {/if}
        <div>
            {#if Object.keys(game.status)[0] == 'Unplayed'}
                <div class="flex items-center justify-between">
                    <p class="text-4xl text-BrandLightBlue condensed">UPCOMING</p>
                </div>
            {/if}
            {#if Object.keys(game.status)[0] == 'Active'}
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full bg-BrandAcceptGreen animate-pulse"></div>
                        <p class="text-3xl text-BrandAcceptGreen condensed">LIVE</p>
                    </div>
                </div>
            {/if}
            {#if Object.keys(game.status)[0] == 'Complete'}
                <div class="flex items-center justify-between">
                    <p class="text-4xl text-black condensed">COMPLETE</p>
                </div>
            {/if}          
        </div>
    </header>
</div> 