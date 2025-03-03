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

    function isValid(): boolean {
        return courseName.trim().length > 0;
    }

</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
               <div class="relative z-50 w-full md:h-auto md:w-[60vw] overflow-y-auto bg-white rounded-lg">
            <div class="sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b md:p-4">
                <h2 class="text-2xl text-black md:text-3xl condensed">EDIT HOME COURSE</h2>
                <button 
                    class="flex items-center justify-center w-8 h-8 text-base font-bold text-white bg-black rounded-full shadow-md"
                    on:click={handleClose}
                    type="button"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <div class="p-3 md:p-6">
                <p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p>
                <div class="mt-4 md:mt-6">
                    <label for="courseNameInput" class="block mb-2 text-sm font-bold text-BrandDarkGray">COURSE NAME</label>
                    <input
                        id="courseNameInput"
                        type="text"
                        class="w-full p-3 text-black bg-white border border-gray-300 rounded"
                        bind:value={courseName}
                        placeholder="Enter Course Name"
                    />
                </div>
                <div class="mt-4 md:mt-6">
                    <label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label>
                    <div class="flex items-center gap-2">
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
                        <div class="flex flex-col gap-1">
                            <button
                                id="courseImageUpload"
                                type="button"
                                class="px-4 py-2 text-sm font-bold rounded md:px-6 md:py-3 text-BrandForest bg-BrandYellow hover:bg-yellow-600"
                            >
                                UPLOAD
                            </button>
                            <span class="text-2xs md:text-xs text-BrandDarkGray">800px x 800px min</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sticky bottom-0 flex justify-end gap-2 p-3 bg-white border-t md:p-4">
                <button
                    class="flex-1 px-4 py-2 text-sm transition-all duration-200 ease-in-out rounded-lg md:text-base md:flex-initial md:px-6 text-BrandForest bg-BrandYellow hover:bg-yellow-400 focus:outline-none"
                    on:click={handleClose}
                >
                    CANCEL
                </button>
                <button
                    type="button"
                    class="flex-1 px-4 py-2 text-sm font-bold transition-all duration-200 ease-in-out rounded md:text-base md:flex-initial md:px-6"
                    class:bg-BrandLightGray={!isValid()}
                    class:text-BrandDarkGray={!isValid()}
                    class:bg-BrandForest={isValid()}
                    class:text-BrandYellow={isValid()}
                    on:click={handleSave}
                >
                    SAVE CHANGES
                </button>
            </div>
        </div>
    </div>
{/if}