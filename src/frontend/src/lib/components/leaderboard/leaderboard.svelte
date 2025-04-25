<script lang="ts">
    import { onMount } from 'svelte';
    import type { FantasyLeaderboard, GetFantasyLeaderboard } from '../../../../../declarations/backend/backend.did';
    import { leaderboardStore } from '$lib/stores/leaderboard-store';

    import LocalSpinner from '../shared/local-spinner.svelte';
    import Pagination from './pagination.svelte';

    let leaderboard = $state<FantasyLeaderboard | null>(null);
    let isLoading = $state(true);
    let currentPage = $state(1n);
    let totalEntries = $state(0n);

    async function fetchLeaderboard(page: bigint) {
        isLoading = true;
        try {
            //TODO: get tournamentId from somewhere
            const tournamentId = 1;
            const dto: GetFantasyLeaderboard = {
                tournamentId,
                page
            }
            leaderboard = await leaderboardStore.getLeaderboard(dto);
            totalEntries = leaderboard.totalEntries;
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        } finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        await fetchLeaderboard(currentPage);
    });

    function getScoreClass(score: number): string {
        if (score > 0) return 'text-BrandSuccess';
        if (score < 0) return 'text-BrandError';
        return 'text-BrandGray';
    }

    function getTotalPages(): number {
        if (!leaderboard) return 0;
        return Math.ceil(Number(leaderboard.totalEntries) / leaderboard.entries.length);
    }

    async function handlePageChange(newPage: bigint) {
        if (newPage < 1n || newPage > BigInt(getTotalPages())) return;
        currentPage = newPage;
        await fetchLeaderboard(newPage);
    }
</script>

<div class="w-full max-w-4xl p-4 mx-auto">
    <div class="overflow-hidden bg-white rounded-lg shadow-md">
        {#if leaderboard}
            <div class="p-4 border-b border-BrandDivider">
                <h2 class="text-2xl condensed text-BrandTextBlack">Fantasy Leaderboard</h2>
                <p class="text-sm text-BrandDarkGray">Tournament #{leaderboard.tournamentId}</p>
            </div>

            {#if isLoading}
                <LocalSpinner message="Loading leaderboard" />
            {:else if leaderboard.entries.length === 0}
                <div class="p-8 text-center">
                    <p class="text-BrandGray">No entries yet</p>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-BrandDivider">
                        <thead class="bg-BrandLightGray">
                            <tr>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-BrandDarkGray">Rank</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-BrandDarkGray">Player</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-BrandDarkGray">Score</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-BrandDivider">
                            {#each leaderboard.entries as entry, index}
                                <tr class="hover:bg-BrandLightGray">
                                    <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-BrandTextBlack">
                                        #{Number(index) + 1 + Number((currentPage - 1n) * BigInt(leaderboard.entries.length))}
                                    </td>
                                    <td class="px-6 py-4 text-sm whitespace-nowrap text-BrandDarkGray">
                                        {entry.username}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm {getScoreClass(entry.score)}">
                                        {entry.score > 0 ? '+' : ''}{entry.score}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                {#if getTotalPages() > 1}
                    <Pagination
                        {currentPage}
                        totalPages={getTotalPages()}
                        onPageChange={handlePageChange}
                        {totalEntries}
                        currentEntries={leaderboard.entries.length}
                    />
                {/if}
            {/if}
        {:else}
            <div class="p-8 text-center">
                <p class="text-BrandGray">No tournament data available</p>
            </div>
        {/if}
    </div>
</div>
