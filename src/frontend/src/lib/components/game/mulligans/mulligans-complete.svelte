<script lang="ts">
    import UserProfileBanner from "$lib/components/shared/user-profile-banner.svelte";
    import type { Game, GolferSummary } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;

    

    let players: GolferSummary[] = []; //TODO

</script>


<div class="flex flex-col w-full">
    <p>Player Details</p>
</div>


<UserProfileBanner {players} />

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
        <p>MULLIGANS USED</p>
        <p>{selectedPlayer.mulligansUsed}</p>
    </div>
</div>

<div class="flex flex-row">
    <p class="w-1/3">
        HOLE
    </p>
    <p class="w-1/3">
        SCORE
    </p>
    <p class="w-1/3">
        MULLIGANS USED
    </p>
</div>

{#each selectedPlayerHoles as hole}
    <div class="flex flex-row">
        <div class="col-1/3">
            <p>{hole.number}</p>
        </div>
        <div class="col-1/3">
            <p>{hole.score}</p>
        </div>
        <div class="col-1/3">
            <p>{hole.mulligansUsed}</p>
        </div>
    </div>
{/each}

<button class="w-full">NEW GAME</button>
