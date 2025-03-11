<script lang="ts">
    import { formatUnixDateToSmallReadable, getImageURL } from "$lib/utils/helpers";
    import type { BandsResultInfo, BuildItResultInfo, BuzzEntry, MatchResultInfo, MulligansResultInfo, NextUpResultInfo } from "../../../../../declarations/backend/backend.did";
    import MulligansBuzzResult from "./mulligans-buzz-result.svelte";

    export let buzzItem: BuzzEntry;

    const isMulligans = (result: MatchResultInfo): result is { Mulligans: MulligansResultInfo } => 
        'Mulligans' in result;
    const isBuildIt = (result: MatchResultInfo): result is { BuildIt: BuildItResultInfo } => 
        'BuildIt' in result;
    const isBands = (result: MatchResultInfo): result is { Bands: BandsResultInfo } => 
        'Bands' in result;
    const isNextUp = (result: MatchResultInfo): result is { NextUp: NextUpResultInfo } => 
        'NextUp' in result;


</script>
<div class="flex flex-col md:flex-row">
    <div class="flex flex-row w-1/2 w-1/4">
        <div class="w-1/5">
            <img src={`/game-images/${(Object.keys(buzzItem.game_info.game_type)[0]).toLowerCase()}}.jpg`} alt='course' class="w-full m-1 rounded"/>
        </div>
        <div class="w-4/5 flex flex-col">
            <p class="tiny-header">GAME</p>
            <p class="strong-text">{Object.keys(buzzItem.game_info.game_type)[0]}</p>
            <p class="strong-text">{ formatUnixDateToSmallReadable(buzzItem.game_info.game_date) }</p>
        </div>
    </div>
    <div class="flex w-1/2 w-1/4">
        <div class="w-1/5">
            <img src={getImageURL(buzzItem.course_info.course_image)} alt='course' class="w-full m-1 rounded"/>
        </div>
        <div class="w-4/5 flex flex-col">
            <p class="tiny-header">COURSE</p>
            <p class="strong-text">{buzzItem.course_info.course_name}</p>
        </div>
    </div>
    <div class="flex w-full w-1/2">
        {#if isMulligans(buzzItem.match_result)}
            <MulligansBuzzResult result={buzzItem.match_result} />
        {/if}
    </div>
</div>