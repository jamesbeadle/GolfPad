<script lang="ts">
    import UserProfileBanner from "$lib/components/shared/user-profile-banner.svelte";
    import { onMount } from "svelte";
    import type { Game, GolfCourseTeeGroup, GolferSummary, MulligansScores } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;
    let gameResult: MulligansScores | null = null;
    let selectedPlayer: GolferSummary = players[0];

    let selectedPlayerScore = 'AS';
    let selectedPlayerMulligansUsed = 0;
    let cumulativeScore = 0;

    onMount(() => {
        setGameInfo();
    });

    function setGameInfo() {
        const gameType = Object.keys(game.gameType)[0] as keyof typeof game.gameType;
        switch (gameType) {
            case "Mulligans":
                if (game.scoreDetail && game.scoreDetail.length > 0) {
                    const scoreDetail = game.scoreDetail[0];
                    if (!scoreDetail) return;
                    if ("MulligansScores" in scoreDetail) {
                        gameResult = scoreDetail.MulligansScores as MulligansScores;
                        updateCumulativeScore();
                    }
                }
                break;
            default:
                break;
        }
    }

    function updateCumulativeScore() {
        if (!gameResult) return;

        const golfer1Id = players[0].principalId;
        let holesWonBySelected = 0;
        let holesWonByOpponent = 0;

        gameResult.results.forEach(result => {
            if (result.winner === golfer1Id) {
                holesWonBySelected++;
            } else {
                holesWonByOpponent++;
            }
        });

        cumulativeScore = holesWonBySelected - holesWonByOpponent;

        if (cumulativeScore > 0) {
            selectedPlayerScore = `${cumulativeScore} Up`;
        } else if (cumulativeScore < 0) {
            selectedPlayerScore = `${Math.abs(cumulativeScore)} Down`;
        } else {
            selectedPlayerScore = 'AS';
        }

        selectedPlayerMulligansUsed = gameResult.golfer1MulligansUsed;
    }

    function getHoleResult(holeNumber: number) {
        if (!gameResult) return { score: 'AS', mulligansUsed: 0 };
        const holeResult = gameResult.results.find(r => r.holeNumber === holeNumber);
        if (!holeResult) return { score: 'AS', mulligansUsed: 0 };

        const golfer1Id = players[0].principalId;
        let holeScore = 'AS';
        let mulligansUsed = 0;

        if (holeResult.winner === golfer1Id) {
            holeScore = '1 Up';
        } else if (holeResult.winner !== golfer1Id) {
            holeScore = '1 Down';
        }

        if (holeResult.golfer1MulliganUsed) mulligansUsed++;
        if (holeResult.golfer2MulliganUsed) mulligansUsed++;

        return { score: holeScore, mulligansUsed };
    }

    function selectPlayer(playerId: string) {
        let playerResult = players.find(x => x.principalId == playerId);
        if(!playerResult) { return }
        selectedPlayer = playerResult;
        updateCumulativeScore();
    }

</script>

<div class="flex flex-col w-full">
    <p>Player Details</p>
</div>

<UserProfileBanner {players} {selectPlayer} />

<div class="flex flex-row">
    <div class="w-1/3 flex flex-col">
        <p>PLAYER</p>
        <p>{selectedPlayer.name}</p>
    </div>
    <div class="w-1/3 flex flex-col">
        <p>SCORE</p>
        <p>{selectedPlayerScore}</p>
    </div>
    <div class="w-1/3 flex flex-col">
        <p>MULLIGANS USED</p>
        <p>{selectedPlayerMulligansUsed}</p>
    </div>
</div>

<div class="flex flex-row">
    <p class="w-1/3">HOLE</p>
    <p class="w-1/3">SCORE</p>
    <p class="w-1/3">MULLIGANS USED</p>
</div>

{#each golfCourse.holes as hole}
    {@const holeResult = getHoleResult(hole.number)}
    <div class="flex flex-row">
        <div class="w-1/3">
            <p>{hole.number}</p>
        </div>
        <div class="w-1/3">
            <p>{holeResult.score}</p>
        </div>
        <div class="w-1/3">
            <p>{holeResult.mulligansUsed}</p>
        </div>
    </div>
{/each}

<button class="w-full">NEW GAME</button>