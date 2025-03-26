<script lang="ts">
    import type { MulligansResultInfo } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import TrophyIcon from "$lib/icons/trophy-icon.svelte";
    
    export let result: { Mulligans: MulligansResultInfo };
    const mulligans = result.Mulligans;
</script>

<div class="flex flex-col space-y-2">
    <div class="flex items-center">
        <img class="w-8 h-8 rounded-full" src={getImageURL(mulligans.players[0].profile_picture)} alt="profile" />
        <p class="flex-1 ml-4 text-sm text-BrandDarkGray">{mulligans.players[0].username}</p>
        <p class="w-20 mr-4 text-left text-black condensed">
            {#if mulligans.score > 0}
                {mulligans.score} Up
            {:else if mulligans.score == 0}
                All Square
            {:else}
                {(-mulligans.score)} Down
            {/if}
        </p>
        {#if mulligans.player1Wins}
            <TrophyIcon className="w-6" />
        {:else}
            <div class="w-6"></div>
        {/if}
    </div>

    <div class="flex items-center">
        <img class="w-8 h-8 rounded-full" src={getImageURL(mulligans.players[1].profile_picture)} alt="profile" />
        <p class="flex-1 ml-4 text-sm text-BrandDarkGray">{mulligans.players[1].username}</p>
        <p class="w-20 mr-4 text-left text-black condensed">
            {#if mulligans.score < 0}
                {(-mulligans.score)} Up
            {:else if mulligans.score == 0}
                All Square
            {:else}
                {mulligans.score} Down
            {/if}
        </p>
        {#if mulligans.player2Wins}
            <TrophyIcon className="w-6" />
        {:else}
            <div class="w-6"></div>
        {/if}
    </div>
</div>
