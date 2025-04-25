<script lang="ts">
    interface Props {
        courseName: string;
        founded: bigint;
        countryId: number;
        countries: Array<{id: number, countryName: string}>;
    }

    let { courseName = $bindable(""), founded = $bindable(0n), countryId = $bindable(0), countries }: Props = $props();
</script>

<div class="space-y-4">
    <div>
        <label for="courseName" class="block text-sm font-medium text-gray-700">Course Name</label>
        <input
            id="courseName"
            type="text"
            bind:value={courseName}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>

    <div>
        <label for="founded" class="block text-sm font-medium text-gray-700">Year Founded</label>
        <input
            id="founded"
            type="number"
            bind:value={founded}
            min="1800"
            max={new Date().getFullYear()}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>

    <div>
        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
        <select
            id="country"
            bind:value={countryId}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        >
            <option value="0">Select a country</option>
            {#each countries as country}
                <option value={country.id}>{country.countryName}</option>
            {/each}
        </select>
    </div>
</div>