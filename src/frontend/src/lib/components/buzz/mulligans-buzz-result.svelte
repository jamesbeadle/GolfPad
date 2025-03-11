<script lang="ts">
    import type { MulligansResultInfo } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import TrophyIcon from "$lib/icons/trophy-icon.svelte";
    
    export let result: { Mulligans: MulligansResultInfo };
    const mulligans = result.Mulligans;
    
</script>

<div class="flex w-full flex-row">
    <div class="w-1/8">
        <img class="rounded-full" src={ getImageURL(mulligans.players[0].profile_picture)} alt="profile" />
    </div>
    <div class="w-5/8">
        <p>{mulligans.players[0].username}</p>
    </div>
    <div class="w-1/8">
        {#if mulligans.score > 0}
            <p>{mulligans.score} Up</p>
        {:else if mulligans.score == 0}
            <p>All Square</p>
        {:else}
            <p>{(-mulligans.score)} Down</p>
        {/if}
    </div>
    <div class="w-1/8">
        {#if mulligans.player1Wins}
            <TrophyIcon className="w-6" />
        {/if}
    </div>
</div>

<div class="flex w-full flex-row">
    <div class="w-1/8">
        <img class="rounded-full" src={ getImageURL(mulligans.players[1].profile_picture)} alt="profile" />
    </div>
    <div class="w-5/8">
        <p>{mulligans.players[1].username}</p>
    </div>
    <div class="w-1/8">
        {#if mulligans.score < 0}
            <p>{(-mulligans.score)} Up</p>
        {:else if mulligans.score == 0}
            <p>All Square</p>
        {:else}
            <p>{(mulligans.score)} Down</p>
        {/if}
    </div>
    <div class="w-1/8">
        {#if mulligans.player2Wins}
            <TrophyIcon className="w-6" />
        {/if}
    </div>
</div>
