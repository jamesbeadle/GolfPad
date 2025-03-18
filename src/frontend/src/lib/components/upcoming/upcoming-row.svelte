<script lang="ts">
    import { formatUnixDateToSmallReadable, getImageURL } from "$lib/utils/helpers";
    import type { UpcomingGame } from "../../../../../declarations/backend/backend.did";
    
    export let upcomingGame: UpcomingGame;

</script>
<div class="flex flex-col md:flex-row">
    <div class="flex flex-row w-1/2 w-1/4">
        <div class="w-1/5">
            <img src={`/game-images/${(Object.keys(upcomingGame.game_info.game_type)[0]).toLowerCase()}}.jpg`} alt='course' class="w-full m-1 rounded"/>
        </div>
        <div class="w-4/5 flex flex-col">
            <p class="tiny-header">GAME</p>
            <p class="strong-text">{Object.keys(upcomingGame.game_info.game_type)[0]}</p>
            <p class="strong-text">{ formatUnixDateToSmallReadable(upcomingGame.game_info.game_date) }</p>
        </div>
    </div>
    <div class="flex w-1/2 w-1/4">
        <div class="w-1/5">
            <img src={getImageURL(upcomingGame.course_info.course_image)} alt='course' class="w-full m-1 rounded"/>
        </div>
        <div class="w-4/5 flex flex-col">
            <p class="tiny-header">COURSE</p>
            <p class="strong-text">{upcomingGame.course_info.course_name}</p>
        </div>
    </div>
    <div class="flex w-full w-1/2">
        <!-- //TODO {#if isMulligans(upcomingGame.match_result)}
            <MulligansBuzzResult result={buzzItem.match_result} />
        {/if}-->
    </div>
</div>