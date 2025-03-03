<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import CustomDropdown from '$lib/components/shared/dropdown.svelte';
    import { courseStore } from "$lib/stores/course-store";
    import type { GolfCourseDTO, CreateGolfCourseDTO, PaginationFilters, TeeGroup, Hole, TeeInfo } from '../../../../../declarations/backend/backend.did';
    import PictureIcon from '$lib/icons/picture-icon.svelte';
  
    export let isOpen = false;
    export let selectedCourse: GolfCourseDTO | null = null;
    
    const dispatch = createEventDispatcher();
  
    let courses: GolfCourseDTO[] = [];
    let selectedCountry: string | null = null;
    let activeTab: 'SEARCH' | 'ADD_CUSTOM' = 'ADD_CUSTOM';
    let addCustomTab: 'BASIC' | 'ADVANCED' = 'ADVANCED';
    let searchQuery: string = '';

    let courseName: string = "Test Golf Club";
    
    let teeGroups: TeeGroup[] = [];
    let newTeeGroup: TeeGroup = {
        name: "Championship",
        colour: "#000000",
        strokeIndex: 0,
        added: BigInt(Date.now()),
        holes: Array(18).fill(null).map((_, index) => ({
            number: index + 1,
            name: `Hole ${index + 1}`,
            images: [],
            tees: [{
                name: "Championship",
                colour: "#000000",
                yardage: BigInt(350 + (index * 10)),
                par: 4,
                strokeIndex: index + 1
            }]
        }))
    };

    let newTeeInfo = Array(18).fill(null).map((_, index) => ({
        name: "Championship",
        colour: "#000000",
        yardage: 350 + (index * 10),
        par: 4,
        strokeIndex: index + 1
    }));
    
    let courseImage: string | null = null;
    let selectedCopyFrom: TeeGroup | null = null;
    let newTee = false;
    
    onMount(async () => {
      try {
        const filters: PaginationFilters = {
          limit: BigInt(10),
          offset: BigInt(0),
        };
        courses = await courseStore.getCourses(filters);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    });
  
    function handleClose() {
      dispatch('close');
    }
  
    async function handleSave() {
        try {
            if (activeTab === 'SEARCH' && selectedCourse) {
                dispatch('courseSelect', { course: selectedCourse });
                handleClose();
            } 
            else if (activeTab === 'ADD_CUSTOM') {
                if (!courseName || !newTeeGroup.name || !newTeeGroup.colour) {
                    console.error("Course name, tee group name, and tee group color are required");
                    return;
                }

                if (addCustomTab === 'ADVANCED' && !isAdvancedTabFilled()) {
                    console.error("All 18 holes must have complete data");
                    return;
                }

                const createGolfCourseDTO: CreateGolfCourseDTO = {
                    name: courseName,
                    initialTeeGroup: {
                        name: newTeeGroup.name,
                        colour: newTeeGroup.colour,
                        added: BigInt(Date.now()),
                        strokeIndex: newTeeGroup.strokeIndex ?? 0,
                        holes: addCustomTab === 'ADVANCED' 
                            ? newTeeGroup.holes
                            : Array(18).fill(null).map((_, index) => ({
                                number: index + 1,
                                name: `Hole ${index + 1}`,
                                images: [],
                                tees: [{
                                    name: newTeeGroup.name || '',
                                    colour: newTeeGroup.colour || '',
                                    yardage: BigInt(0),
                                    par: 4,
                                    strokeIndex: index + 1
                                }]
                            }))
                    },
                    holes: []
                };

                console.log("Creating Golf Course: ", createGolfCourseDTO);

                await courseStore.createCourse(createGolfCourseDTO);

                const filters = { limit: BigInt(10), offset: BigInt(0) };
                const courses = await courseStore.getCourses(filters);
                const newCourse = courses.find(c => c.name === courseName);
                
                if (newCourse) {
                    dispatch('courseSelect', { course: newCourse });
                }
                handleClose();
            }
        } catch (error) {
            console.error('Error saving course:', error);
        }
    }

    function isAdvancedTabFilled() {
        if (newTeeGroup.holes.length !== 18) {
            console.log("Not enough holes:", newTeeGroup.holes.length);
            return false;
        }

        return newTeeGroup.holes.every((hole, index) => {
            if (hole.number !== index + 1) {
                console.log(`Invalid hole number at index ${index}`);
                return false;
            }

            if (!hole.tees || hole.tees.length === 0) {
                console.log(`No tees for hole ${hole.number}`);
                return false;
            }

            return hole.tees.every(tee => {
                const isValid = 
                    tee.name && 
                    tee.colour && 
                    typeof tee.yardage !== 'undefined' &&
                    typeof tee.par !== 'undefined' &&
                    typeof tee.strokeIndex !== 'undefined';

                if (!isValid) {
                    console.log(`Invalid tee data for hole ${hole.number}:`, tee);
                }

                return isValid;
            });
        });
    }
    function isValid() {
    if (!courseName || !newTeeGroup.name || !newTeeGroup.colour) {
        return false;
    }
    
    if (addCustomTab === 'ADVANCED') {
        return isAdvancedTabFilled();
    }

    return true;
}
</script>
  
{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
       
        <div class="relative z-10 w-full md:w-[80vw] lg:w-[60vw] h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl">
            <div class="flex items-center justify-between p-3 md:p-4">
                <h2 class="text-2xl text-black md:text-3xl condensed">ADD HOME COURSE</h2>
                <button 
                class="cancel-button"
                on:click={handleClose}
                type="button"
                aria-label="Close"
                >
                ✕
                </button>
            </div>
            <div class="px-3 pt-2 pb-2 md:px-6 md:pt-4">
                <p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p>
            </div>

            <div class="flex px-3 pt-4 md:px-6">
                <button
                class="brand-button"
                class:text-BrandForest={activeTab === 'SEARCH'}
                class:text-BrandDarkGray={activeTab !== 'SEARCH'}
                on:click={() => activeTab = 'SEARCH'}
                >
                    SEARCH
                </button>
                <button
                    class="brand-button"
                    class:text-BrandForest={activeTab === 'ADD_CUSTOM'}
                    class:text-BrandDarkGray={activeTab !== 'ADD_CUSTOM'}
                    on:click={() => activeTab = 'ADD_CUSTOM'}
                >
                    ADD CUSTOM
                </button>
            </div>
            <div class="p-3 md:p-6">
                {#if activeTab === 'SEARCH'}
                    <div class="flex flex-col gap-3 mb-3 text-black md:flex-row md:gap-4 md:mb-4">
                        <div class="w-full md:w-1/2">
                            <label for="courseName" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Course Name</label>
                            <input
                                id="courseName"
                                type="text"
                                class="w-full p-2 text-sm text-black rounded md:text-base"
                                class:bg-BrandLightGray={!searchQuery}
                                class:bg-white={searchQuery}
                                placeholder="Search"
                                bind:value={searchQuery}
                            />
                        </div>
                        <div class="w-full md:w-1/2">
                            <label for="country" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Country</label>
                            <CustomDropdown
                                items={[
                                    { value: 'us', name: 'United States' },
                                    { value: 'uk', name: 'United Kingdom' },
                                    { value: 'ca', name: 'Canada' },
                                    { value: 'au', name: 'Australia' }
                                ]}
                                bindSelected={selectedCountry}
                                placeholder="Select Country"
                                searchEnabled={false}
                                multiple={false}
                            />
                        </div>
                    </div>
                    <div class="space-y-2 md:space-y-4">
                        {#each courses.filter(course => course.name.toLowerCase().includes(searchQuery.toLowerCase())) as course}
                            <button 
                                type="button"
                                class="brand-button"
                                on:click={() => selectedCourse = course}
                                on:keydown={(e) => e.key === 'Enter' && (selectedCourse = course)}
                                class:bg-BrandLightGray={selectedCourse === course}
                            >
                                <div class="absolute flex flex-wrap gap-1 top-2 right-2 md:hidden">
                                    {#each course.tees as tee}
                                        <span 
                                            class="px-1.5 py-0.5 text-2xs font-bold text-white rounded-full" 
                                            style="background-color: {tee.colour}"
                                        >
                                            {tee.name}
                                        </span>
                                    {/each}
                                </div>
                                <div class="flex items-center gap-2 md:gap-4">
                                    <div>
                                        <span class="text-xs text-BrandDarkGray md:text-sm">ID</span>
                                        <h3 class="text-base text-black condensed md:text-lg">{course.courseId}</h3>
                                    </div>
                                    <img src="golfCourse.png" alt="Course Thumbnail" class="w-8 h-8 rounded md:w-10 md:h-10" />
                                </div>
                                
                                <div class="flex items-center justify-between flex-1">
                                    <h3 class="text-base text-black condensed md:text-lg">{course.name}</h3>
                                    <div class="flex-wrap hidden gap-2 md:flex">
                                        {#each course.tees as tee}
                                            <span 
                                                class="px-2 py-1 text-xs font-bold text-white rounded-full" 
                                                style="background-color: {tee.colour}"
                                            >
                                                {tee.name}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </button>
                        {/each}
                    </div>
                {:else if activeTab === 'ADD_CUSTOM'}
                    <div class="flex flex-col space-y-6">
                        <div class="flex gap-4">
                            <div class="basis-4/5">
                                <label for="courseNameInput" class="block mb-2 text-sm font-bold">COURSE NAME</label>
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
                                            class="brand-button"
                                        >
                                            UPLOAD
                                        </button>
                                        <span class="text-xs text-BrandDarkGray">800px x 800px min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-4 items-left">
                                <div class="flex items-center gap-4">
                                    <button
                                        class="brand-button"
                                        class:text-BrandForest={addCustomTab === 'BASIC'}
                                        class:text-BrandDarkGray={addCustomTab !== 'BASIC'}
                                        on:click={() => addCustomTab = 'BASIC'}
                                    >
                                        BASIC
                                    </button>
                                    <button
                                        class="brand-button"
                                        class:text-BrandForest={addCustomTab === 'ADVANCED'}
                                        class:text-BrandDarkGray={addCustomTab !== 'ADVANCED'}
                                        on:click={() => addCustomTab = 'ADVANCED'}
                                    >
                                        ADVANCED
                                    </button>
                                </div>
                                <div class="flex flex-row justify-between gap-4">
                                    <div class="flex flex-col px-2">
                                        <label for="addTee" class="block mb-2 text-sm font-bold">TEES</label>
                                        <button
                                            id="addTee"
                                            type="button"
                                            class="brand-button"
                                            on:click={() => {
                                                console.log("All 18 holes are already added");
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        <label for="copyFromTeeGroup" class="block mb-2 text-sm font-bold">COPY FROM EXISTING TEE GROUP</label>
                                        <CustomDropdown
                                            items={teeGroups.map(group => ({
                                                name: group.name,
                                                value: group
                                            }))}
                                            bindSelected={selectedCopyFrom}
                                            placeholder="Select Tee Group"
                                            searchEnabled={true}
                                            multiple={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            {#if addCustomTab === 'BASIC'}
                                <div class="flex gap-4">
                                    <div class="flex-1">
                                        <label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label>
                                        <input
                                            id="teeName"
                                            type="text"
                                            class="w-full p-3 text-black bg-white border border-gray-300 rounded"
                                            bind:value={newTeeGroup.name}
                                            placeholder="Enter"
                                        />
                                    </div>
                                    <div class="flex-1">
                                        <label for="teeColor" class="block mb-2 text-sm font-bold">COLOR</label>
                                        <input
                                            id="teeColor"
                                            type="text"
                                            class="w-full p-3 text-black bg-white border border-gray-300 rounded"
                                            bind:value={newTeeGroup.colour}
                                            placeholder="Enter"
                                        />
                                    </div>
                                </div>
                            {/if}
                            {#if addCustomTab === 'ADVANCED'}
                                <div class="flex flex-col space-y-6">
                                    <div class="flex flex-col gap-4">
                                        <div class="basis-1/2">
                                            <label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label>
                                            <input
                                                id="teeName"
                                                type="text"
                                                class="w-full p-3 text-black bg-white border border-gray-300 rounded"
                                                bind:value={newTeeGroup.name}
                                                placeholder="Enter"
                                            />
                                        </div>
                                        <div class="basis-1/2">
                                            <label for="teeColorPicker" class="block mb-2 text-sm font-bold">COLOR</label>
                                            <div class="flex items-center gap-2">
                                                <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded">
                                                    <input
                                                        id="teeColorPicker"
                                                        type="color"
                                                        class="w-full h-full border-none cursor-pointer"
                                                        bind:value={newTeeGroup.colour}
                                                        on:input={e => {
                                                            newTeeGroup.colour = e.currentTarget.value;
                                                        }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    class="flex-1 p-3 text-black bg-white border border-gray-300 rounded"
                                                    bind:value={newTeeGroup.colour}
                                                    placeholder="Hex code"
                                                    on:input={e => {
                                                        newTeeGroup.colour = e.currentTarget.value;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                            <div class="flex justify-end">
                                <button
                                    type="button"
                                    class="brand-button"
                                    class:bg-BrandLightGray={!newTeeGroup.name || !newTeeGroup.colour}
                                    class:text-BrandDarkGray={!newTeeGroup.name || !newTeeGroup.colour}
                                    class:bg-BrandForest={newTeeGroup.name && newTeeGroup.colour}
                                    class:text-BrandYellow={newTeeGroup.name && newTeeGroup.colour}
                                    disabled={!newTeeGroup.name || !newTeeGroup.colour}
                                    on:click={() => newTee = true}
                                >
                                    CREATE TEE
                                </button>
                            </div>
                            {#if newTee}
                                <div class="overflow-x-auto">
                                    <div class="overflow-y-auto max-h-[50vh]">
                                        <table class="min-w-full bg-white border-collapse">
                                        <thead>
                                            <tr>
                                            <th class="p-4 text-xl text-left border-b condensed text-Black">HOLE</th>
                                            <th class="p-4 text-xl text-left border-b condensed text-Black">PAR</th>
                                            <th class="p-4 text-xl text-left border-b condensed text-Black">S.I.</th>
                                            <th class="p-4 text-xl text-left border-b condensed text-Black">YARDS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {#each newTeeInfo as teeInfo, index}
                                            <tr class="hover:bg-BrandLightGray">
                                                <td class="p-4 text-lg border-b condensed">{index + 1}</td>
                                                <td class="p-4 border-b">
                                                <input
                                                    type="text"
                                                    class="w-full p-2 text-black border rounded"
                                                    class:bg-BrandLightGray={!newTeeInfo[index].par}
                                                    class:bg-white={newTeeInfo[index].par}
                                                    placeholder="Enter"
                                                    bind:value={newTeeInfo[index].par}
                                                />
                                                </td>
                                                <td class="p-4 border-b">
                                                <input
                                                    type="text"
                                                    class="w-full p-2 text-black border rounded"
                                                    class:bg-BrandLightGray={!newTeeInfo[index].strokeIndex}
                                                    class:bg-white={newTeeInfo[index].strokeIndex}
                                                    placeholder="Enter"
                                                    bind:value={newTeeInfo[index].strokeIndex}
                                                />
                                                </td>
                                                <td class="p-4 border-b">
                                                <input
                                                    type="text"
                                                    class="w-full p-2 text-black border rounded"
                                                    class:bg-BrandLightGray={!newTeeInfo[index].yardage}
                                                    class:bg-white={newTeeInfo[index].yardage}
                                                    placeholder="Enter"
                                                    bind:value={newTeeInfo[index].yardage}
                                                />
                                                </td>
                                            </tr>
                                            {/each}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
            <div class="flex justify-end gap-3 p-3 border-t md:p-4 md:border-t-0">
                <button
                class="cancel-button"
                on:click={handleClose}
                >
                CANCEL
                </button>
                <button
                    type="button"
                    class="brand-button"
                    class:bg-BrandLightGray={!isValid()}
                    class:text-BrandDarkGray={!isValid()}
                    class:bg-BrandForest={isValid()}
                    class:text-BrandYellow={isValid()}
                    on:click={handleSave}
                >
                    ADD COURSE
                </button>
            </div>
        </div>
    </div>
{/if}
  