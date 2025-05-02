<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { AddShot, GolfClub } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { golfClubs } from "$lib/types";
    import { clubDisplayNames } from "$lib/types/golf-clubs";

    const golfClubVariants: GolfClub[] = golfClubs.map(club => ({ [club]: null } as GolfClub));

    let showModal = false;
    let isLoading = false;
    let selectedClub: GolfClub = { DRIVER: null };
    let yardage: string = "";

    onMount(async () => {
        try {
            await userStore.sync();
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error initializing data." });
        }
    });

    function getClubKey(club: GolfClub): string {
        return Object.keys(club)[0];
    }

    async function addShot() {
        if (!yardage) {
            toasts.addToast({ type: "error", message: "Please enter yardage." });
            return;
        }

        isLoading = true;
        try {
            const dto: AddShot = {
                club: selectedClub,
                yardage: BigInt(yardage),
                principalId: $authStore.identity?.getPrincipal().toString()!,
            };
            
            await userStore.addShot(dto);
            toasts.addToast({ type: "success", message: "Golf shot added successfully." });
            selectedClub = { DRIVER: null };
            yardage = "";
            showModal = false;
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error adding golf shot." });
        } finally {
            isLoading = false;
        }
    }

    function closeModal() {
        showModal = false;
        selectedClub = { DRIVER: null };
        yardage = "";
    }

    function openModal() {
        showModal = true;
    }
</script>

<button class="brand-button" onclick={openModal}>Add Golf Shot</button>

<Modal {showModal} onClose={closeModal}>
    {#if isLoading}
        <div class="flex justify-center items-center h-64">
            <LocalSpinner />
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Add New Golf Shot</h2>

            <div class="flex flex-col">
                <label for="club-select" class="input-title">Club</label>
                <select 
                    id="club-select"
                    bind:value={selectedClub}
                    class="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {#each golfClubVariants as club}
                        <option value={club}>{clubDisplayNames[getClubKey(club)]}</option>
                    {/each}
                </select>
            </div>

            <div class="flex flex-col">
                <label for="yardage" class="input-title">Yardage</label>
                <input
                    id="yardage"
                    type="number"
                    bind:value={yardage}
                    min="0"
                    class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter yardage"
                />
            </div>

            <div class="flex w-full justify-end gap-2">
                <button 
                    class="brand-button" 
                    onclick={addShot}
                    disabled={!yardage || isLoading}
                >
                    Add Shot
                </button>
                <button 
                    class="brand-cancel-button" 
                    onclick={closeModal}
                    disabled={isLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    {/if}
</Modal>