<script lang="ts">
    interface Props {
        worldRanking: number;
    }

    let { worldRanking = $bindable(0) }: Props = $props();
</script>

<div class="p-4 rounded-md bg-gray-50">
    <h3 class="text-lg font-medium text-gray-900">Ranking Information</h3>
    <div class="mt-4">
        <label for="worldRanking" class="block text-sm font-medium text-gray-700">World Ranking</label>
        <input
            id="worldRanking"
            type="number"
            bind:value={worldRanking}
            min="1"
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>
</div>