<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { activeDropdownId } from "$lib/stores/dropdown-store";
    import CheckmarkIcon from "$lib/icons/checkmark-icon.svelte";
    import ArrowUpIcon from "$lib/icons/arrow-up-icon.svelte";
    import ArrowDownIcon from "$lib/icons/arrow-down-icon.svelte";
    import SearchIcon from "$lib/icons/search-icon.svelte";

    export let value: string | number | bigint;
    export let options: { id: string | number | bigint; label: string }[];
    export let placeholder = "Select...";
    export let compact = false;
    export let onChange: (value: string | number | bigint) => void;
    export let allOptionText: string | undefined = undefined;
    export let scrollOnOpen = false;
    export let searchOn = false;

    const dropdownId = Math.random().toString(36).substring(7);
    let isDropdownOpen = false;
    let dropdownElement: HTMLDivElement;
    let searchTerm = '';

    activeDropdownId.subscribe((id) => {
        if (id !== dropdownId) {
            isDropdownOpen = false;
        }
    });

    $: allOptions = allOptionText 
        ? [{ id: BigInt(0), label: `All ${allOptionText}` }, ...options]
        : options;
    $: selectedOption = allOptions.find(opt => opt.id === value);
    $: filteredOptions = searchOn 
        ? allOptions.filter(opt => 
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allOptions;

    function toggleDropdown(e: MouseEvent) {
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        if (isDropdownOpen) {
            activeDropdownId.set(dropdownId);
        } else {
            activeDropdownId.set(null);
        }
        if (scrollOnOpen && isDropdownOpen) {
            setTimeout(() => {
                dropdownElement?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 50);
        }
    }

    function selectOption(optionId: string | number | bigint, e: MouseEvent) {
        e.stopPropagation();
        onChange(optionId);
        isDropdownOpen = false;
    }

    function handleClickOutside(event: MouseEvent) {
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
            isDropdownOpen = false;
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', handleClickOutside);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', handleClickOutside);
        }
    });
</script>

<div class="relative w-full px-3 mt-1 md:px-0" bind:this={dropdownElement}>
    <button
        class="flex items-center justify-between border border-BrandDivider w-full rounded-lg {compact ? 'p-3 hover:bg-BrandGray/50' : 'px-2 py-3 bg-white hover:bg-BrandGray'}"
        on:click={e => toggleDropdown(e)}
    >
        <span class="text-BrandDarkGray">{selectedOption?.label ?? placeholder}</span>
        <span class="w-4 h-4">
            {#if isDropdownOpen}
                <ArrowUpIcon fill="black" />
            {:else}
                <ArrowDownIcon fill="black" />
            {/if}
        </span>
    </button>
    
    {#if isDropdownOpen}
        <ul class="absolute z-50 py-1 border border-BrandDivider rounded-lg shadow-lg w-[calc(100%-2rem)] max-h-[200px] overflow-y-auto scrollbar-thin {compact ? 'bg-BrandBlack' : 'bg-white'}">
            {#if searchOn}
                <div class="sticky top-0 z-[100] p-2 bg-white border-b border-BrandLightGray before:content-[''] before:absolute before:inset-0 before:bg-white">
                    <div class="relative flex items-center justify-between px-2 py-1 border rounded border-BrandLightGray">
                        <input
                            type="text"
                            bind:value={searchTerm}
                            placeholder="Search..."
                            class="w-full text-black bg-transparent outline-none"
                        />
                        <SearchIcon className="w-4 h-4" />
                    </div>
                </div>
            {/if}
            
            <div class={searchOn ? "pt-2" : ""}>
                {#each filteredOptions as option}
                    <li class="mb-1">
                        <button 
                            class={`w-full px-4 py-2 text-left rounded-lg flex items-center justify-between ${value === option.id ? "text-BrandYellow" : "text-black hover:bg-BrandYellow"}`}
                            on:click={e => selectOption(option.id, e)}
                        >
                            {option.label}
                            {#if value === option.id}
                                <CheckmarkIcon className="w-4 h-4" />
                            {/if}
                        </button>
                    </li>
                {/each}
            </div>
        </ul>
    {/if}
</div> 