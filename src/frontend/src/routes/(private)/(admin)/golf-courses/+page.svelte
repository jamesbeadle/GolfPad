<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { ListGolfCourses, GolfCourses } from './../../../../../../declarations/backend/backend.did.d.ts';
    
    import GolfCourseSummaryRow from "$lib/components/golf-course/golf-course-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GolfCourseSearchFilters from "$lib/components/golf-course/golf-course-search-filters.svelte";

    let isLoading = $state(true);
    let golfCourses: GolfCourses | null = $state(null);
    let page = $state(1n); 
    let pageSize = $state(10n); 

    onMount( async () => {
        loadGolfCourses();
    });

    function createNew(){
        goto('/golf-courses/create')
    }

    async function changePage(newPage: bigint) {
        if (!golfCourses) return;

        const totalPages = golfCourses.totalEntries / pageSize + (golfCourses.totalEntries % pageSize > 0n ? 1n : 0n);
        if (newPage < 1n || newPage > totalPages) {
            return;
        }
        page = newPage;
        await loadGolfCourses();
    }

    async function loadGolfCourses() {
        isLoading = true;
        try {
            let dto: ListGolfCourses = {
                page: page
            };

            const result = await golfCourseStore.listGolfCourses(dto);
            if (result) {
                golfCourses = result;
            }
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golf courses.'});
            golfCourses = null;
        } finally {
            isLoading = false;
        }
    }

</script>

    {#if isLoading}
        <LocalSpinner />
    {:else}
        <GolfCourseSearchFilters />
        <ListViewPanel title="GOLF COURSES" buttonTitle="ADD GOLF COURSE" buttonCallback={createNew}>
            {#if golfCourses}
                {#if golfCourses.entries.length > 0}
                    {#each golfCourses?.entries! as golfCourse}
                        <GolfCourseSummaryRow {golfCourse} />
                    {/each}
                {:else}
                    <p class="text-center text-black">No golf courses found.</p>
                {/if}                
                <PaginationRow {changePage} {page} {pageSize} typeName="courses" total={golfCourses.totalEntries} />
            {:else}
                <p class="text-center text-black">Error loading golf courses.</p>
            {/if}
        </ListViewPanel>
    {/if}