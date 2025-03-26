<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatUnixDateToSmallReadable } from "$lib/utils/helpers";
    import type { GameSummary, GameType, PrincipalId, Golfer, GetGolfer, GetGame, Game } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import { golferStore } from "$lib/stores/golfer-store";
    import { gameStore } from "$lib/stores/game-store";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import Tooltip from "../shared/tooltip.svelte";
    export let gameSummary: GameSummary;

    const isMulligans = (gameType: GameType): gameType is { Mulligans: null } => 'Mulligans' in gameType;
    const isBands = (gameType: GameType): gameType is { Bands: null } => 'Bands' in gameType;

    const PROFILE_CACHE_PREFIX = 'profile_pic_';
    
    async function getPlayerProfilePicture(playerId: string) {
        //TODO Also add tooltip with player name into this
        // const cacheKey = PROFILE_CACHE_PREFIX + playerId;
        // const cachedPicture = localStorage.getItem(cacheKey);
        
        // if (cachedPicture) {
        //     return cachedPicture;
        // }

        // try {
        //     const dto: GetGolfer = { principalId: playerId };
        //     const golfer: Golfer = await golferStore.getGolfer(dto);
            
        //     if (golfer?.golferPicture?.[0]) {
        //         const pictureUrl = getImageURL(golfer.golferPicture);
        //         localStorage.setItem(cacheKey, pictureUrl);
        //         return pictureUrl;
        //     }
        // } catch (error) {
        //     return '/default-profile-picture.jpg';
        // }

        return '/default-profile-picture.jpg';
    }

    async function getResult(gameId: bigint){
       //TODO: WAITING ON UPDATED BACKEND DTO FOR GAMESUMMARY
    }

    async function loadGame(){
        goto(`/games/${gameSummary.id}`)
    }
</script>

<div class="flex flex-row items-center p-4 rounded-lg {Object.keys(gameSummary.status)[0] === 'Complete' ? 'bg-white' : 'bg-BrandMediumGray'}">
    <div class="w-1/3">
        <div class="flex flex-row items-center space-x-4">
            <div>
                {#if isMulligans(gameSummary.gameType)}
                    <img class="w-20 h-20 rounded-lg" src="/game-images/mulligans.jpg" alt="game-icon" />
                {:else if isBands(gameSummary.gameType)}
                    <img class="w-20 h-20 rounded-lg" src="/game-images/bands.jpg" alt="game-icon" />
                {/if}
            </div>
            <div class="flex flex-col gap-1">
                {#if isMulligans(gameSummary.gameType)}
                    <p class="text-2xl text-left text-black condensed">MULLIGANS</p>
                {:else if isBands(gameSummary.gameType)}
                    <p class="text-2xl text-left text-black condensed">BANDS</p>
                {/if}
                <p class="text-2xl condensed text-BrandGray">{formatUnixDateToSmallReadable(gameSummary.date)}</p>
            </div>
        </div>
    </div>
    <div class="hidden md:block w-[1px] bg-BrandLightGray self-stretch m-4"></div>
    <div class="flex flex-row w-1/3">
        <div class="flex -space-x-3">
            {#each gameSummary.players as playerId}
                {#await getPlayerProfilePicture(playerId)}
                    <img 
                        class="border border-white rounded-full w-9 h-9" 
                        src="/default-profile-picture.jpg" 
                        alt="profile" 
                    />
                {:then pictureUrl}
                    <Tooltip text={playerId} href={`/profile/${playerId}`} let:isHovered>
                        <img 
                            class="w-10 h-10 rounded-full border transition-all duration-200 {isHovered ? 'border-BrandYellow border-[5px]' : 'border-white border'}" 
                            src={pictureUrl} 
                            alt="profile" 
                        />
                    </Tooltip>
                {:catch}
                    <Tooltip text={playerId} href={`/profile/${playerId}`}>
                        <img 
                            class="border border-white rounded-full w-9 h-9" 
                            src="/default-profile-picture.jpg" 
                            alt="profile" 
                        />
                    </Tooltip>
                {/await}
            {/each}
        </div>
    </div>
    <div class="hidden md:block w-[1px] bg-BrandLightGray self-stretch m-4"></div>
    <div class="w-1/3">
        {#if Object.keys(gameSummary.status)[0] == 'Unplayed'}
            <div class="flex items-center justify-between">
                <p class="text-4xl text-BrandLightBlue condensed">UPCOMING</p>
                <button 
                    on:click={loadGame} 
                    class="w-24 h-8 text-sm font-medium rounded-md text-BrandTextBlack bg-BrandLightBlue hover:opacity-90"
                >
                PREDICT
                </button>
            </div>
        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Active'}
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-BrandAcceptGreen animate-pulse"></div>
                    <p class="text-4xl text-BrandAcceptGreen condensed">LIVE</p>
                </div>
                <button 
                    on:click={loadGame} 
                    class="w-24 h-8 text-sm font-medium rounded-md text-BrandTextBlack bg-BrandAcceptGreen hover:opacity-90"
                >
                    PLAY
                </button>
            </div>
        {/if}
        {#if Object.keys(gameSummary.status)[0] == 'Complete'}
            <!-- //TODO This sets the result of the game in relation to the user so they know where they finished -->
            <div class="flex items-center justify-between">
                <p class="text-4xl text-black condensed">WINNER</p>
                <button 
                    on:click={loadGame} 
                    class="w-24 h-8 text-sm font-medium rounded-md bg-BrandForest text-BrandYellow hover:opacity-90"
                >
                    VIEW
                </button>
            </div>
        {/if}
        
    </div>
</div>