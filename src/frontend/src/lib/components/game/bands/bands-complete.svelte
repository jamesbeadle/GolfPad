<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;
</script>


<div class="flex flex-col w-full">
    <p>Player Details</p>
</div>


{#each players as player}
    <UserProfileWidget {player} />
{/each}

<div class="flex flex-row">
    <div class="w-1/3 flex flex-col">
        <p>PLAYER</p>
        <p>{selectedPlayer.name}</p>
    </div>
    <div class="w-1/3 flex flex-col">
        <p>GAME PLACE</p>
        <p>{selectedPlayer.position}</p>
    </div>
    <div class="w-1/3 flex flex-col">
        <p>SCORE</p>
        <p>{selectedPlayer.score}</p>
    </div>
</div>

<div class="flex flex-row">
    <p class="w-1/2">
        SCORECARD
    </p>
    <p class="w-1/4">
        
    </p>
    <p class="w-1/4">
        POINTS
    </p>
</div>

{#each playerBandsCategory as category}
    <div class="flex flex-row">
        <div class="col-1/2">
            <p>{category.description}</p>
        </div>
        <div class="col-1/4">
            {#if category.complete}
                <CompletedIcon class="w-6" />
            {:else}
                <FailedIcon class="w-6" />
            {/if}
        </div>
        <div class="col-1/4">
            <p>{hole.points}</p>
        </div>
    </div>
{/each}

<button class="w-full">NEW GAME</button>
