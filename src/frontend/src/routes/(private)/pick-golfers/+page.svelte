<script lang="ts">
    import { onMount } from "svelte";
    import { predictionStore } from "$lib/stores/prediction-store";
    import type { GolferSummary, SubmitPrediction } from "../../../../../declarations/backend/backend.did";
    import { toasts } from "$lib/stores/toasts-store";

    import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
    import BrandPanel from "$lib/components/shared/brand-panel.svelte";
    import HolesGird from "$lib/components/pick-golfers/holes-gird.svelte";

    let loading = $state(false);
    let selectedGolfers = $state<Record<number, GolferSummary | null>>({});

    async function getPrediction() {
        loading = true;
        try {
            let dto = {
                tournamentId: 0,
                year: 2025
            }
            let prediction = await predictionStore.getPrediction(dto);
            console.log(prediction);
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }

    async function submitPredictions() {
        loading = true;
        try {
            let dto: SubmitPrediction = {
                year: 2025,
                tournamentId: 0,
                hole1GolferId: selectedGolfers[1]!.id,
                hole2GolferId: selectedGolfers[2]!.id,
                hole3GolferId: selectedGolfers[3]!.id,
                hole4GolferId: selectedGolfers[4]!.id,
                hole5GolferId: selectedGolfers[5]!.id,
                hole6GolferId: selectedGolfers[6]!.id,
                hole7GolferId: selectedGolfers[7]!.id,
                hole8GolferId: selectedGolfers[8]!.id,
                hole9GolferId: selectedGolfers[9]!.id,
                hole10GolferId: selectedGolfers[10]!.id,
                hole11GolferId: selectedGolfers[11]!.id,
                hole12GolferId: selectedGolfers[12]!.id,
                hole13GolferId: selectedGolfers[13]!.id,
                hole14GolferId: selectedGolfers[14]!.id,
                hole15GolferId: selectedGolfers[15]!.id,
                hole16GolferId: selectedGolfers[16]!.id,
                hole17GolferId: selectedGolfers[17]!.id,
                hole18GolferId: selectedGolfers[18]!.id,
            }
            let result = await predictionStore.submitPrediction(dto);

            console.log("submitPredictions", result);
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }

    function handleGolferSelected(holeNumber: number, golfer: GolferSummary | null) {
        const isDuplicate = Object.values(selectedGolfers).some(
            selectedGolfer => selectedGolfer?.id === golfer?.id
        );
        if (isDuplicate) {
            toasts.addToast({
                message: "You cannot select the same golfer twice",
                type: "info",
                duration: 5000
            });
        }
        else {
            selectedGolfers[holeNumber] = golfer;
        }
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
            <HolesGird holes={Array.from({ length: 18 }, (_, i) => i + 1)} selectedGolfers={selectedGolfers} onGolferSelected={handleGolferSelected}  />

            <div class="flex justify-center">
                <button
                    class="brand-button-forest"
                    onclick={submitPredictions}
                    disabled={Object.keys(selectedGolfers).length !== 18}
                >
                    Submit Predictions
                </button>
            </div>
        </div>
    </BrandPanel>
{/if}