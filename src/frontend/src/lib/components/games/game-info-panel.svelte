<script lang="ts">
    import { goto } from "$app/navigation";
    import ShowSelectGameModal from './show-select-game-modal.svelte';
    import BandsScorecard from "./scorecard/bands-scorecard.svelte";
    import BuildItScorecard from "./scorecard/build-it-scorecard.svelte";
    import MulligansScorecard from "./scorecard/mulligans-scorecard.svelte";
    import NextUpScorecard from "./scorecard/next-up-scorecard.svelte";
    import ProphetScorecard from "./scorecard/prophet-scorecard.svelte";

    export let gameType: string;
    export let gameStatus: string;
    export let playerIds: string[];
    export let events: string[];
    export let winner: string[];

    let showNewGameModal = false;

    function openGameModal() {
        showNewGameModal = true;
    }

    function closeGameModal() {
        showNewGameModal = false;
    }

    function handleGameSelection(event: CustomEvent) {
        const gameChoice = event.detail;
        closeGameModal();
        goto(`/${gameChoice}-new`);
    }

    function getProfileImage(playerId: string) {
        //TODO get profile image from backend (create player store and service)
    }


</script>

<div>
    <h4 class="text-4xl font-bold condensed">
        {#if gameStatus === 'unplayed'}
            PLAYER SETUP
        {:else if gameStatus === 'active'}
            PLAYER SCORES
        {:else if gameStatus === 'completed'}
            PLAYER DETAILS
        {/if}
    </h4>
    <!-- Photo display -->

    <!-- Get Correct ScoreCard -->
    {#if gameType}
        {#if gameType === 'Bands'}
            <BandsScorecard />
        {:else if gameType === 'Mulligans'}
            <MulligansScorecard />
        {:else if gameType === 'NextUp'}
            <NextUpScorecard  />
        {:else if gameType === 'BuildIt'}
            <BuildItScorecard />
        {:else if gameType === 'Prophet'}
            <ProphetScorecard />
        {/if}
    {/if}

</div>