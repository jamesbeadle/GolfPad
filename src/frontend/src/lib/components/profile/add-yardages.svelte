<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { yardagesStore } from "$lib/stores/yardages-store";
    import type { CreateYardageSetDTO } from "../../../../../declarations/backend/backend.did";
    
    export let isOpen = false;
  
    const dispatch = createEventDispatcher();
    let yardageSetName = "";
  
    function handleClose() {
      dispatch('close');
    }
  
    async function handleAddSet() {
      if (yardageSetName.trim() !== "") {
       
        const dto: CreateYardageSetDTO = {
          name: yardageSetName,
          clubs: [],
        };
        try {
          await yardagesStore.createYardageSet(dto);
          console.log("Yardage Set Created");
          handleClose();
        } catch (error) {
          console.error("Error Creating Yardage Set", error);
        }
      }
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <button
        type="button"
        class="absolute inset-0 bg-black bg-opacity-50"
        on:click={handleClose}
      ></button>
      <div class="relative z-10 w-full sm:w-[90vw] md:w-[60vw] lg:w-[30vw] bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-4">
          <h2 class="text-xl text-black sm:text-2xl md:text-3xl condensed">ADD NEW YARDAGE SET</h2>
          <button 
            class="flex items-center justify-center text-base font-bold text-white bg-black rounded-full shadow-md w-7 h-7 sm:w-8 sm:h-8"
            on:click={handleClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div class="px-4 pt-2 pb-4 sm:px-6">
          <p class="text-sm text-BrandDarkGray">Create a new yardage set to track your performance in various settings. Specify the name of the set to help you manage and optimize your game across different conditions.</p>
        </div>
        <div class="p-4 sm:p-6">
          <div class="flex flex-col gap-4">
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
          </div>
        </div>
        <div class="flex justify-end gap-3 p-4">
          <button
            class="px-4 py-2 text-sm transition-all duration-200 ease-in-out rounded-lg sm:px-6 sm:text-base text-BrandForest bg-BrandYellow hover:bg-yellow-400 focus:outline-none"
            on:click={handleClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm transition-all duration-200 ease-in-out rounded-lg sm:px-6 sm:text-base focus:outline-none"
            class:bg-BrandForest={yardageSetName.trim() !== ""}
            class:text-BrandYellow={yardageSetName.trim() !== ""}
            class:bg-BrandLightGray={yardageSetName.trim() === ""}
            class:text-BrandDarkGray={yardageSetName.trim() === ""}
            disabled={yardageSetName.trim() === ""}
            on:click={handleAddSet}
          >
            ADD SET
          </button>
        </div>
      </div>
    </div>
  {/if}


