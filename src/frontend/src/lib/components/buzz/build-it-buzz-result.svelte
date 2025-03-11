<script lang="ts">
    import type { BuildItResultInfo } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";
    import TrophyIcon from "$lib/icons/trophy-icon.svelte";
    
    export let result: { BuildIt: BuildItResultInfo };
    const buildIt = result.BuildIt;

    function getPointsForTeam(points: (bigint | bigint)[], team_id: bigint): bigint | undefined {
        const index = points.findIndex(
            (item) => typeof item === "bigint" && item === team_id
        );
        if (index !== -1 && index + 1 < points.length && typeof points[index + 1] === "bigint") {
            return points[index + 1] as bigint;
        }
        return undefined;
    }

    const pointsMap: Map<bigint, bigint> = new Map();
    let maxPoints = BigInt(0);
    let winnerId: bigint | undefined = undefined;
    let hasTie = false;

    for (let i = 0; i < buildIt.scores.length; i += 2) {
        const team_id = buildIt.scores[i];
        const points = buildIt.scores[i + 1];
        if (typeof team_id === "bigint" && typeof points === "bigint") {
            pointsMap.set(team_id, points);
            if (points > maxPoints) {
                maxPoints = points;
                winnerId = team_id;
                hasTie = false;
            } else if (points === maxPoints) {
                hasTie = true; 
            }
        }
    }

    function isWinner(team_id: bigint): boolean {
        return !hasTie && team_id === winnerId;
    }
    
</script>


{#each buildIt.teams as team}
    <div class="flex w-full flex-row">
        <div class="w-1/8">
            <img class="rounded-full" src={ getImageURL(buildIt.teams[0].team_image)} alt="profile" />
        </div>
        <div class="w-5/8">
            <p>{buildIt.teams[0].team_name}</p>
        </div>
        <div class="w-1/8">
            <p>
                {(() => {
                    const points = getPointsForTeam(buildIt.scores, team.team_id);
                    return points !== undefined ? points.toString() : "-";
                })()}
            </p>
        </div>
        <div class="w-1/8">
            {#if isWinner(team.team_id)}
                <TrophyIcon className="w-6" />
            {/if}
        </div>
    </div>



{/each}