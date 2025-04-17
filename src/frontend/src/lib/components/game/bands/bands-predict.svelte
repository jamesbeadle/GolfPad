
<script lang="ts">
    import { onMount } from "svelte";
    import type { BandsScores, Game, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import BandsCategoryBrowser from "./bands-category-browser.svelte";
    import LoggedInPlayersWithPlayer from "$lib/components/shared/logged-in-players-with-player.svelte";

    export let game: Game;
    export let players: GolferSummary[];

    let selectedPlayer = players[0];
    let gameResult: BandsScores | null = null;

    onMount(() => {
        setGameInfo();
    });

    function setGameInfo() {
        const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
        switch (gameType) {
            case "Bands":
                if (game.scoreDetail && game.scoreDetail.length > 0) {
                    const scoreDetail = game.scoreDetail[0];
                    if (!scoreDetail) return;
                    if ("BandsScores" in scoreDetail) {
                        gameResult = scoreDetail.BandsScores as BandsScores;
                    }
                }
                break;
            default:
                break;
        }
    }
</script>

<div class="flex flex-col">
    <p>PLAYER SETUP</p>
    <LoggedInPlayersWithPlayer {players} />
    <p>PLAYER</p>
    <p>{selectedPlayer.name}<span class="name-handicap">{selectedPlayer.handicap}</span></p>
    <BandsCategoryBrowser gameId={game.id} />
</div>