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

    let courseName: string = "";
    let teeGroups: TeeGroup[] = [];
    let newTeeGroup: Omit<Partial<TeeGroup>, 'holes'> & { holes: Hole[] } = {
        name: "",
        colour: "",
        strokeIndex: 0,
        holes: [],
    };

    let holeNumber: number = 1;
    let newHole: Hole = {
        number: holeNumber,
        tees: [],
        name: "",
        images: [],
    };

    interface TeeInfoForm {
        name: string;
        colour: string;
        yardage: bigint | null;
        par: number | null;
        strokeIndex: number | null;
    }

    let newTeeInfo: TeeInfoForm[] = Array.from({ length: 18 }, () => ({
        name: "",
        colour: "",
        yardage: null,
        par: null,
        strokeIndex: null,
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
  
    function handleSave() {
      if (selectedCourse) {
        dispatch('courseSelect', { course: selectedCourse });
        handleClose();
      }
    }

    async function handleAddCourse() {
    if (!courseName || !newTeeGroup.name || !newTeeGroup.colour) {
      console.error("Course name, tee group name, and tee group color are required");
      return;
    }

    const createGolfCourseDTO: CreateGolfCourseDTO = {
      name: courseName,
      initialTeeGroup: {
        name: newTeeGroup.name,
        colour: newTeeGroup.colour,
        added: BigInt(Date.now()),
        strokeIndex: newTeeGroup.strokeIndex ?? 0,
        holes: newTeeGroup.holes ?? [],
      },
      holes: [],
    };

    console.log("Creating Golf Course: ", createGolfCourseDTO);

    try {
      await courseStore.createCourse(createGolfCourseDTO);
      handleClose();
    } catch (err) {
      console.error("Error creating course: ", err);
    }
  }

  function isAdvancedTabFilled() {
    return newTeeGroup.holes.length === 18 && newTeeGroup.holes.every(hole => 
        hole.tees.every(tee => newTeeInfo[hole.number - 1].par !== null && newTeeInfo[hole.number - 1].strokeIndex !== null && newTeeInfo[hole.number - 1].yardage !== null)
    );
}
</script>
  
{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <button
            type="button"
            class="absolute inset-0 bg-black bg-opacity-50"
            on:click={handleClose}
        ></button>

        <div class="relative z-10 w-[60vw] h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl">
            <div class="flex items-center justify-between p-4">
                <h2 class="text-3xl text-black condensed">ADD HOME COURSE</h2>
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

            <div class="flex px-6 pt-4">
                <button
                class="px-4 py-2 text-xl condensed"
                class:text-BrandForest={activeTab === 'SEARCH'}
                class:text-BrandDarkGray={activeTab !== 'SEARCH'}
                on:click={() => activeTab = 'SEARCH'}
                >
                    SEARCH
                </button>
                <button
                    class="px-4 py-2 text-xl condensed"
                    class:text-BrandForest={activeTab === 'ADD_CUSTOM'}
                    class:text-BrandDarkGray={activeTab !== 'ADD_CUSTOM'}
                    on:click={() => activeTab = 'ADD_CUSTOM'}
                >
                    ADD CUSTOM
                </button>
            </div>
            <div class="p-6">
                {#if activeTab === 'SEARCH'}
                    <div class="flex gap-4 mb-4 text-black">
                        <div class="flex-grow w-1/2">
                            <label for="courseName" class="block mb-1 text-sm font-medium text-BrandDarkGray">Course Name</label>
                            <input
                                id="courseName"
                                type="text"
                                class="w-full p-2 text-black rounded"
                                class:bg-BrandLightGray={!searchQuery}
                                class:bg-white={searchQuery}
                                placeholder="Search"
                                bind:value={searchQuery}
                            />
                        </div>
                        <div class="flex-grow w-1/2">
                            <label for="country" class="block mb-1 text-sm font-medium text-BrandDarkGray">Country</label>
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
                    <div class="space-y-4">
                        {#each courses.filter(course => course.name.toLowerCase().includes(searchQuery.toLowerCase())) as course}
                            <button 
                                type="button"
                                class="flex items-center w-full gap-4 p-4 text-left border rounded-lg cursor-pointer hover:bg-BrandLightGray"
                                on:click={() => selectedCourse = course}
                                on:keydown={(e) => e.key === 'Enter' && (selectedCourse = course)}
                                class:bg-BrandLightGray={selectedCourse === course}
                            >
                                <div class="pr-2">
                                    <label for="courseId" class="block mb-1 text-sm font-medium text-BrandDarkGray">ID</label>
                                    <h3 class="text-lg text-black condensed">{course.courseId}</h3>
                                </div>
                                <img src="golfCourse.png" alt="Course Thumbnail" class="w-10 h-10 rounded" />
                                <div class="flex-grow">
                                    <h3 class="text-lg text-black condensed">{course.name}</h3>
                                </div>
                                <div class="flex gap-2">
                                    {#each course.tees as tee}
                                        <span class="px-2 py-1 text-xs font-bold text-black rounded-full" style="background-color: {tee.colour}">{tee.name}</span>
                                    {/each}
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
                                            class="flex items-center px-6 py-3 text-sm font-bold rounded text-BrandForest bg-BrandYellow hover:bg-yellow-600"
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
                                        class="px-4 pt-5 text-xl condensed"
                                        class:text-BrandForest={addCustomTab === 'BASIC'}
                                        class:text-BrandDarkGray={addCustomTab !== 'BASIC'}
                                        on:click={() => addCustomTab = 'BASIC'}
                                    >
                                        BASIC
                                    </button>
                                    <button
                                        class="pt-5 text-xl condensed"
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
                                            class="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full text-BrandForest bg-BrandYellow"
                                            on:click={() => {
                                                newTeeGroup.holes.push({...newHole, number: holeNumber++});
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
                                    class="px-6 py-2 font-bold transition-all duration-200 ease-in-out rounded"
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
                            <!-- {#if newTee} -->
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
                            <!-- {/if} -->
                        </div>
                    </div>
                {/if}
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
                    class:bg-BrandForest={selectedCourse || (activeTab === 'ADD_CUSTOM' && addCustomTab === 'ADVANCED' && isAdvancedTabFilled())}
                    class:text-BrandYellow={selectedCourse || (activeTab === 'ADD_CUSTOM' && addCustomTab === 'ADVANCED' && isAdvancedTabFilled())}
                    class:bg-BrandLightGray={!selectedCourse && !(activeTab === 'ADD_CUSTOM' && addCustomTab === 'ADVANCED' && isAdvancedTabFilled())}
                    class:text-BrandDarkGray={!selectedCourse && !(activeTab === 'ADD_CUSTOM' && addCustomTab === 'ADVANCED' && isAdvancedTabFilled())}
                    disabled={!selectedCourse && !(activeTab === 'ADD_CUSTOM' && addCustomTab === 'ADVANCED' && isAdvancedTabFilled())}
                    on:click={handleSave}
                >
                    ADD COURSE
                </button>
            </div>
        </div>
    </div>
{/if}
  