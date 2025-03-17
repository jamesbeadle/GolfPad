<script lang="ts">
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
import SelectedUserProfile from "$lib/components/shared/selected-user-profile.svelte";
    import { onMount } from "svelte";
    import type { Game, GetPlayerBandsResults, GolferSummary, PlayerBandsResults, PrincipalId } from "../../../../../../declarations/backend/backend.did";
    import { gameStore } from "$lib/stores/game-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import CompleteIcon from "$lib/icons/complete-icon.svelte";
    import FailedIcon from "$lib/icons/failed-icon.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let bandsResults: PlayerBandsResults | null = null;
    let selectedPlayer: GolferSummary | null = null;
    let selectedPlayerId: PrincipalId = ''; 
    let selectedPlayerPositionText = "";
    let selectedPlayerScore = 0;
    let isLoading = true;

    onMount(async () => {
        try{
            let dto: GetPlayerBandsResults = { id: game.id, principalId: $authStore.identity?.getPrincipal().toString() ?? "" };
            bandsResults = await gameStore.getPlayerBandsResults(dto);
            selectedPlayer = players.find(x => x.principalId == selectedPlayerId) ?? null;
            selectedPlayerPositionText = getSelectedPlayerPositionText();
            selectedPlayerScore = getSelectedPlayerScore();
        } catch {
            toasts.addToast({ type: 'error', message: '' });
        } finally {
            isLoading = false;
        }
    });

    function getSelectedPlayerPositionText() : string {
        return '' //TODO
    }

    function getSelectedPlayerScore() : number {
        return 0 //TODO
    }

    function selectUser(){

    }

</script>

{#if isLoading}
    <LocalSpinner />
{:else}

<div class="flex flex-col w-full">
    <p>Player Details</p>
</div>


<SelectedUserProfile {selectUser} {players} {selectedPlayerId} />

    {#if bandsResults && selectedPlayer}

        <div class="flex flex-row">
            <div class="w-1/3 flex flex-col">
                <p>PLAYER</p>
                <p>{selectedPlayer.name}</p>
            </div>
            <div class="w-1/3 flex flex-col">
                <p>GAME PLACE</p>
                <p>{selectedPlayerPositionText}</p>
            </div>
            <div class="w-1/3 flex flex-col">
                <p>SCORE</p>
                <p>{selectedPlayerScore}</p>
            </div>
        </div>

        <div class="flex flex-row">
            <p class="w-1/2">
                SCORECARD
            </p>
            <p class="w-1/4">
                
            </p>
            <p class="w-1/4">
                POINTS
            </p>
        </div>

        {#each bandsResults?.results as result}
            <div class="flex flex-row">
                <div class="col-1/2">
                    {#if Object.keys(result.category)[0] == 'NoTreeOrBunker'}
                        <p>Holes where you don’t hit a tree or enter a bunker.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'NoTreeOrBunker'}
                        <p>Holes where you won’t lose a ball.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'NoLostBall'}
                        <p>Holes where you hit 2/3 fairways.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'Hit2Of3Fairways'}
                        <p>Holes where you hit 2/3 greens.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'Hit2Of3Greens'}
                        <p>Holes where you will 1-putt 2/3 greens.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'OnePutt2Of3Greens'}
                        <p>Holes where you won’t get a double bogey or worse.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'NoDoubleBogeyOrWorse'}
                        <p>Holes where you won’t get a double bogey or worse.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'NoBogeyOrWorse'}
                        <p>Holes where you won’t bogey or worse.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'ParOrBetter'}
                        <p>Holes where you’ll be par or under.</p>
                    {/if}
                    {#if Object.keys(result.category)[0] == 'UnderPar'}
                        <p>Holes where you’ll be under par.</p>
                    {/if}
                </div>
                <div class="col-1/4">
                    {#if result.completed}
                        <CompleteIcon className="w-6" />
                    {:else}
                        <FailedIcon className="w-6" />
                    {/if}
                </div>
                <div class="col-1/4">
                    <p>{result.points}</p>
                </div>
            </div>
        {/each}

        <button class="w-full">NEW GAME</button>

    {:else}
            <LocalSpinner />
    {/if}

{/if}
