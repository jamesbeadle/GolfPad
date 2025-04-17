<script lang="ts">
    import { formatUnixDateToSmallReadable, getImageURL } from "$lib/utils/helpers";
    import type { OpponentInfo, UpcomingGame } from "../../../../../declarations/backend/backend.did";
    
    export let upcomingGame: UpcomingGame;

    const isMulligans = (opponent_info: OpponentInfo): opponent_info is { Mulligans: { players: Array<{ username: string; profile_picture: [] | [Uint8Array | number[]]; principal_id: string }> } } => {
        return 'Mulligans' in opponent_info;
    };

    const isBands = (opponent_info: OpponentInfo): opponent_info is { Bands: { players: Array<{ username: string; profile_picture: [] | [Uint8Array | number[]]; principal_id: string }> } } => {
        return 'Bands' in opponent_info;
    };

    const getPlayers = () => {
        if (isMulligans(upcomingGame.opponent_info)) {
            return upcomingGame.opponent_info.Mulligans.players;
        }
        if (isBands(upcomingGame.opponent_info)) {
            return upcomingGame.opponent_info.Bands.players;
        }
        return [];
    };

</script>

<div class="flex flex-col p-3 mb-2 space-y-4 bg-white rounded-lg md:flex-row md:space-y-0 md:items-start">
    <div class="grid grid-rows-[auto_1fr] w-1/3 pt-2">
        <p class="text-left tiny-header">GAME</p>
        <div class="flex flex-col mt-1">
            <p class="strong-text">{Object.keys(upcomingGame.game_info.game_type)[0]}</p>
            <p class="strong-text text-BrandDarkGray">{ formatUnixDateToSmallReadable(upcomingGame.game_info.game_date) }</p>
        </div>
    </div>

    <div class="hidden md:block w-[1px] bg-BrandLightGray self-stretch m-4"></div>

    <div class="grid grid-rows-[auto_1fr] w-1/3 pt-2">
        <p class="tiny-header">COURSE</p>
        <div class="flex flex-col mt-1">
            <p class="strong-text break-words whitespace-normal max-w-[150px]">{upcomingGame.course_info.course_name}</p>
        </div>
    </div>

    <div class="hidden md:block w-[1px] bg-BrandLightGray self-stretch m-4"></div>

    <div class="grid grid-rows-[auto_1fr] w-1/3 pt-2">
        <p class="tiny-header">OPPONENTS</p>
        <div class="flex flex-col mt-1 space-y-2">
            {#each getPlayers() as player}
                <div class="flex items-center space-x-3">
                    <img class="w-6 h-6 rounded-full" src={getImageURL(player.profile_picture)} alt="profile" />
                    <p class="text-base text-black condensed">{player.username}</p>
                </div>
            {/each}
        </div>
    </div>
</div>