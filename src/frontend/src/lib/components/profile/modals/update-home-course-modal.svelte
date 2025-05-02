<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { getImageURL } from "$lib/utils/helpers";
    import type { GetGolfCourses, GolfCourseId, GolfCourses, UpdateHomeCourse } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import PictureIcon from "$lib/icons/picture-icon.svelte";
    
    let showModal = false;
    let isLoading = true;
    let searchTerm = "";
    let page = 1n;
    let pageSize = 10n;
    let courses: GolfCourses | null = null;

    onMount(async () => {
        try {
            await userStore.sync();
            await fetchCourses();
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error fetching golf courses." });
        } finally {
            isLoading = false;
        }
    });

    async function fetchCourses() {
        isLoading = true;
        try {
            const principalId = $authStore.identity?.getPrincipal().toString() ?? "";
            const dto: GetGolfCourses = { page, searchTerm, principalId };
            courses = await golfCourseStore.getGolfCourses(dto);
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error fetching golf courses." });
            courses = null;
        } finally {
            isLoading = false;
        }
    }


    async function handleSearch() {
        page = 1n;
        await fetchCourses();
    }

    async function changePage(newPage: bigint) {
        if (!courses) return;

        const totalPages = courses.total / pageSize + (courses.total % pageSize > 0n ? 1n : 0n);
        if (newPage < 1n || newPage > totalPages) {
            return;
        }
        page = newPage;
        await fetchCourses();
    }

    async function updateHomeCourse(courseId: GolfCourseId) {
        isLoading = true;
        try {
            const dto: UpdateHomeCourse = {
                homeCourseId: [courseId],
                principalId: $authStore.identity?.getPrincipal().toString()!,
            };
            await userStore.updateHomeCourse(dto);
            toasts.addToast({ type: "success", message: "Home course updated successfully." });
        } catch {
            toasts.addToast({ type: "error", message: `Error updating home course.` });
        } finally {
            isLoading = false;
            showModal = false;
        }
    }

    function closeModal() {
        showModal = false;
        searchTerm = "";
        page = 1n;

    }
</script>

<Modal {showModal} onClose={closeModal}>
    {#if isLoading}
        <div class="flex justify-center items-center h-64">
            <LocalSpinner />
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            <div class="flex flex-col">
                <label for="search" class="input-title">SEARCH GOLF COURSES</label>
                <input
                    id="search"
                    placeholder="Search for a golf course..."
                    type="text"
                    class="text-input"
                    bind:value={searchTerm}
                    on:input={handleSearch}
                />
            </div>

            
            {#if courses?.entries.length === 0}
                <p class="text-BrandDarkGray">
                    No golf courses found.
                </p>
            {:else}
                {#each courses?.entries! as course}
                    <div class="flex flex-col w-full">
                        <div class="w-1/4">
                            {course.id}
                        </div>
                        <div class="w-1/4">
                            {#if course.mainImage}
                                <img
                                    src={getImageURL(course.mainImage)}
                                    alt={`${course.name} thumbnail`}
                                    class="w-12 h-12 object-cover rounded"
                                />
                            {:else}
                                <div
                                    class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray"
                                >
                                    <PictureIcon className="w-6 h-6 fill-black" />
                                </div>
                            {/if}
                        </div>
                        <div class="w-1/4">
                            {course.name}
                        </div>
                        <div class="w-1/4">
                            <button
                                class="brand-button"
                                onclick={() => updateHomeCourse(course.id)}
                            >
                                Select
                            </button>
                        </div>
                    </div>
                {/each}
            {/if}

            {#if courses?.total! > 0}
                <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-BrandDarkGray">
                        Showing {(page - 1n) * pageSize + 1n} to
                        {Math.min(Number(page * pageSize), Number(courses?.total!))} of {courses?.total!} courses
                    </div>
                    <div class="flex gap-2">
                        <button
                            class="brand-button"
                            disabled={page === 1n}
                            onclick={() => changePage(page - 1n)}
                        >
                            Previous
                        </button>
                        <button
                            class="brand-button"
                            disabled={page === BigInt(Math.ceil(Number(courses?.total! / pageSize)))}
                            onclick={() => changePage(page + 1n)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            {/if}

            <div class="flex w-full justify-end">
                <button class="brand-cancel-button" onclick={closeModal}>Cancel</button>
            </div>
        </div>
    {/if}
</Modal>