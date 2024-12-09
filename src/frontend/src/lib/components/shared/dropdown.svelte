<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let items: { name: string; value: any }[] = [];
    export let bindSelected: { name: string; value: any } | { name: string; value: any }[] | null = null;
    export let placeholder = "Select an Option";
    export let multiple = false;
    export let searchEnabled = false;

    let searchTerm = "";
    let showDropdown = false;

    const dispatch = createEventDispatcher();

    $: filteredItems = items.filter(item => item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    function selectItem(item: { name: string; value: any }) {
        if (multiple) {
            if (Array.isArray(bindSelected)) {
                if (bindSelected.find(selected => selected.value === item.value)) {
                    bindSelected = bindSelected.filter(selected => selected.value !== item.value);
                } else {
                    bindSelected = [...bindSelected, item];
                }
            } else {
                bindSelected = [item];
            }
        } else {
            bindSelected = item;
            showDropdown = false; 
        }

        dispatch('select', { value: multiple ? bindSelected : item });
    }

    function isSelected(item: { name: string; value: any }): boolean {
        if (multiple && Array.isArray(bindSelected)) {
            return !!bindSelected.find(selected => selected.value === item.value);
        } else if (!multiple && bindSelected && typeof bindSelected === 'object' && 'value' in bindSelected) {
            return bindSelected.value === item.value;
        }
        return false;
    }

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }
</script>

<div class="relative w-full">
    <button 
        type="button"
        class="w-full p-2 text-left border border-gray-300 rounded-md cursor-pointer"
        on:click={toggleDropdown}
        on:keydown={e => e.key === 'Enter' && toggleDropdown()}
    >
        {#if multiple && Array.isArray(bindSelected) && bindSelected.length > 0}
            <span>{bindSelected.map(item => item.name).join(', ')}</span>
        {:else if (!multiple && bindSelected && typeof bindSelected === 'object' && 'name' in bindSelected)}
            <span>{bindSelected.name}</span>
        {:else}
            <span class="text-gray-400">{placeholder}</span>
        {/if}
    </button>

    {#if showDropdown}
        <div class="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded shadow max-h-60">
            {#if searchEnabled}
                <input 
                    type="text" 
                    bind:value={searchTerm} 
                    class="w-full p-2 border-b border-gray-300" 
                    placeholder="Search..." 
                />
            {/if}
            {#each filteredItems as item (item.value)}
                <div
                    class="p-2 cursor-pointer hover:bg-gray-200"
                    on:click={() => selectItem(item)}
                    on:keydown={e => e.key === 'Enter' && selectItem(item)}
                    role="button"
                    tabindex="0"
                >
                    {item.name} {#if isSelected(item)}✔{/if}
                </div>
            {/each}
        </div>
    {/if}
</div>
