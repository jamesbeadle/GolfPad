<script lang="ts">
    import type { BandsResultInfo } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import TrophyIcon from "$lib/icons/trophy-icon.svelte";
    
    export let result: { Bands: BandsResultInfo };
    const bands = result.Bands;

    function getPointsForPlayer(points: (string | bigint)[], principal_id: string): bigint | undefined {
        const index = points.findIndex(
            (item) => typeof item === "string" && item === principal_id
        );
        if (index !== -1 && index + 1 < points.length && typeof points[index + 1] === "bigint") {
            return points[index + 1] as bigint;
        }
        return undefined;
    }

    const pointsMap: Map<string, bigint> = new Map();
    let maxPoints = BigInt(0);
    let winnerId: string | undefined = undefined;
    let hasTie = false;

    for (let i = 0; i < bands.points.length; i += 2) {
        const principal_id = bands.points[i];
        const points = bands.points[i + 1];
        if (typeof principal_id === "string" && typeof points === "bigint") {
            pointsMap.set(principal_id, points);
            if (points > maxPoints) {
                maxPoints = points;
                winnerId = principal_id;
                hasTie = false;
            } else if (points === maxPoints) {
                hasTie = true; 
            }
        }
    }

    function isWinner(principal_id: string): boolean {
        return !hasTie && principal_id === winnerId;
    }

    
</script>

<div class="flex flex-col space-y-2">
    {#each bands.players as player}
        <div class="flex flex-row w-full">
            <div class="w-1/8">
                <img class="w-8 h-8 rounded-full"  src={ getImageURL(player.profile_picture)} alt="profile" />
            </div>
            <div class="flex-1 ml-4 text-sm text-BrandDarkGray">
                <p>{player.username}</p>
            </div>
            <div class="w-20 mr-4">
                <p class="text-left text-black condensed">
                    {(() => {
                        const points = getPointsForPlayer(bands.points, player.principal_id);
                        return points !== undefined ? points.toString() : "-";
                    })()}
                </p>
            </div>
            <div class="w-1/8">
                {#if isWinner(player.principal_id)}
                    <TrophyIcon className="w-6" />
                {:else}
                    <div class="w-6"></div>
                {/if}
            </div>
        </div>
    {/each}
</div>
