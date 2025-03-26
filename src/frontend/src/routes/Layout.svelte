<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  
  import type { Profile } from "../../../declarations/backend/backend.did";
  import { initAuthWorker, type AuthWorker } from "$lib/services/worker-auth.service";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { userStore } from "$lib/stores/user-store";
  import { toasts } from "$lib/stores/toasts-store";

  import Navigation from "$lib/components/shared/navigation.svelte";
  import Landing from "$lib/components/landing/landing.svelte";
  import Header from "$lib/components/shared/header.svelte";
  import FullScreenSpinner from "../lib/components/shared/full-screen-spinner.svelte";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import NewUser from "$lib/components/profile/new-user.svelte";
  import "../app.css";
  
  let worker: AuthWorker | undefined;
  let expanded = false;
  let selectedRoute: 'home' | 'governance' | 'whitepaper' = 'home';
  let isLoading = true;
  let isLoggedIn = false;
  let user: Profile | null = null

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

    if (isLoggedIn) {
      return;
    }

    isLoggedIn = true;
  };

  onMount(async () => {
    worker = await initAuthWorker();
    await syncAuth($authStore);
    let principalId = $authStore.identity?.getPrincipal();
    if(!principalId){
      isLoading = false;
      return;
    }
    let profileResult = await userStore.getProfile(principalId.toString());
    if(profileResult){
      user = profileResult;
    }
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
  <div class="flex flex-col min-h-screen bg-white default-text">
    {#if isLoading}
      <FullScreenSpinner />
    {:else}
      <Header {toggleNav} />  
      {#if isWhitepaper}
        <div class="flex flex-1 text-black bg-white">
          <slot />
        </div>
      {:else}
        {#if isLoggedIn}
          {#if user}
            <slot></slot>
          {:else}
            <NewUser />
          {/if}
        {:else}
          <Landing />
        {/if}
      {/if}
      <Navigation {expanded} {selectedRoute} {toggleNav}/>
      <Toasts />
    {/if}
  </div>
{/await}