<script lang="ts">
    import type { Readable } from 'svelte/store';

    export let activeTab: string;
    export let tabs: string[];
    export let title: string;

    function handleTabClick(tab: string) {
        activeTab = tab;
    }
</script>

<div class="w-full">
    <div class="flex items-center justify-between px-8 pt-4">
        <h2 class="text-5xl text-black md:text-4xl condensed">{title}</h2>
        <div class="justify-end hidden md:flex">
            {#each tabs as tab}
                <button
                    class="px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md {tab === tabs[0] ? 'rounded-r-none' : ''} {activeTab === tab ? 'bg-BrandForest' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                    on:click={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            {/each}
        </div>
    </div>
    <slot></slot>
    <div class="sticky bottom-0 left-0 right-0 z-10 flex w-full bg-white md:hidden">
        {#each tabs as tab}
            <button
                class="flex-1 py-2 text-xl condensed {activeTab === tab ? 'bg-BrandForest text-BrandYellow' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                on:click={() => handleTabClick(tab)}
            >
                {tab}
            </button>
        {/each}
    </div>
</div>