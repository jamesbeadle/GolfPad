<script lang="ts">
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  
  import {
    initAuthWorker,
    type AuthWorker,
  } from "../lib/services/worker-auth.service";
  import { authStore, type AuthStoreData } from "../lib/stores/auth-store";


  import Navigation from "../lib/components/shared/navigation.svelte";
  import Landing from "../lib/components/landing/landing.svelte";
  import Header from "../lib/components/shared/header.svelte";
  import NewUser from "../lib/components/profile/new-user.svelte";
  import FullScreenSpinner from "../lib/components/shared/full-screen-spinner.svelte";
  import Toasts from "../lib/components/toasts/toasts.svelte";
  import "../app.css";
  import { onMount } from "svelte";
    import { toasts } from "$lib/stores/toasts-store";


  let isLoggedIn = false;
  let worker: AuthWorker | undefined;
  let expanded = false;
  let selectedRoute: 'home' | 'governance' | 'whitepaper' = 'home';
  let isLoading = true;

  const init = async () => {
    await Promise.all([syncAuthStore()]);
    worker = await initAuthWorker();
  };

  const syncAuthStore = async () => {
    if (!browser) { return; }

    try {
      await authStore.sync();
    } catch (err: unknown) {
      toasts.addToast( { message: "Unexpected issue while syncing the status of your authentication.",
      type: "error" });
    }
  };

  const syncAuth = async (auth: AuthStoreData) => {
    worker?.syncAuthIdle(auth);

    if (!auth.identity) {
      isLoggedIn = false;
      return;
    }

    // syncAuth is triggered each time the auth changes but also when the worker is initialized to avoid race condition.
    // As the function can be called twice with a valid identity, we use a flag to only init the data once.
    if (isLoggedIn) {
      return;
    }

    isLoggedIn = true;
  };

  onMount(async () => {
    worker = await initAuthWorker();
    await syncAuth($authStore);
    isLoading = false;
  });

  $: syncAuth($authStore);


  $: isWhitepaper = browser && page.url.pathname === "/whitepaper";

  function toggleNav() {
    expanded = !expanded;
  }


  $: (() => {
    if (!browser) {
      return;
    }

    if ($authStore === undefined) {
      return;
    }

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();

  
</script>

<svelte:head>
  <link rel="preload" href="/MonaSans-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSans-SemiBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-ExtraBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<svelte:window on:storage={syncAuthStore} />

{#await init()}
  <FullScreenSpinner />
{:then _}


  <div class="flex flex-col min-h-screen default-text">
    {#if isLoading}
      <FullScreenSpinner />
    {:else}
      <Header {toggleNav} />  
      {#if isWhitepaper}
        <div class="bg-white text-black flex-1 flex">
          <slot />
        </div>
      {:else}

        {#if isLoggedIn}
        <p>Logged in</p>

        {:else}
        <Landing />

        {/if}
        
      {/if}
      <Navigation {expanded} {selectedRoute} {toggleNav}/>
      <Toasts />
    {/if}
  </div>

{/await}