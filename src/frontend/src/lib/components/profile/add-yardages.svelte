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
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        class="absolute inset-0 bg-black bg-opacity-50"
        on:click={handleClose}
      ></button>
      <div class="relative z-10 w-[30vw] bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-4">
          <h2 class="text-3xl text-black condensed">ADD NEW YARDAGE SET</h2>
          <button 
            class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
            on:click={handleClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div class="px-6 pt-2 pb-4">
          <p class="text-sm text-BrandDarkGray">Create a new yardage set to track your performance in various settings. Specify the name of the set to help you manage and optimize your game across different conditions.</p>
        </div>
        <div class="p-6">
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
            class="px-6 py-2 transition-all duration-200 ease-in-out rounded-lg text-BrandForest bg-BrandYellow hover:bg-yellow-400 focus:outline-none"
            on:click={handleClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            class="px-6 py-2 transition-all duration-200 ease-in-out rounded-lg focus:outline-none"
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


