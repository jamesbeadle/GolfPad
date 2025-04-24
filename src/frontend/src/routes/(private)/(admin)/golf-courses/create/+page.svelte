<script lang="ts">
    import { goto } from "$app/navigation";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { countries } from "$lib/types/countries";
    import { toasts } from "$lib/stores/toasts-store";
    import type { CreateGolfCourse, GolfHole } from "../../../../../../../declarations/backend/backend.did";

    import BrandPanel from "$lib/components/shared/brand-panel.svelte";
    import CourseInfo from "$lib/components/golf-course/create-course/course-info.svelte";
    import HolesGrid from "$lib/components/golf-course/create-course/holes-grid.svelte";
    import CourseSummary from "$lib/components/golf-course/create-course/course-summary.svelte";

    let courseName = $state("");
    let founded = $state(0n);
    let holes: GolfHole[] = $state(Array.from({ length: 18 }, (_, i) => ({
        holeNumber: i + 1,
        par: 4,
        yardage: 400,
        strokeIndex: i + 1
    })));
    let countryId = $state(0);

    let coursePar = $derived(holes.reduce((sum, hole) => sum + hole.par, 0));
    let totalYardage = $derived(holes.reduce((sum, hole) => sum + hole.yardage, 0));

    function updateHole(index: number, field: keyof GolfHole, value: number) {
        holes = holes.map((hole, i) => 
            i === index ? { ...hole, [field]: value } : hole
        );
    }

    async function submitGolfCourse() {
        if (!courseName) {
            alert("Please enter a course name");
            return;
        }

        if (countryId === 0) {
            alert("Please select a country");
            return;
        }

        const dto: CreateGolfCourse = {
            name: courseName,
            founded,
            countryId,
            holes,
            coursePar,
            totalYardage
        };

        try {
            await golfCourseStore.createGolfCourse(dto);
            toasts.addToast({type: 'success', message: 'Golf course created successfully!', duration: 5000});
            goto("/golf-courses");
        } catch (error) {
            console.error("Failed to create course:", error);
            toasts.addToast({type: 'error', message: 'Failed to create golf course', duration: 5000});
        }
    }
</script>

<BrandPanel title="CREATE GOLF COURSE" subTitle="">
    <form onsubmit={submitGolfCourse} class="space-y-6 text-black">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CourseInfo
                bind:courseName={courseName}
                bind:founded={founded}
                bind:countryId={countryId}
                countries={countries}
            />

            <CourseSummary
                coursePar={coursePar}
                totalYardage={totalYardage}
            />
        </div>

        <HolesGrid
            bind:holes={holes}
            updateHole={updateHole}
        />

        <div class="flex justify-end pt-6">
            <button
                type="button"
                class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
            >
                Cancel
            </button>
            <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-BrandForest hover:bg-BrandForest/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BrandForest"
            >
                Create Course
            </button>
        </div>
    </form>
</BrandPanel>
