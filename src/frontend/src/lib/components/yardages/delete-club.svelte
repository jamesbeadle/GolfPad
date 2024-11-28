<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let isOpen: boolean;
    const dispatch = createEventDispatcher();

    function handleClose() {
      dispatch("close");
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="w-1/3 p-8 bg-white rounded-lg">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-3xl text-black condensed">REMOVE GOLF CLUB</h2>
                <button 
                    class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
                    on:click={handleClose}
                    type="button"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <p class="mb-6 text-sm text-BrandDarkGray">Are you sure you want to delete this golf club from your yardage set?</p>
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
                  DELETE
                </button>
              </div>
        </div>
    </div>
{/if}