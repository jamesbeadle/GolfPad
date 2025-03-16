<script lang="ts">
    export let items: any[] = [];
    export let selectedIndex: number = 0;
    export let placeholder: string = "Select an item";
    export let disabled: boolean = false;
    export let onSelect: () => void;

    $: selectedItem = items[selectedIndex] || null;
</script>

<button 
    class="w-full border rounded-lg p-3 bg-white cursor-pointer hover:bg-gray-50"
    class:disabled={disabled}
    on:click={!disabled ? onSelect : undefined}
>
    {#if selectedItem}
        <slot name="selected" {selectedItem}>
            {selectedItem.name || selectedItem}
        </slot>
    {:else}
        <span class="text-gray-500">{placeholder}</span>
    {/if}
</button>