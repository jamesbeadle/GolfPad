<script lang="ts">
    import { onMount } from "svelte";
    import type { GetGolfCourseTees, GolfCourseId, GolfCourseTees, TeeGroupIndex } from "../../../../../declarations/backend/backend.did";
    import Modal from "../shared/modal.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { toasts } from "$lib/stores/toasts-store";
    import LocalSpinner from "../shared/local-spinner.svelte";

    export let golfCourseId: GolfCourseId;
    export let selectTee: (teeGroup: TeeGroupIndex) => void;
    export let onClose: () => void;
    export let showModal: boolean;

    let isLoading = true;
    let golfCouseTees: GolfCourseTees | null =  null;

    onMount(async () => {
        try{
            let dto: GetGolfCourseTees = {
                golfCourseId 
            };
            golfCouseTees = await golfCourseStore.getGolfCourseTees(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error getting golf course tees.'});
        } finally {
            isLoading = false;
        }
    })

</script>

<Modal {onClose} {showModal}>
    <div class="container">
        <p class="title">SELECT TEE</p>

        {#if isLoading}
            <LocalSpinner />
        {:else}
            {#if golfCouseTees && golfCouseTees.tees && golfCouseTees.tees.length > 0}

                <div class="courses-list mb-4">
                    {#each golfCouseTees.tees as teeGroup}
                        <div class="course-item">
                            {teeGroup.name}
                            <button 
                                on:click={() => selectTee(teeGroup.index)}
                                class="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Use
                            </button>
                        </div>
                    {/each}
                </div>

            {:else}
                <p>Cannot find golf course tees.</p>
            {/if}
        {/if}
    </div>
</Modal>
