<script lang="ts">
    import { authSignedInStore } from '$lib/derived/auth.derived';
    import { userIdCreatedStore } from '$lib/stores/user-control-store';
    import { userStore } from '$lib/stores/user-store';
    import { get } from 'svelte/store';
    import { onMount, type Snippet } from 'svelte';

    import Navigation from '$lib/components/shared/navigation.svelte';
    import Header from '$lib/components/shared/header.svelte';
    import FullScreenSpinner from '$lib/components/shared/full-screen-spinner.svelte';
    import NewUser from '$lib/components/profile/new-user.svelte';
    import Landing from '$lib/components/landing/landing.svelte';

    interface Props {
        children: Snippet;
    }
    let { children }: Props = $props();
    let isMenuOpen = $state(false);
    let isLoading = $state(false);

    function toggleNav() {
        isMenuOpen = !isMenuOpen;
    }
</script>

{#if isLoading}
    <FullScreenSpinner message="Loading..." />
{:else if $authSignedInStore}
<div class="bg-white">
    <Navigation expanded={isMenuOpen} {toggleNav}/>
    <Header {toggleNav} />
    <!-- {#if $userIdCreatedStore?.data} -->
        
            {@render children()}
    <!-- {:else}
        <NewUser />
    {/if} -->
    </div>
{:else}
    <Navigation expanded={isMenuOpen} {toggleNav}/>
    <Header {toggleNav} />
    <Landing />
{/if}

<!-- TODO: add whitepaper and game rules to public -->
