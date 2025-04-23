<script lang="ts">
    import type { CountryId } from "../../../../../../declarations/backend/backend.did";
    import { countries } from "$lib/types/countries";

    interface Props {
        firstName: string;
        lastName: string;
        nationality: CountryId;
    }

    let { firstName = $bindable(""), lastName = $bindable(""), nationality = $bindable(0) }: Props = $props();
</script>

<div class="space-y-4">
    <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input
            id="firstName"
            type="text"
            bind:value={firstName}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>

    <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input
            id="lastName"
            type="text"
            bind:value={lastName}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        />
    </div>

    <div>
        <label for="nationality" class="block text-sm font-medium text-gray-700">Nationality</label>
        <select
            id="nationality"
            bind:value={nationality}
            class="block w-full p-2 mt-1 border rounded-md shadow-sm border-BrandDivider focus:ring-BrandForest focus:border-BrandForest"
            required
        >
            <option value="0">Select nationality</option>
            {#each countries as country}
                <option value={country.id}>{country.countryName}</option>
            {/each}
        </select>
    </div>
</div>