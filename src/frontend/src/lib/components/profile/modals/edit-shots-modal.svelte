<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { formatUnixTimeToTime } from "$lib/utils/helpers";
    import type { ClubShots, GetClubShots, GolfClub, GolfShotId, UpdateShot } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { golfClubs } from "$lib/types";
    
    interface Props {
        club: GolfClub;
    }
    
    let { club } : Props = $props();

    let clubs = golfClubs;
    let showModal = false;
    let isLoading = true;
    let page = 1n;
    let pageSize = 10n;
    let clubShots: ClubShots | null = null;
    let editingShots: Map<bigint, { clubName: string, yardage: bigint, modified: boolean, club: GolfClub }> = new Map();
    let deletingShot: bigint | null = null;

    onMount(async () => {
        try {
            await userStore.sync();
            await fetchClubShots();
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error fetching shots for golf club." });
        } finally {
            isLoading = false;
        }
    });

    async function fetchClubShots() {
        isLoading = true;
        try {
            const principalId = $authStore.identity?.getPrincipal().toString() ?? "";
            const dto: GetClubShots = { page, principalId, club };
            clubShots = await userStore.getClubShots(dto);
            editingShots.clear();
            clubShots.entries.forEach(shot => {
                editingShots.set(shot.id, { 
                    clubName: Object.keys(shot.club)[0], 
                    yardage: shot.yardage, 
                    modified: false,
                    club: shot.club
                });
            });
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error fetching golf club shots." });
            clubShots = null;
        } finally {
            isLoading = false;
        }
    }

    async function changePage(newPage: bigint) {
        if (!clubShots) return;
        const totalPages = clubShots.total / pageSize + (clubShots.total % pageSize > 0n ? 1n : 0n);
        if (newPage < 1n || newPage > totalPages) return;
        page = newPage;
        await fetchClubShots();
    }

    async function updateClubShot(golfShotId: GolfShotId) {
        isLoading = true;
        try {
            const dto: UpdateShot = {
                golfShotId,
                principalId: $authStore.identity?.getPrincipal().toString()!,
                yardage: editingShots.get(golfShotId)?.yardage!,
                club: editingShots.get(golfShotId)?.club!
            };
            await userStore.updateShot(dto);
            toasts.addToast({ type: "success", message: "Shot updated successfully." });
            await fetchClubShots();
        } catch {
            toasts.addToast({ type: "error", message: "Error updating shot." });
        } finally {
            isLoading = false;
        }
    }

    async function deleteClubShot(golfShotId: GolfShotId) {
        isLoading = true;
        try {
            await userStore.deleteShot({
                golfShotId,
                principalId: $authStore.identity?.getPrincipal().toString()!
            });
            toasts.addToast({ type: "success", message: "Shot deleted successfully." });
            await fetchClubShots();
        } catch {
            toasts.addToast({ type: "error", message: "Error deleting shot." });
        } finally {
            isLoading = false;
            deletingShot = null;
        }
    }

    function handleInputChange(shotId: bigint, field: 'clubName' | 'yardage', value: string | bigint) {
        const current = editingShots.get(shotId);
        if (current) {
            editingShots.set(shotId, {
                ...current,
                [field]: value,
                modified: true
            });
            editingShots = editingShots;
        }
    }

    function closeModal() {
        showModal = false;
        page = 1n;
        deletingShot = null;
    }
</script>

<Modal {showModal} onClose={closeModal}>
    {#if isLoading}
        <div class="flex justify-center items-center h-64">
            <LocalSpinner />
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            {#if clubShots?.entries.length === 0}
                <p class="text-BrandDarkGray">No golf shots found.</p>
            {:else}
                {#each clubShots?.entries! as golfShot}
                    <div class="flex items-center w-full gap-2">
                        <div class="w-1/5">
                            <p>{formatUnixTimeToTime(Number(golfShot.hitOn))}</p>
                        </div>
                        <div class="w-1/5">
                            <div class="flex flex-col">
                                <label for="club-{golfShot.id}" class="input-title">CLUB</label>
                                <select 
                                    id="club-{golfShot.id}"
                                    value={editingShots.get(golfShot.id)?.clubName}
                                    on:change={(e) => handleInputChange(golfShot.id, 'clubName', e.currentTarget.value)}
                                    class="w-full p-1 border rounded"
                                >
                                    <option value="">Select Club</option>
                                    {#each clubs as club}
                                        <option value={club}>{club.replace('_', ' ')}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <div class="w-1/5">
                            <input 
                                type="number" 
                                class="w-full p-1 border rounded"
                                value={editingShots.get(golfShot.id)?.yardage}
                                on:input={(e) => handleInputChange(golfShot.id, 'yardage', BigInt(e.currentTarget.value))}
                            >
                        </div>
                        {#if deletingShot === golfShot.id}
                            <div class="w-2/5 flex gap-2">
                                <button 
                                    class="brand-button bg-red-500" 
                                    on:click={() => deleteClubShot(golfShot.id)}
                                >
                                    Confirm Delete
                                </button>
                                <button 
                                    class="brand-button" 
                                    on:click={() => deletingShot = null}
                                >
                                    Cancel
                                </button>
                            </div>
                        {:else}
                            <div class="w-1/5">
                                <button 
                                    class="brand-button" 
                                    disabled={!editingShots.get(golfShot.id)?.modified}
                                    on:click={() => updateClubShot(golfShot.id)}
                                >
                                    Update
                                </button>
                            </div>
                            <div class="w-1/5">
                                <button 
                                    class="brand-button bg-red-500" 
                                    on:click={() => deletingShot = golfShot.id}
                                >
                                    Delete
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            {/if}

            {#if clubShots?.total! > 0}
                <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-BrandDarkGray">
                        Showing {(page - 1n) * pageSize + 1n} to
                        {Math.min(Number(page * pageSize), Number(clubShots?.total!))} of {clubShots?.total!} golf shots.
                    </div>
                    <div class="flex gap-2">
                        <button
                            class="brand-button"
                            disabled={page === 1n}
                            on:click={() => changePage(page - 1n)}
                        >
                            Previous
                        </button>
                        <button
                            class="brand-button"
                            disabled={page === BigInt(Math.ceil(Number(clubShots?.total! / pageSize)))}
                            on:click={() => changePage(page + 1n)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            {/if}

            <div class="flex w-full justify-end">
                <button class="brand-cancel-button" on:click={closeModal}>Cancel</button>
            </div>
        </div>
    {/if}
</Modal>