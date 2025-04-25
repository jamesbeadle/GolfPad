<script lang="ts">
    import { onMount } from 'svelte';
    import { userStore } from "$lib/stores/user-store";
    import type { Profile } from "../../../../../declarations/backend/backend.did";
    
    import UpdateUsernameModal from './modals/update-username-modal.svelte';
    import EditIcon from "$lib/icons/edit-icon.svelte";
    import BrandPanel from '../shared/brand-panel.svelte';
    import LocalSpinner from '../shared/local-spinner.svelte';
    import CopyPrincipal from './copy-principal.svelte';
    import { toasts } from '$lib/stores/toasts-store';

    let isLoading = true;
    let golfer: Profile;
    let showUpdateUsernameModal = false;
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }
                golfer = user;
            });
            console.log(golfer);
        } catch (err) {
            console.error('Creating loading golfer detail:', err);
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <BrandPanel title="DETAILS" subTitle="TELL US ABOUT YOURSELF">
        <div class="relative w-full p-4 text-black">
            <div class="text-sm text-BrandGray">USERNAME</div>
            <div class="text-4xl condensed">{golfer.username}</div>
            <button on:click={() => showUpdateUsernameModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
            <div class="text-sm text-BrandGray">JOINED ON</div>
            <div class="text-4xl condensed">{golfer.joinedOn}</div>
            <div class="text-sm text-BrandGray">PRINCIPAL ID</div>
        </div>
        <CopyPrincipal />
    </BrandPanel>
{/if}

{#if showUpdateUsernameModal}
    <UpdateUsernameModal />
{/if}