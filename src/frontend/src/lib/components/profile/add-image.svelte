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
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      
      <div class="relative z-10 w-full sm:w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-4 sm:p-5">
          <h2 class="text-2xl text-black sm:text-3xl condensed">UPLOAD IMAGE</h2>
          <button 
            class="cancel-button"
            on:click={handleClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div class="p-4 sm:p-8">
          <button 
            type="button"
            class="brand-button"
            on:click={triggerFileInput}
            on:keydown={(e) => e.key === 'Enter' && triggerFileInput()}
          >
            {#if previewUrl}
              <img src={previewUrl} alt="Preview" class="object-cover w-24 h-24 mb-4 rounded sm:w-32 sm:h-32" />
              <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Click to change image</p>
            {:else}
              <div class="mb-4">
                <PictureIcon className="w-10 h-10 sm:w-12 sm:h-12 fill-BrandDarkGray" />
              </div>
              <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Drag and Drop or Browse</p>
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
        <div class="flex justify-end gap-3 p-4 sm:gap-4 sm:p-6">
          <button
            type="button"
            class="cancel-button"
            on:click={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            class="brand-button"
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
