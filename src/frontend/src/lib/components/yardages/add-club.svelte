<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    let clubName = "";
    let yardage: number | null = null;
    export let isOpen: boolean;
    const dispatch = createEventDispatcher();
  
    function handleClose() {
      dispatch("close");
    }
  
    function addClub() {
      if (clubName && yardage) {
        dispatch("addClub", { clubName, yardage });
        close();
      }
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-1/3 p-8 bg-white rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-3xl text-black condensed">ADD GOLF CLUB</h2>
          <button 
            class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
            on:click={handleClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p class="mb-6 text-sm text-BrandDarkGray">To tailor your yardage set, please enter the name of your golf club and its corresponding yardage. This information will help you track and optimize your game.</p>
  
        <div class="mb-4">
          <label for="clubName" class="block mb-2 text-sm text-black">CLUB NAME</label>
          <input
            id="clubName"
            type="text"
            placeholder="e.g. Driver"
            bind:value={clubName}
            class="w-full p-2 rounded-md bg-BrandLightGray"
          />
        </div>
  
        <div class="mb-4">
          <label for="yardage" class="block mb-2 text-sm text-black">YARDAGE</label>
          <input
            id="yardage"
            type="number"
            placeholder="Enter"
            bind:value={yardage}
            class="w-full p-2 rounded-md bg-BrandLightGray"
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
            on:click={addClub}
            class="px-6 py-2 rounded-md text-BrandYellow bg-BrandForest"
            disabled={!clubName || yardage === null}
          >
            ADD CLUB
          </button>
        </div>
      </div>
    </div>
  {/if}
  