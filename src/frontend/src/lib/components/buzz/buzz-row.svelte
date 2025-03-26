<script lang="ts">
    import { formatUnixDateToSmallReadable, getImageURL, getCourseImageURL } from "$lib/utils/helpers";
    import type { BandsResultInfo, BuzzEntry, MatchResultInfo, MulligansResultInfo } from "../../../../../declarations/backend/backend.did";
    import BandsBuzzResult from "./bands-buzz-result.svelte";
    import MulligansBuzzResult from "./mulligans-buzz-result.svelte";

    export let buzzItem: BuzzEntry;

    const isMulligans = (result: MatchResultInfo): result is { Mulligans: MulligansResultInfo } => 'Mulligans' in result;
    const isBands = (result: MatchResultInfo): result is { Bands: BandsResultInfo } => 'Bands' in result;
</script>

<!-- Desktop View -->
<div class="flex-row hidden py-4 md:flex border-y border-BrandLightGray">
    <div class="flex flex-row items-center w-1/3">
        <div class="w-2/5">
            <img src={`/game-images/${(Object.keys(buzzItem.game_info.game_type)[0]).toLowerCase()}.jpg`} alt='course' class="w-4/5 rounded-lg"/>
        </div>
        <div class="flex flex-col w-4/5">
            <p class="text-left tiny-header">GAME</p>
            <p class="strong-text">{Object.keys(buzzItem.game_info.game_type)[0]}</p>
            <p class="gray-text condensed">{ formatUnixDateToSmallReadable(buzzItem.game_info.game_date) }</p>
        </div>
    </div>
    <div class="w-[1px] bg-BrandLightGray self-stretch m-4"></div>
    <div class="flex flex-row items-center w-1/3">
        <div class="w-2/5">
            <img src={getImageURL(buzzItem.course_info.course_image)} alt='course' class="w-4/5 rounded-lg"/>
        </div>
        <div class="flex flex-col w-4/5 text-left">
            <p class="tiny-header">COURSE</p>
            <p class="strong-text break-words whitespace-normal max-w-[150px]">{buzzItem.course_info.course_name}</p>
        </div>
    </div>
    <div class="w-[1px] bg-BrandLightGray self-stretch m-4"></div>
    <div class="flex flex-col justify-center w-1/3">
        {#if isMulligans(buzzItem.match_result)}
            <MulligansBuzzResult result={buzzItem.match_result} />
        {/if}
        {#if isBands(buzzItem.match_result)}
            <BandsBuzzResult result={buzzItem.match_result} />
        {/if}
    </div>
</div>

<!-- Mobile View -->
<div class="flex flex-col p-2 mb-4 rounded-lg md:hidden border-y bg-BrandLightGray border-BrandLightGray">
    <div class="flex flex-row justify-between mb-3">
        <div class="flex flex-row items-center gap-2">
            <div class="w-12 h-12">
                <img src={`/game-images/${(Object.keys(buzzItem.game_info.game_type)[0]).toLowerCase()}.jpg`} alt='course' class="w-full rounded-lg"/>
            </div>
            <div class="flex flex-col">
                <p class="text-xl text-black condensed">{Object.keys(buzzItem.game_info.game_type)[0]}</p>
                <p class="text-xl text-BrandGray condensed">{ formatUnixDateToSmallReadable(buzzItem.game_info.game_date) }</p>
            </div>
        </div>
        
        <div class="flex flex-row items-center gap-2">
            <div class="w-12 h-12">
                <img src={getCourseImageURL(buzzItem.course_info.course_image)} alt='course' class="object-cover w-full h-full rounded-lg"/>
            </div>
            <div class="flex flex-col">
                <p class="break-words whitespace-normal text-xl text-black condensed max-w-[100px]">{buzzItem.course_info.course_name}</p>
            </div>
        </div>
    </div>

    <div class="mt-2">
        <p class="mb-2 tiny-header">SCORE</p>
        {#if isMulligans(buzzItem.match_result)}
            <MulligansBuzzResult result={buzzItem.match_result} />
        {/if}
        {#if isBands(buzzItem.match_result)}
            <BandsBuzzResult result={buzzItem.match_result} />
        {/if}
    </div>
</div>