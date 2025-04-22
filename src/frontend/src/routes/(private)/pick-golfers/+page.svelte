<script lang="ts">
    import { onMount } from "svelte";
    import { predictionStore } from "$lib/stores/prediction-store";

    import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
    import BrandPanel from "$lib/components/shared/brand-panel.svelte";

    let loading = $state(false);

    async function getPrediction() {
        let dto = {
            tournamentId: 0,
            year: 2025
        }
        let prediction = await predictionStore.getPrediction(dto);
        console.log(prediction);
    }

    async function submitPredictions() {
        console.log("submitPredictions");
    }

    onMount(async () => {
        await getPrediction();
    });
</script>

{#if loading}
    <FullScreenSpinner message="Loading predictions"/>
{:else}
    <BrandPanel title="PICK GOLFERS" subTitle="Choose your golfers for the next tournament">
        <div class="space-y-8">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {#each Array.from({ length: 18 }, (_, i) => i + 1) as holeNumber}
                    <div class="overflow-hidden bg-white rounded-lg shadow">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Hole {holeNumber}</h3>
                            <div class="mt-4">
                                <button
                                    type="button"
                                    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm bg-BrandYellow hover:border-BrandForest focus:outline-none"
                                >
                                    Select Golfer
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="flex justify-center">
                <button
                    class="brand-button-forest"
                    onclick={submitPredictions}
                >
                    Submit Predictions
                </button>
            </div>
        </div>
    </BrandPanel>
{/if}