<script lang="ts">
    import Layout from "../../+layout.svelte";
    import type { GolfCourse, GolfCourseTeeGroup } from "../../../../../declarations/backend/backend.did";
    import { onMount } from "svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { getImageURL } from "$lib/utils/helpers";
    import { page } from "$app/state";
    
    let golfCourse: GolfCourse | null = null;
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            golfCourse = await golfCourseStore.getGolfCourse({ id: BigInt(page.params.id) });
        } catch (err) {
            error = err instanceof Error ? err.message : 'An unexpected error occurred';
        } finally {
            loading = false;
        }
    });

    let selectedTeeIndex: number = 0;

    function getSelectedTee(): GolfCourseTeeGroup | null {
        return golfCourse?.tees[selectedTeeIndex] ?? null;
    }

    function getTotalPar(): number {
        return getSelectedTee()?.holes.reduce((sum, hole) => sum + Number(hole.par), 0) ?? 0;
    }

    function getTotalYardage(): number {
        return getSelectedTee()?.holes.reduce((sum, hole) => sum + Number(hole.yardage), 0) ?? 0;
    }

    function changeTee(index: number) {
        selectedTeeIndex = index;
    }

    function formatDate(timestamp: number): string {
        return new Date(timestamp).toLocaleDateString();
    }
</script>

<Layout>
    {#if loading}
        <div class="loading">Loading golf course...</div>
    {:else if error}
        <div class="error">Error: {error}</div>
    {:else if golfCourse}
        <div class="golf-course-container">
            <div class="course-header">
                <h1>{golfCourse.name}</h1>
                {#if golfCourse.mainImage.length > 0}
                    <img 
                        src={getImageURL(golfCourse.mainImage)} 
                        alt={`${golfCourse.name} main image`}
                        class="course-image"
                    />
                {/if}
            </div>

            <div class="course-details">
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="label">Founded:</span>
                        <span class="value">{golfCourse.founded}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Country ID:</span>
                        <span class="value">{golfCourse.countryId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Total Holes:</span>
                        <span class="value">{golfCourse.totalHoles}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Active Version:</span>
                        <span class="value">{golfCourse.activeVersion}</span>
                    </div>
                </div>
            </div>

            <div class="tee-viewer">
                <div class="tee-tabs">
                    {#each golfCourse.tees as tee, index}
                        <button 
                            class="tee-tab"
                            class:active={selectedTeeIndex === index}
                            style="background-color: {tee.colour.toLowerCase()}"
                            on:click={() => changeTee(index)}
                        >
                            {tee.name}
                        </button>
                    {/each}
                </div>

                {#if getSelectedTee()}
                    <div class="tee-details">
                        <div class="tee-summary">
                            <span>Total Par: {getTotalPar()}</span>
                            <span>Total Yardage: {getTotalYardage()}</span>
                            <span>Added: {formatDate(Number(getSelectedTee()!.added))}</span>
                        </div>

                        <table class="holes-table">
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    <th>Par</th>
                                    <th>S.I.</th>
                                    <th>Yards</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each getSelectedTee()!.holes as hole}
                                    <tr>
                                        <td>{hole.number}</td>
                                        <td>{hole.par}</td>
                                        <td>{hole.strokeIndex}</td>
                                        <td>{hole.yardage}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <div class="not-found">Golf course not found</div>
    {/if}
</Layout>