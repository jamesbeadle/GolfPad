<script lang="ts">
    import CategoryIndicator from "$lib/components/shared/category-indicator.svelte";
    import { writable } from "svelte/store";
    import BandHoleSelect from "./band-hole-select.svelte";
    import type { BandsPrediction, BandsScores, HoleNumber } from "../../../../../../declarations/backend/backend.did";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/auth-store";

    export let gameResult: BandsScores;
    
    let bandsPrediction: BandsPrediction | null = null;

    onMount(() => {
    
        bandsPrediction = {
            wontHitTreeOrBunkerStartHole: 0,
            underParStartHole: 0,
            golferId: $authStore.identity?.getPrincipal().toString() ?? "",
            wontDoubleBogeyStartHole: 0,
            singlePutt2Of3GreensStartHole: 0,
            wontBogeyStartHole: 0,
            parOrUnderStartHole: 0,
            hit2Of3FairwaysStartHole: 0,
            hit2Of3GreensStartHole: 0,
            wontLoseBallStartHole: 0
        }

    });
    
    let currentPrediction = writable(1);
    let predictionTitle = writable('');
    let totalCategories = 9;
    let allPredicted = false;

    function predict(startingHole: HoleNumber){
        
        //add to the dto for submission for 
        allPredicted = false;//TODO
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
    <button>Confirm Prediction</button>
{/if}