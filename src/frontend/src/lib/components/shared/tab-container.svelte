<script lang="ts">
    import DropdownSelect from "./dropdown-select.svelte";
    
    interface Props {
        filterType: string;
        setActiveTab: (tabName: string) => Promise<void>;
        tabs: { id: string; label: string }[];
        compact: boolean;
    }

    let { filterType, setActiveTab, tabs, compact } : Props = $props();

    function handleTabChange(value: string | number) {
        setActiveTab(value.toString());
    }
</script>

<div class="flex w-full">
    <ul class="hidden w-full rounded-t-lg md:flex">
        {#each tabs as tab}
            <li class={`mr-3 ${filterType === tab.id ? "active-tab" : ""}`}>
                <button 
                    class={`p-2 ${filterType === tab.id ? "text-white" : "text-gray-400"}`}
                    on:click={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            </li>
        {/each}
    </ul>
    <div class="w-full md:hidden">
        <DropdownSelect
            value={filterType}
            options={tabs}
            onChange={handleTabChange}
            {compact}
        />
    </div>
</div>