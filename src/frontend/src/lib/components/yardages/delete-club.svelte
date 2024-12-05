<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let isOpen: boolean;
    const dispatch = createEventDispatcher();

    function handleClose() {
      dispatch("close");
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 sm:p-0">
        <div class="w-full sm:w-[90vw] md:w-[60vw] lg:w-1/3 p-4 sm:p-8 bg-white rounded-lg">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl text-black sm:text-2xl md:text-3xl condensed">REMOVE GOLF CLUB</h2>
                <button 
                    class="flex items-center justify-center text-base font-bold text-white bg-black rounded-full shadow-md w-7 h-7 sm:w-8 sm:h-8"
                    on:click={handleClose}
                    type="button"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <p class="mb-6 text-sm text-BrandDarkGray">Are you sure you want to delete this golf club from your yardage set?</p>
            <div class="flex justify-end gap-3 mt-6 sm:gap-4">
                <button
                  on:click={handleClose}
                  class="px-4 py-2 text-sm rounded-md sm:px-6 sm:text-base text-BrandForest bg-BrandYellow"
                >
                  CANCEL
                </button>
                <button
                  on:click={handleClose}
                  class="px-4 py-2 text-sm rounded-md sm:px-6 sm:text-base text-BrandYellow bg-BrandForest"
                >
                  DELETE
                </button>
              </div>
        </div>
    </div>
{/if}