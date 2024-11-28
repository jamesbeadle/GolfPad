<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let isOpen: boolean;
    export let yardageSetName: string;
    
    const dispatch = createEventDispatcher();

    function handleClose() {
      dispatch("close");
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="w-1/3 p-8 bg-white rounded-lg">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-3xl text-black condensed">EDIT YARDAGE NAME</h2>
                <button 
                    class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
                    on:click={handleClose}
                    type="button"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <p class="mb-6 text-sm text-BrandDarkGray">Give it a good one! </p>
            <div>
                <label for="yardageSetName" class="block mb-2 text-sm text-black">NAME</label>
                <input
                  id="yardageSetName"
                  type="text"
                  class="w-full p-3 text-black rounded bg-BrandLightGray"
                  placeholder="Enter"
                  bind:value={yardageSetName}
                />
            </div>
            <div class="flex justify-end mt-6">
                <button
                  on:click={handleClose}
                class="px-6 py-2 mr-4 rounded-md text-BrandForest bg-BrandYellow "
                >
                  CANCEL
                </button>
                <button
                  on:click={handleClose}
                  class="px-6 py-2 rounded-md text-BrandYellow bg-BrandForest"
                >
                  Save
                </button>
            </div>
        </div>
    </div>
{/if}