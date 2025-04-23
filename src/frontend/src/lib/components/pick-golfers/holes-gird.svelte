<script lang="ts">
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    import PickGolferModal from "$lib/components/pick-golfers/pick-golfer-modal.svelte";

    interface Props {
        holes: number[];
        selectedGolfers: Record<number, GolferSummary | null>;
        onGolferSelected: (holeNumber: number, golfer: GolferSummary | null) => void;
    }
    let { holes, selectedGolfers, onGolferSelected }: Props = $props();
    let isModalOpen = $state(false);
    let currentHole = $state<number | null>(null);

    function openModal(holeNumber: number) {
        currentHole = holeNumber;
        isModalOpen = true;
    }

    function handleSelect(golfer: GolferSummary) {
        if (currentHole) {
            onGolferSelected(currentHole, golfer);
        }
        isModalOpen = false;
    }

    function clearGolfer(holeNumber: number) {
        onGolferSelected(holeNumber, null);
    }
</script>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
    {#each holes as holeNumber}
        <div class="relative overflow-hidden bg-white rounded-lg shadow">
            {#if selectedGolfers[holeNumber]}
                <button
                    class="absolute px-2 py-1 text-xs font-medium text-white transition-colors border rounded-md top-6 right-2 border-BrandDivider bg-BrandDeclineRed hover:border-BrandForest"
                    onclick={() => clearGolfer(holeNumber)}
                >
                   Remove Golfer
                </button>
            {/if}
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Hole {holeNumber}</h3>
                <div class="mt-4">
                    <button
                        type="button"
                        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm bg-BrandYellow hover:border-BrandForest focus:outline-none"
                        onclick={() => openModal(holeNumber)}
                    >
                    {selectedGolfers[holeNumber] 
                        ? `${selectedGolfers[holeNumber]?.firstName} ${selectedGolfers[holeNumber]?.lastName}`
                        : 'Select Golfer'}
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>

{#if isModalOpen}
    <PickGolferModal onClose={() => isModalOpen = false} onSelect={handleSelect} {selectedGolfers} />
{/if}