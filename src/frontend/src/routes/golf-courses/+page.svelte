<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { GolfCourses, GetGolfCourses } from "../../../../declarations/backend/backend.did";
    
    import Layout from "../Layout.svelte";
    import GolfCourseSummaryRow from "$lib/components/golf-course/golf-course-summary-row.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import PaginationRow from "$lib/components/shared/pagination-row.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import GolfCourseSearchFilters from "$lib/components/golf-course/golf-course-search-filters.svelte";
    import { writable } from "svelte/store";

    let isLoading = true;
    let golfCourses: GolfCourses | null = null;
    let page = 1n; 
    let pageSize = 10n; 
    let searchTerm = writable('');

    onMount( async () => {
        loadGolfCourses();
    });

    function createNew(){
        goto('/golf-courses/create')
    }

    async function changePage(newPage: bigint) {
        if (!golfCourses) return;

        const totalPages = golfCourses.total / pageSize + (golfCourses.total % pageSize > 0n ? 1n : 0n);
        if (newPage < 1n || newPage > totalPages) {
            return;
        }
        page = newPage;
        await loadGolfCourses();
    }

    async function loadGolfCourses() {
        isLoading = true;
        try {
            const store = $authStore;
            const principalId = store.identity?.getPrincipal();

            if (!principalId) {
                goto('/');
                return;
            }

            let dto: GetGolfCourses = {
                page: page,
                principalId: principalId.toString(),
                searchTerm: $searchTerm
            };

            golfCourses = await golfCourseStore.getGolfCourses(dto);
        } catch {
            toasts.addToast({type: 'error', message: 'Error loading golf courses.'});
            golfCourses = null;
        } finally {
            isLoading = false;
        }
    }

</script>
<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <GolfCourseSearchFilters />
        <ListViewPanel title="GOLF COURSES" buttonTitle="ADD GOLF COURSE" buttonCallback={createNew}>
            {#if golfCourses}

                {#if golfCourses.entries.length > 0}
                    {#each golfCourses?.entries! as golfCourse}
                        <GolfCourseSummaryRow {golfCourse} {searchTerm} />
                    {/each}
                {:else}
                    <p>No golf courses found.</p>
                {/if}                

                <PaginationRow {changePage} {page} {pageSize} typeName="courses" total={golfCourses.total} />
            {:else}
                <p>Error loading golf courses.</p>
            {/if}
        </ListViewPanel>
    {/if}
</Layout>