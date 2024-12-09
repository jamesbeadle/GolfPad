<script lang="ts">
    import { onMount } from "svelte";
    import AddHomeCourse from "$lib/components/profile/add-home-course.svelte";
    import Layout from "../Layout.svelte";
    import { courseStore } from "$lib/stores/course-store";
    import type {GolfCourseDTO, PaginationFilters, TeeGroup} from './../../../../declarations/backend/backend.did.d.ts';
    import { getCourseImage } from "$lib/derived/user-derived";
    
    let courses: GolfCourseDTO[] = [];
    let isAddHomeCourseModalOpen = false;

    interface CourseTees {
        teeColors: { name: string; color: string }[];
        activeVersion: number;
        name: string;
        tees: TeeGroup[];
        courseId: bigint;
    }
    
    let coursesTees: CourseTees[] = [];
    let selectedCourse: GolfCourseDTO | null = null;

    onMount(async () => {
        try {
            const filters: PaginationFilters = {
                limit: BigInt(10),
                offset: BigInt(0),
            };
            courses = await courseStore.getCourses(filters);

            coursesTees = courses.map(course => {
                return {
                    ...course,
                    teeColors: course.tees.map(tee => ({
                        name: tee.name,
                        color: getTeeColor(tee.name)
                    }))
                };
            });
            console.log("Courses Tees:", coursesTees);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    });

    function getTeeColor(color: string): string {
        switch (color.toLowerCase()) {
            case "black":
                return "#000000";
            case "blue":
                return "#0000FF";
            case "green":
                return "#008000";
            case "orange":
                return "#FFA500";
            case "pink":
                return "#FFC0CB";
            case "red":
                return "#FF0000";
            case "white":
                return "#FFFFFF";
            case "yellow":
            case "gold":
                return "#FFFF00";
            default:
                return "#CCCCCC"; 
        }
    }


</script>

<Layout>
    <div class="w-full bg-white">
        <div class="flex items-center justify-between px-8 pt-4">
            <h2 class="text-4xl text-black condensed">MY COURSES</h2>
            <button
                class="hidden md:block btn btn-new-game"
                on:click={() => isAddHomeCourseModalOpen = true}
            >
                ADD NEW COURSE
            </button>
        </div>
        <div class="w-full h-full px-2 pt-4">
            <div class="hidden p-2 rounded lg:block bg-BrandLightGray">
                <div class="grid items-center grid-cols-2 gap-4 p-4 text-xl text-black condensed">
                    <span>NAME</span>
                    <span>TEES</span>
                </div>
                <div class="overflow-y-auto max-h-[60vh] p-2">
                    {#each coursesTees as course}
                        <div class="grid items-center grid-cols-2 p-3 mb-2 bg-white rounded gap-y-4">
                            <div class="flex items-center">
                                <img 
                                    src={getCourseImage(course)} 
                                    alt={course.name} 
                                    class="object-cover w-16 h-16 mr-4 rounded-md" 
                                />
                                <span class="text-2xl text-black condensed">{course.name}</span>
                            </div>
                            <div class="flex items-center justify-between space-x-2 text-black">
                                {#each course.teeColors as tee}
                                    <span 
                                        class="px-2 py-1 text-sm text-black rounded-full"
                                        style="background-color: {tee.color};"
                                    >
                                        {tee.name}
                                    </span>
                                {/each}
                                <button 
                                    class="px-5 py-1 text-sm rounded text-BrandYellow bg-BrandForest"
                                >
                                    VIEW
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="space-y-4 lg:hidden">
                {#each coursesTees as course}
                    <div class="p-4 bg-white rounded-lg">
                        <div class="sm:hidden">
                            <div class="flex items-center mb-4">
                                <img 
                                    src={getCourseImage(course)} 
                                    alt={course.name} 
                                    class="w-16 h-16 mr-4 rounded-lg" 
                                />
                                <span class="text-2xl text-black condensed">{course.name}</span>
                            </div>
                            <div class="h-px mb-4 bg-BrandDivider"></div>
                            <div class="flex flex-wrap gap-2">
                                {#each course.teeColors as tee}
                                    <span 
                                        class="px-3 py-1 text-sm text-white rounded-full"
                                        style="background-color: {tee.color};"
                                    >
                                        {tee.name}
                                    </span>
                                {/each}
                            </div>
                        </div>
                        <div class="hidden sm:block">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <img 
                                        src={getCourseImage(course)} 
                                        alt={course.name} 
                                        class="w-16 h-16 mr-4 rounded-lg" 
                                    />
                                    <span class="text-2xl text-black condensed">{course.name}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    {#each course.teeColors as tee}
                                        <span 
                                            class="px-3 py-1 text-sm text-black rounded-full"
                                            style="background-color: {tee.color};"
                                        >
                                            {tee.name}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        </div>

                        <button 
                            class="w-full py-2 mt-4 text-sm rounded text-BrandYellow bg-BrandForest"
                        >
                            VIEW
                        </button>
                    </div>
                {/each}
            </div>
            <button
                class="w-full py-2 mt-6 text-xl lg:hidden bg-BrandYellow text-BrandForest"
                on:click={() => isAddHomeCourseModalOpen = true}
            >
                ADD NEW COURSE
            </button>
        </div>

        {#if isAddHomeCourseModalOpen}
            <AddHomeCourse 
                isOpen={isAddHomeCourseModalOpen} 
                on:close={() => isAddHomeCourseModalOpen = false}
                on:courseSelect={(event) => {
                    selectedCourse = event.detail.course;
                    isAddHomeCourseModalOpen = false;
                }}
            />
        {/if}
    </div>
</Layout>