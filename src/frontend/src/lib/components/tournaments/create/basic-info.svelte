<script lang="ts">
    interface Props {
        name: string;
    }

    let { name = $bindable("") }: Props = $props();
</script>

<div class="space-y-4 text-black">
    <div>
        <label for="tournamentName" class="block text-sm font-medium text-gray-700">Tournament Name</label>
        <input
            id="tournamentName"
            type="text"
            bind:value={name}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>
</div>