<script lang="ts">
    import { onMount } from "svelte";
    import type { Friend, Friends, GetFriends } from "../../../../../declarations/backend/backend.did";
    import Modal from "../shared/modal.svelte";
    import { toasts } from "$lib/stores/toasts-store";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import LocalSpinner from "../shared/local-spinner.svelte";

    export let selectOpponent: (opponent: Friend) => void;
    export let onClose: () => void;
    export let showModal: boolean;

    let isLoading = true;
    let friends: Friends | null =  null;
    let isLoadingMore = false;
    let currentPage = 1n;
    let hasMore = true;

    onMount(async () => {
        try{
            let dto: GetFriends = {
                principalId: $authStore.identity?.getPrincipal().toString() ?? "",
                page: currentPage
            };
            friends = await userStore.getFriends(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error getting freinds.'});
        } finally {
            isLoading = false;
        }
    })

</script>

<Modal {onClose} {showModal}>
    <div class="container">
        <p class="title">SELECT OPPONENT</p>

        {#if isLoading}
            <LocalSpinner />
        {:else}
            {#if friends && friends.friends.length > 0}

                <div class="courses-list mb-4">
                    {#each friends.friends as friend}
                        <div class="course-item">
                            {friend.firstName} {friend.lastName}
                            <button 
                                on:click={() => selectOpponent(friend)}
                                class="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Use
                            </button>
                        </div>
                    {/each}
                </div>

            {:else}
                <p>Cannot find friends.</p>
            {/if}
        {/if}
    </div>
</Modal>
