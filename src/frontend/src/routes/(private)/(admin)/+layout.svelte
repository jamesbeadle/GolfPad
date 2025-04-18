<script lang="ts">
    import FullScreenSpinner from '$lib/components/shared/full-screen-spinner.svelte';
    
    import {onMount, type  Snippet } from 'svelte';
    import { authStore } from '$lib/stores/auth-store';
    import { displayAndCleanLogoutMsg } from '$lib/services/auth.services';
    import { get } from 'svelte/store';
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
            //TODO: check if user is admin
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


