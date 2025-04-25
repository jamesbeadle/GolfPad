<script lang="ts">
    import type { GolfHole } from "../../../../../../declarations/backend/backend.did";

    interface Props {
        holes: GolfHole[];
        updateHole: (index: number, field: keyof GolfHole, value: number) => void;
    }

    let { holes = $bindable([]), updateHole }: Props = $props();
</script>

<div class="mt-8">
    <h3 class="text-lg font-semibold text-gray-900">Hole Details</h3>
    <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {#each holes as hole, index}
            <div class="p-4 bg-white rounded-md shadow">
                <h4 class="font-medium text-center text-gray-900">Hole {hole.holeNumber}</h4>
                <div class="mt-2 space-y-2">
                    <div>
                        <label for={`par-${index}`} class="block text-xs text-gray-500">Par</label>
                        <input
                            id={`par-${index}`}
                            type="number"
                            min="3"
                            max="5"
                            bind:value={hole.par}
                            onchange={(e: Event) => updateHole(index, 'par', parseInt((e.target as HTMLInputElement).value))}
                            class="block w-full p-1 text-center border rounded border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                        />
                    </div>
                    <div>
                        <label for={`yardage-${index}`} class="block text-xs text-gray-500">Yardage</label>
                        <input
                            id={`yardage-${index}`}
                            type="number"
                            min="100"
                            max="700"
                            bind:value={hole.yardage}
                            onchange={(e: Event) => updateHole(index, 'yardage', parseInt((e.target as HTMLInputElement).value))}
                            class="block w-full p-1 text-center border rounded border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                        />
                    </div>
                    <div>
                        <label for={`strokeIndex-${index}`} class="block text-xs text-gray-500">Stroke Index</label>
                        <input
                            id={`strokeIndex-${index}`}
                            type="number"
                            min="1"
                            max="18"
                            bind:value={hole.strokeIndex}
                            onchange={(e: Event) => updateHole(index, 'strokeIndex', parseInt((e.target as HTMLInputElement).value))}
                            class="block w-full p-1 text-center border rounded border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
                        />
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>