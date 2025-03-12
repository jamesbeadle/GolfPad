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

    let isLoading = true;
    let golfCourses: GolfCourses | null = null;
    let page = 1n;
    let totalPages = 1n; 

    onMount( async () => {
        loadGolfCourses();
    });

    function createNew(){
        goto('/golf-courses/create')
    }

    async function changePage(delta: number) {
        const newPage = Number(page) + delta;
        if (newPage >= 1 && newPage <= Number(totalPages)) {
            page = BigInt(newPage);
            await loadGolfCourses();
        }
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
                user_id: principalId.toString(),
                searchTerm: '' //TODO implement search
            };

            golfCourses = await golfCourseStore.getGolfCourses(dto);
            
            if (golfCourses?.total && golfCourses?.pageSize) {
                totalPages = BigInt(Math.ceil(Number(golfCourses.total) / Number(golfCourses.pageSize)));
            }
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
    <!-- - Search for a new course
        - Add it to my favourite courses -->
       
        <ListViewPanel title="GOLF COURSES" buttonTitle="ADD GOLF COURSE" buttonCallback={createNew}>
            {#if golfCourses}

                {#if golfCourses.entries.length > 0}
                    {#each golfCourses?.entries! as golfCourse}
                        <GolfCourseSummaryRow {golfCourse} />
                    {/each}
                {:else}
                    <p>No golf courses found.</p>
                {/if}                

                <PaginationRow {changePage} currentPage={Number(page)} {totalPages} />
            {:else}
                <p>Error loading golf courses.</p>
            {/if}
        </ListViewPanel>
    {/if}
</Layout>