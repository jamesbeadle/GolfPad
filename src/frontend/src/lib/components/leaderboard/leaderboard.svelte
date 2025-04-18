<script lang="ts">
    import { onMount } from 'svelte';
    import type { FantasyLeaderboard, FantasyLeaderboardEntry } from '../../../../../declarations/backend/backend.did';

    import LocalSpinner from '../shared/local-spinner.svelte';

    export let leaderboard: FantasyLeaderboard;
    export let isLoading = false;

    function getScoreClass(score: number): string {
        if (score > 0) return 'text-green-500';
        if (score < 0) return 'text-red-500';
        return 'text-gray-500';
    }
</script>

<div class="w-full max-w-4xl p-4 mx-auto">
    <div class="overflow-hidden bg-white rounded-lg shadow-md">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Fantasy Leaderboard</h2>
            <p class="text-sm text-gray-500">Tournament #{leaderboard.tournamentId}</p>
        </div>

        {#if isLoading}
            <LocalSpinner message="Loading leaderboard" />
        {:else if leaderboard.entries.length === 0}
            <div class="p-8 text-center">
                <p class="text-gray-500">No entries yet</p>
            </div>
        {:else}
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Rank</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Player</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Shots</th>
                            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Predictions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each leaderboard.entries as entry, index}
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    #{index + 1}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {entry.principalId}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm {getScoreClass(entry.score)}">
                                    {entry.score > 0 ? '+' : ''}{entry.score}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {entry.shots}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500">
                                    <div class="flex flex-wrap gap-1">
                                        {#each entry.holes as hole}
                                            <div class="px-2 py-1 text-xs bg-gray-100 rounded">
                                                {hole.golferId}: {hole.shotCount} ({hole.score > 0 ? '+' : ''}{hole.score})
                                            </div>
                                        {/each}
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}

        {#if leaderboard.totalEntries > leaderboard.entries.length}
            <div class="p-4 border-t border-gray-200">
                <p class="text-sm text-center text-gray-500">
                    Showing {leaderboard.entries.length} of {leaderboard.totalEntries} entries
                </p>
            </div>
        {/if}
    </div>
</div>
