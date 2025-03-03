<script lang="ts">
  import { onMount } from "svelte"; 
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

  import { userStore } from "$lib/stores/user-store";
  import { authStore, type AuthSignInParams, type AuthStoreData } from "$lib/stores/auth-store";
  import "../app.css";
  
  import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
  import { appStore } from "$lib/stores/app-store";
    import { writable } from "svelte/store";
    import { initAuthWorker } from "$lib/services/worker-auth.service";
    import Toasts from "$lib/components/toasts/toasts.svelte";
    import Navigation from "$lib/components/shared/navigation.svelte";
    import Landing from "$lib/components/landing/landing.svelte";
    import Header from "$lib/components/shared/header.svelte";

  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  let isLoading = true;
  let isLoggedIn = false;
  let selectedRoute: 'home' | 'whitepaper' = 'home';
  let expanded = false;

  $: isHomepage = browser && window.location.pathname === "/";

  const init = async () => {
    await Promise.all([syncAuthStore()]);
    worker = await initAuthWorker();
  };

  async function syncAuthStore() {
    if (!browser) return;
    try {
      await authStore.sync();
    } catch (err: unknown) {
      console.error(err);
    } finally {
    }
  }

  onMount(async () => {
    try{
      authStore.subscribe((store) => {
          isLoggedIn = store.identity !== null && store.identity !== undefined;
          userStore.sync();
      });
      await appStore.checkServerVersion();
    } catch {

    } finally {

      expanded = false;
      isLoading = false;
    }
  });

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();

  $: (() => {
    if (!browser || $authStore === undefined) return;
    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();

  async function toggleNav() {
    expanded = !expanded;
  }

</script>

<svelte:window on:storage={syncAuthStore} />

{#await init()}
  <div in:fade>
    <FullScreenSpinner />
  </div>
{:then _}
  <div class="flex flex-col min-h-screen default-text">
    {#if isLoading}
      <FullScreenSpinner />
    {:else}
      <Header {toggleNav} />
      {#if isLoggedIn}
        <div class="bg-white flex-1 flex">
          <slot />
        </div>
      {:else}
        <Landing />
      {/if}
      <Navigation {expanded} {selectedRoute} {toggleNav}/>
      <Toasts />
    {/if}
  </div>
{/await}
