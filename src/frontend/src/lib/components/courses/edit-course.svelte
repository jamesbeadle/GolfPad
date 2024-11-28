<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import CustomDropdown from '$lib/components/shared/dropdown.svelte';
    import PictureIcon from '$lib/icons/picture-icon.svelte';

    export let isOpen = false;
    export let holes: Array<{ hole: number, par: number, strokeIndex: number, yards: number }> = [];
    export let courseName: string = '';
    export let courseImage: string = '';
    const dispatch = createEventDispatcher();

    function handleClose() {
        dispatch('close');
    }

    function handleSave() {
        dispatch('save', { holes });
    }

</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <button
            type="button"
            class="absolute inset-0 bg-black bg-opacity-50"
            on:click={handleClose}
        ></button>

        <div class="relative z-50 w-[60vw] overflow-y-auto bg-white rounded-lg">
            <div class="flex items-center justify-between p-4">
                <h2 class="text-3xl text-black condensed">EDIT HOME COURSE</h2>
                <button 
                    class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
                    on:click={handleClose}
                    type="button"
                    aria-label="Close"
                >
                ✕
                </button>
            </div>
            <div class="px-6 pt-4 pb-2">
                <p class="text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p>
            </div>
            <div class="px-4 pt-4 basis-4/5">
                <label for="courseNameInput" class="block mb-2 text-sm font-bold text-BrandDarkGray">COURSE NAME</label>
                <input
                    id="courseNameInput"
                    type="text"
                    class="w-full p-3 text-black bg-white border border-gray-300 rounded"
                    bind:value={courseName}
                    placeholder="Enter Course Name"
                />
            </div>
            <div class="basis-1/5">
                <label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label>
                <div class="flex items-center gap-1">
                    {#if courseImage}
                        <img 
                            src={courseImage} 
                            alt="Course thumbnail" 
                            class="object-cover w-16 h-16 rounded"
                        />
                    {:else}
                        <div class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray">
                            <PictureIcon className="w-6 h-6 fill-black" />
                        </div>
                    {/if}
                    <div class="flex items-center gap-2">
                        <button
                            id="courseImageUpload"
                            type="button"
                            class="flex items-center px-6 py-3 text-sm font-bold rounded text-BrandForest bg-BrandYellow hover:bg-yellow-600"
                        >
                            UPLOAD
                        </button>
                        <span class="text-xs text-BrandDarkGray">800px x 800px min</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}