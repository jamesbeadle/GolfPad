<script lang="ts">
    import { goto } from "$app/navigation";
    import { golferStore } from "$lib/stores/golfer-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { CreateGolfer, CountryId } from "../../../../../../../declarations/backend/backend.did";
    
    import BrandPanel from "$lib/components/shared/brand-panel.svelte";
    import GolferInfo from "$lib/components/golfer/create-golfer/golfer-info.svelte";
    import WorldRanking from "$lib/components/golfer/create-golfer/world-ranking.svelte";

    let firstName = $state("");
    let lastName = $state("");
    let nationality = $state<CountryId>(0);
    let worldRanking = $state(1);

    async function submitGolfer() {
        if (!firstName || !lastName) {
            alert("Please enter both first and last name");
            return;
        }

        if (nationality === 0) {
            alert("Please select a nationality");
            return;
        }

        const dto: CreateGolfer = {
            firstName,
            lastName,
            nationality,
            worldRanking
        };

        try {
            await golferStore.createGolfer(dto);
            toasts.addToast({type: 'success', message: 'Golfer created successfully!', duration: 5000});
            goto("/golfers");
        } catch (error) {
            console.error("Failed to create golfer:", error);
            toasts.addToast({type: 'error', message: 'Failed to create golfer', duration: 5000});
        }
    }
</script>

<BrandPanel title="CREATE GOLFER" subTitle="">
    <form onsubmit={submitGolfer} class="space-y-6 text-black">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <GolferInfo 
                bind:firstName 
                bind:lastName 
                bind:nationality
            />
            <WorldRanking bind:worldRanking />
        </div>

        <div class="flex justify-end pt-6">
            <button
                type="button"
                class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
                onclick={() => goto("/golfers")}
            >
                Cancel
            </button>
            <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-BrandForest hover:bg-BrandForest/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
            >
                Create Golfer
            </button>
        </div>
    </form>
</BrandPanel>