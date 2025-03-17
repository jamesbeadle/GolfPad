<script lang="ts">
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { userStore } from "$lib/stores/user-store";
    import { countries } from "$lib/types/countries";
    import type { CountryId, GolfCourseId, GolfCourseSummary, GolfCourseVersion, RemoveUserGolfCourse } from "../../../../../declarations/backend/backend.did";
    import Modal from "../shared/modal.svelte";
    import SelectCourseRow from "./select-course-row.svelte";

    export let selectCourse: (courseId: GolfCourseId, courseVersion: GolfCourseVersion) => void;
    export let onClose: () => void;
    export let showModal: boolean;
    
    let favouriteCourses: GolfCourseSummary[] = [];

    let searchTerm: string = '';
    let selectedCountryId: CountryId = 0;
    
    function updateFilteredCourses() {
        favouriteCourses = favouriteCourses.filter(course => {
            const matchesName = course.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            const matchesCountry = selectedCountryId === 0 || course.countryId === selectedCountryId;
            return matchesName && matchesCountry;
        });
    }

    function searchCourse(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            searchTerm = (event.target as HTMLInputElement).value;
            updateFilteredCourses();
        }
    }

    async function removeFavourite(courseId: GolfCourseId) {
        try{
            let dto: RemoveUserGolfCourse = { 
                golfCourseId: courseId, 
                principalId: $authStore.identity?.getPrincipal().toString() ?? "" 
            }
            await userStore.removeUserGolfCourse(dto);
            favouriteCourses = favouriteCourses.filter(course => course.id !== courseId);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error removing course from user favourites.'})
        } finally {
            //todo flag when loading
        }
    }

    $: if (selectedCountryId) {
        updateFilteredCourses();
    }
</script>

<Modal {showModal} {onClose}>
    <div class="container">
        <p class="title">SELECT COURSE</p>
        
        <div class="flex flex-row gap-4 mb-4">
            <div class="w-1/2 flex flex-col">
                <p class="label">COURSE NAME:</p>
                <input 
                    type="text" 
                    on:keypress={searchCourse}
                    placeholder="Search courses..."
                    class="border p-2 rounded"
                />
            </div>
            <div class="w-1/2">
                <p class="label">COUNTRY:</p>
                <select 
                    bind:value={selectedCountryId}
                    class="border p-2 rounded w-full"
                >
                    <option value="0">SELECT COUNTRY</option>
                    {#each countries as country}
                        <option value={country.id}>
                            {country.countryName}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
    
        {#if favouriteCourses.length > 0}
            <div class="courses-list mb-4">
                {#each favouriteCourses as course}
                    <div class="course-item">
                        {course.name}
                        <button 
                            on:click={() => selectCourse(course.id, course.version)}
                            class="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Add
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    
        <p class="title">Favourite Courses</p>
        {#if favouriteCourses.length === 0}
            <p class="text-gray-500">No favourite courses yet</p>
        {:else}
            {#each favouriteCourses as golfCourse}
                <div class="flex items-center">
                    <SelectCourseRow {golfCourse} {selectCourse}/>
                    <button 
                        on:click={() => removeFavourite(golfCourse.id)}
                        class="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            {/each}
        {/if}
    </div>

</Modal>