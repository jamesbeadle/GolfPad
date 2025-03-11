<script lang="ts">
    import type { NextUpResultInfo } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import TrophyIcon from "$lib/icons/trophy-icon.svelte";
    
    export let result: { NextUp: NextUpResultInfo };
    const nextUp = result.NextUp;

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

    for (let i = 0; i < nextUp.points.length; i += 2) {
        const principal_id = nextUp.points[i];
        const points = nextUp.points[i + 1];
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

{#each nextUp.players as player, index}

    <div class="flex w-full flex-row">
        <div class="w-1/8">
            <img class="rounded-full" src={ getImageURL(player.profile_picture)} alt="profile" />
        </div>
        <div class="w-5/8">
            <p>{player.username}</p>
        </div>
        <div class="w-1/8">
            <p>
                {(() => {
                    const points = getPointsForPlayer(nextUp.points, player.principal_id);
                    return points !== undefined ? points.toString() : "-";
                })()}
            </p>
        </div>
        <div class="w-1/8">
            {#if isWinner(player.principal_id)}
                <TrophyIcon className="w-6" />
            {/if}
        </div>
    </div>
    
{/each}
