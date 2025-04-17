<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
    import type { GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import { mulligansScores } from "$lib/derived/mulligans.derived";
    import { get } from "svelte/store";

    export let players: GolferSummary[];

    function getPlayerScore (playerId: string): string {
        
        if (!$mulligansScores) {
            return "ALL SQUARE";
        }

        if ($mulligansScores.score === 0n) {
            return "ALL SQUARE";
        }

        const isPlayer1 = playerId === $mulligansScores.winner;
        const scoreStr = $mulligansScores.score.toString();

        if (isPlayer1) {
            return `${scoreStr} UP`;
        } else {
            return `${scoreStr} DOWN`;
        }
    };
</script>

<div class="p-2 mt-4 space-y-4">
    <h2 class="text-2xl text-black condensed">PLAYER SCORES</h2>
    
    <div class="flex flex-row gap-8 p-4 bg-white rounded-lg">
        {#each players as player}
            <div class="flex flex-col items-center gap-2 pr-4 border-r border-BrandLightGray">
                <div class="relative">
                    <img 
                        src={getImageURL(player.profilePicture)} 
                        alt={player.name}
                        class="w-12 h-12 rounded-full bg-BrandYellow"
                    />
                    {#if getPlayerScore(player.principalId).includes("UP")}
                        <div class="absolute inset-0 border-4 rounded-full border-BrandYellow"></div>
                    {/if}
                </div>
                <p class="text-lg text-black condensed">
                    {getPlayerScore(player.principalId)}
                </p>
            </div>
        {/each}
    </div>
</div>