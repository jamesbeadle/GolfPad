<script lang="ts">
    import { onMount } from "svelte";
    import { predictionStore } from "$lib/stores/prediction-store";
    import { golferStore } from "$lib/stores/golfer-store";
    import type { GolferSummary, SubmitPrediction, Prediction } from "../../../../../declarations/backend/backend.did";
    import { toasts } from "$lib/stores/toasts-store";

    import FullScreenSpinner from "$lib/components/shared/global/full-screen-spinner.svelte";
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
            if(prediction){
                await formulatePrediction(prediction);
            }
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

    async function formulatePrediction(prediction: Prediction) {
        let golfers: GolferSummary[] = [];
        const unsubscribe = golferStore.subscribe(value => {
            golfers = value;
        });
        unsubscribe();

        selectedGolfers = {
            1: golfers.find(g => g.id === prediction.hole1GolferId) ?? null,
            2: golfers.find(g => g.id === prediction.hole2GolferId) ?? null,
            3: golfers.find(g => g.id === prediction.hole3GolferId) ?? null,
            4: golfers.find(g => g.id === prediction.hole4GolferId) ?? null,
            5: golfers.find(g => g.id === prediction.hole5GolferId) ?? null,
            6: golfers.find(g => g.id === prediction.hole6GolferId) ?? null,
            7: golfers.find(g => g.id === prediction.hole7GolferId) ?? null,
            8: golfers.find(g => g.id === prediction.hole8GolferId) ?? null,
            9: golfers.find(g => g.id === prediction.hole9GolferId) ?? null,
            10: golfers.find(g => g.id === prediction.hole10GolferId) ?? null,
            11: golfers.find(g => g.id === prediction.hole11GolferId) ?? null,
            12: golfers.find(g => g.id === prediction.hole12GolferId) ?? null,
            13: golfers.find(g => g.id === prediction.hole13GolferId) ?? null,
            14: golfers.find(g => g.id === prediction.hole14GolferId) ?? null,
            15: golfers.find(g => g.id === prediction.hole15GolferId) ?? null,
            16: golfers.find(g => g.id === prediction.hole16GolferId) ?? null,
            17: golfers.find(g => g.id === prediction.hole17GolferId) ?? null,
            18: golfers.find(g => g.id === prediction.hole18GolferId) ?? null
        };
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
                    class="brand-button-forest disabled:opacity-50"
                    onclick={submitPredictions}
                    disabled={Object.keys(selectedGolfers).length !== 18}
                >
                    Submit Predictions
                </button>
            </div>
        </div>
    </BrandPanel>
{/if}