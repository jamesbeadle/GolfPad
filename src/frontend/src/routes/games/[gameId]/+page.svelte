<script lang="ts">
    import { gameStore } from "$lib/stores/game-store";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { writable } from "svelte/store";
    import type { GameDTO } from "../../../../../declarations/backend/backend.did";
    import Layout from "../../Layout.svelte";
    import TitlePanel from "$lib/components/games/title-panel.svelte";
    import GameInfoPanel from "$lib/components/games/game-info-panel.svelte";

    $: gameId = $page.url.searchParams.get("id")

    const gameData = writable<GameDTO>({
    id: BigInt(0),
    gameType: { Mulligans: null },
    scoreDetail: [],
    status: { Unplayed: null },
    courseId: BigInt(0),
    predictions: [],
    events: [],
    courseSnapshot: {
        courseId: BigInt(0),
        courseVersion: 0,
        teeGroup: {
            added: BigInt(0),
            holes: [],
            name: "",
            colour: "",
            strokeIndex: 0
        }
    },
    teeOffTime: BigInt(0),
    playerIds: [],
    invites: [],
    winner: "",
});
    let isLoading = true;

    type GameType = { Bands: null } | { Mulligans: null } | { NextUp: null } | { BuildIt: null } | { Prophet: null };
    type GameStatus = { Unplayed: null } | { Active: null } | { Complete: null };

    onMount(async () => {
        try {
            if (gameId) {
                const gameDetails = (await gameStore.getGame(parseInt(gameId)));
                gameData.set(gameDetails);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            isLoading = false;
        }
    })
    function getGameTypeImage(gameType: GameType): string {
        if ('Bands' in gameType) return "/bands.png";
        if ('Mulligans' in gameType) return "/mulligans.png";
        if ('NextUp' in gameType) return "/next-up.png";
        if ('BuildIt' in gameType) return "/build-it.png";
        if ('Prophet' in gameType) return "/prophet.png";
        return "";
}

    function getGameStatus(status: GameStatus): string {
        if ('Unplayed' in status) return "Unplayed";
        if ('Active' in status) return "Active";
        if ('Complete' in status) return "Complete";
        return "Unknown";
    }
</script>

<Layout>
    <div class="w-full">
        <div class="w-full p-2 px-4 text-black">
            <div class="flex items-center justify-between">
                <h2 class="px-5 mt-1 text-3xl font-black text-black md:text-5xl condensed">GAME DETAILS</h2>
                {#if getGameStatus($gameData?.status) === 'Active'}
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span class="ml-2 mr-4 text-xl font-bold text-green-500">LIVE</span>
                    </div>
                {/if}
                {#if getGameStatus($gameData?.status) === 'Unplayed'}
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span class="ml-2 mr-4 text-xl font-bold text-blue-500">PREDICT</span>
                    </div>
                {/if}
            </div>
        </div>
        <div class="w-full">
            <div class="w-1/3 rounded-lg">
                <img src={getGameTypeImage($gameData?.gameType)} alt={Object.keys($gameData?.gameType || {})[0]} class="game-image" />
            </div>

            <TitlePanel 
                gameType={Object.keys($gameData?.gameType || {})[0]}
                teeOffTime={$gameData.teeOffTime}
                courseId={$gameData.courseId}
            />

            <GameInfoPanel
                gameType={Object.keys($gameData?.gameType || {})[0]}
                gameStatus={getGameStatus($gameData?.status)}
                playerIds={Object.keys($gameData.playerIds)}
                events={Object.keys($gameData.events)}
                winner={Object.keys($gameData.winner)}
            />
        </div>
    </div>
</Layout>