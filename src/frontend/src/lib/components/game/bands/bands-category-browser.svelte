<script lang="ts">
    import CategoryIndicator from "$lib/components/shared/category-indicator.svelte";
    import { writable } from "svelte/store";
    import BandHoleSelect from "./band-hole-select.svelte";
    import type { BandsPrediction, GameId, HoleNumber, PredictGameScore } from "../../../../../../declarations/backend/backend.did";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { gameStore } from "$lib/stores/game-store";

    export let gameId: GameId;
    
    let bandsPrediction: BandsPrediction | null = null;
    let activeCategory = 0;
    let currentPrediction = writable(1);
    let predictionTitle = writable('');
    const totalCategories = 9;
    let allPredicted = false;

    const categories = [
        { key: 'wontHitTreeOrBunkerStartHole', title: 'Won\'t Hit Tree or Bunker' },
        { key: 'underParStartHole', title: 'Under Par' },
        { key: 'wontDoubleBogeyStartHole', title: 'Won\'t Double Bogey' },
        { key: 'singlePutt2Of3GreensStartHole', title: 'Single Putt 2/3 Greens' },
        { key: 'wontBogeyStartHole', title: 'Won\'t Bogey' },
        { key: 'parOrUnderStartHole', title: 'Par or Under' },
        { key: 'hit2Of3FairwaysStartHole', title: 'Hit 2/3 Fairways' },
        { key: 'hit2Of3GreensStartHole', title: 'Hit 2/3 Greens' },
        { key: 'wontLoseBallStartHole', title: 'Won\'t Lose Ball' }
    ];

    onMount(() => {
        const golferId = $authStore.identity?.getPrincipal().toString() ?? "";
        bandsPrediction = {
            wontHitTreeOrBunkerStartHole: 0,
            underParStartHole: 0,
            golferId,
            wontDoubleBogeyStartHole: 0,
            singlePutt2Of3GreensStartHole: 0,
            wontBogeyStartHole: 0,
            parOrUnderStartHole: 0,
            hit2Of3FairwaysStartHole: 0,
            hit2Of3GreensStartHole: 0,
            wontLoseBallStartHole: 0
        };
    });

    function predict(startingHole: HoleNumber) {
        if (!bandsPrediction || activeCategory >= categories.length) return;

        bandsPrediction = {
            ...bandsPrediction,
            [categories[activeCategory].key]: startingHole
        };

        currentPrediction.set(activeCategory + 1);
        predictionTitle.set(categories[activeCategory].title);

        if (activeCategory < totalCategories - 1) {
            activeCategory += 1;
        } else {
            allPredicted = true;
        }
    }

    async function submitPrediction() {
        if (!bandsPrediction) return;

        const userId = $authStore.identity?.getPrincipal().toString() ?? "";
        const dto: PredictGameScore = {
            gameId: gameId,
            submittedById: userId,
            detail: {
                Bands: bandsPrediction
            }
        };
        await gameStore.predictGameScore(dto);
    }
</script>

<div class="flex flex-row">
    <div class="w-2/5">
        <p>Categories</p>
    </div>
    <div class="w-3/5">
        <CategoryIndicator {currentPrediction} {totalCategories} />
    </div>
</div>
<div class="flex flex-row">
    <BandHoleSelect {currentPrediction} {predictionTitle} {predict} />
</div>

{#if allPredicted}
    <button on:click={submitPrediction}>Submit Prediction</button>
{/if}