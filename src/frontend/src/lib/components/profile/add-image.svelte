<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import PictureIcon from '$lib/icons/picture-icon.svelte';
    
    export let isOpen = false;
  
    const dispatch = createEventDispatcher();
    let hasFile = false;
    let selectedFile: File | null = null;
    let previewUrl: string | null = null;
    
    let fileInputRef: HTMLInputElement;

    function handleClose() {
      dispatch('close');
    }
  
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        hasFile = true;
        selectedFile = input.files[0];
        previewUrl = URL.createObjectURL(input.files[0]);
      }
    }

    function handleSave() {
      if (selectedFile) {
        dispatch('fileSelect', {
          file: selectedFile,
          preview: previewUrl
        });
        handleClose();
      }
    }

    function triggerFileInput() {
      fileInputRef?.click();
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <button
        class="absolute inset-0 bg-black bg-opacity-50"
        on:click={handleClose}
        type="button"
        aria-label="Close"
      ></button>
      <div class="relative z-10 w-[500px] bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-5">
          <h2 class="text-3xl text-black condensed">UPLOAD IMAGE</h2>
          <button 
            class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
            on:click={handleClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div class="p-8">
          <button 
            type="button"
            class="flex flex-col items-center justify-center w-full p-8 transition-all duration-200 ease-in-out border-2 border-dashed rounded-lg cursor-pointer border-BrandLightGray hover:border-BrandForest"
            on:click={triggerFileInput}
            on:keydown={(e) => e.key === 'Enter' && triggerFileInput()}
          >
            {#if previewUrl}
              <img src={previewUrl} alt="Preview" class="object-cover w-32 h-32 mb-4 rounded" />
              <p class="text-lg font-medium text-gray-500">Click to change image</p>
            {:else}
              <div class="mb-4">
                <PictureIcon className="w-12 h-12 fill-BrandDarkGray" />
              </div>
              <p class="text-lg font-medium text-gray-500">Drag and Drop or Browse</p>
            {/if}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              bind:this={fileInputRef}
              on:change={handleFileChange}
            />
          </button>
        </div>
        <div class="flex justify-end gap-4 p-6">
          <button
            type="button"
            class="px-6 py-2 text-gray-500 transition-all duration-200 ease-in-out rounded-lg bg-BrandYellow hover:bg-yellow-400 focus:outline-none"
            on:click={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-6 py-2 transition-all duration-200 ease-in-out rounded-lg focus:outline-none"
            class:bg-BrandForest={hasFile}
            class:text-BrandYellow={hasFile}
            class:bg-BrandLightGray={!hasFile}
            class:text-BrandDarkGray={!hasFile}
            on:click={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  {/if}
