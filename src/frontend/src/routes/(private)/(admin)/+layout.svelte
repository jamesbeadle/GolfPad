<script lang="ts">
    import FullScreenSpinner from '$lib/components/shared/full-screen-spinner.svelte';
    
    import {onMount, type  Snippet } from 'svelte';
    import { userStore } from '$lib/stores/user-store';
    import { goto } from '$app/navigation';

    let isLoading = $state(false);
    let loadingMessage = $state("Loading");

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();

    onMount(async () => {
        isLoading = true;
        try{
            // const isAdmin = await userStore.isAdmin();
            // if (!isAdmin) {
            //     goto('/');
            // }
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <FullScreenSpinner message={loadingMessage} />
{:else}
    {@render children()}
{/if}


