<script lang="ts">
	import { getCourseImage } from '$lib/derived/user.derived';
    import Layout from "../../Layout.svelte";
    import { onMount } from 'svelte';
    import { courseStore } from '$lib/stores/course-store';
    import type { GolfCourseDTO, PaginationFilters } from '../../../../../declarations/backend/backend.did.d.ts';
    import { page } from '$app/stores';
    import EditCourse from '$lib/components/courses/edit-course.svelte';

    let course: GolfCourseDTO | null = null;
    let editCourseIsOpen = false;

    let holes = [
        { hole: 1, par: 4, strokeIndex: 8, yards: 400 },
        { hole: 2, par: 4, strokeIndex: 3, yards: 340 },
        { hole: 3, par: 3, strokeIndex: 12, yards: 200 },
        { hole: 4, par: 4, strokeIndex: 6, yards: 320 },
        { hole: 5, par: 5, strokeIndex: 1, yards: 480 },
        { hole: 6, par: 3, strokeIndex: 5, yards: 220 },
        { hole: 7, par: 4, strokeIndex: 11, yards: 370 },
        { hole: 8, par: 4, strokeIndex: 2, yards: 350 },
        { hole: 9, par: 4, strokeIndex: 7, yards: 420 },
        { hole: 10, par: 5, strokeIndex: 9, yards: 500 },
        { hole: 11, par: 4, strokeIndex: 14, yards: 310 },
        { hole: 12, par: 3, strokeIndex: 18, yards: 190 },
        { hole: 13, par: 5, strokeIndex: 4, yards: 530 },
        { hole: 14, par: 4, strokeIndex: 13, yards: 390 },
        { hole: 15, par: 3, strokeIndex: 17, yards: 180 },
        { hole: 16, par: 4, strokeIndex: 10, yards: 410 },
        { hole: 17, par: 5, strokeIndex: 15, yards: 480 },
        { hole: 18, par: 4, strokeIndex: 16, yards: 400 },
    ];

    onMount(async () => {
        try {
            const filters: PaginationFilters = {
                limit: BigInt(10),
                offset: BigInt(0),
            };
            const courses = await courseStore.getCourses(filters);
            course = courses[0] || null;
            /* Code to actually get course details
            const courseId = Number($page.params.courseId);

            if (courseId) {
                const courses = await courseStore.getCourse(courseId);
                course = courses[0] || null;
            } */
        }
        catch (err) {
            console.error("Error fetching course details:", err);
        }
    });
</script>

<Layout>
    <div class="w-full">
        <div class="p-2 px-4 text-black">
            <div class="flex items-center justify-between">
                <h2 class="text-5xl text-black md:text-4xl condensed">COURSE DETAILS</h2>
                <div class="hidden gap-4 md:flex">
                    <button class="px-4 py-3 font-semibold rounded text-md bg-BrandLightGray">REMOVE COURSE</button>
                    <button 
                        class="px-4 py-3 font-semibold rounded text-md text-BrandYellow bg-BrandForest"
                        on:click={() => editCourseIsOpen = true}
                    >
                        EDIT COURSE DETAILS
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray">
            <div class="w-full mb-6 lg:w-1/3 lg:mb-0">
                <h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3>
                <img src="/course-placeholder.jpg" alt="golf course" class="object-cover w-full h-full rounded" />
            </div>
            <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0">
                {#if course}
                    <div class="flex flex-col">
                        <h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3>
                        <div class="flex flex-col">
                            <p class="block pt-8 text-sm text-BrandDarkGray">COURSE NAME</p>
                            <h2 class="text-5xl text-black md:text-6xl condensed">{course.name.toUpperCase()}</h2>
                        </div>
                        <div class="flex flex-col">
                            <p class="block pt-8 text-sm text-BrandDarkGray">LOCATION</p>
                            <h1 class="text-2xl text-black condensed">UNITED KINGDOM</h1>
                        </div>
                        <div class="w-full h-px my-4 bg-BrandDivider sm:hidden"></div>
                    </div>
                {/if}
            </div> 
            <div class="w-full px-0 lg:w-1/3 lg:px-4">
                <h2 class="pb-3 text-xl text-black condensed">TEES</h2>
                <div class="flex flex-col p-5 bg-white border-b rounded">
                    {#if course && course.tees}
                        {#each course.tees as tee}
                            <span 
                                class="inline-block px-2 py-1 text-sm text-white rounded-full max-w-max"
                                style="background-color: {tee.colour};"
                            >
                                {tee.name}
                            </span>
                        {/each}
                    {/if}
                </div>
                <div class="overflow-x-auto">
                    <div class="overflow-y-auto max-h-[65vh]">
                        <table class="hidden min-w-full bg-white border-collapse sm:table">
                            <thead>
                                <tr>
                                    <th class="p-4 text-xl text-left text-black border-b condensed">HOLE</th>
                                    <th class="p-4 text-xl text-left text-black border-b condensed">PAR</th>
                                    <th class="p-4 text-xl text-left text-black border-b condensed">S.I.</th>
                                    <th class="p-4 text-xl text-left text-black border-b condensed">YARDS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each holes as hole}
                                    <tr>
                                        <td class="p-3 text-black condensed">{hole.hole}</td>
                                        <td class="p-3 text-black">{hole.par}</td>
                                        <td class="p-3 text-black">{hole.strokeIndex}</td>
                                        <td class="p-3 text-black">{hole.yards}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                        <div class="sm:hidden">
                            <div class="grid grid-cols-4 gap-4 p-2 text-sm text-black bg-white condensed">
                                <div>HOLE</div>
                                <div>PAR</div>
                                <div>S.I</div>
                                <div>YARDS</div>
                            </div>
                            {#each holes as hole}
                                <div class="grid grid-cols-4 gap-4 p-2 text-black bg-white border-t">
                                    <div class="text-lg condensed">{hole.hole}</div>
                                    <div class="text-lg">{hole.par}</div>
                                    <div class="text-lg">{hole.strokeIndex}</div>
                                    <div class="text-lg">{hole.yards}</div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="flex w-full gap-4 p-2 bg-white md:hidden">
                    <button class="px-3 py-1 font-semibold text-black rounded text-md bg-BrandLightGray">REMOVE COURSE</button>
                    <button 
                        class="px-3 py-1 font-semibold rounded text-md text-BrandYellow bg-BrandForest"
                        on:click={() => editCourseIsOpen = true}
                    >
                        EDIT COURSE DETAILS
                    </button>
                </div>
            </div>
        </div>
    </div>
</Layout>

{#if editCourseIsOpen}
    <!-- TODO change placeholder to actual image -->
    <EditCourse isOpen={editCourseIsOpen} holes={holes} courseName={course?.name || ''} courseImage="/course-placeholder.jpg" />
{/if}