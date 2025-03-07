<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { initAuthWorker } from "$lib/services/worker-auth.service";
  
  import { userStore } from "$lib/stores/user-store";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { appStore } from "$lib/stores/app-store";
  
  import type { Profile } from "../../../declarations/backend/backend.did";
  import Navigation from "$lib/components/shared/navigation.svelte";
  import Landing from "$lib/components/landing/landing.svelte";
  import Header from "$lib/components/shared/header.svelte";
  import NewUser from "$lib/components/profile/new-user.svelte";
  import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import "../app.css";
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let isLoading = true;
  let isLoggedIn = false;
  let selectedRoute: 'home' | 'governance' | 'whitepaper' = 'home';
  let expanded = false;
  let user: Profile | null = null;

  $: isWhitepaper = browser && page.url.pathname === "/whitepaper";

  const init = async () => {
    await Promise.all([syncAuthStore()]);
    worker = await initAuthWorker();
    await Promise.all([syncUser()]);
  };

  async function syncUser(){
    let principalId = $authStore.identity?.getPrincipal().toString();
    if(principalId){
      user = await userStore.getProfile(principalId);
    }
  }

  async function syncAuthStore() {
    if (!browser) return;
    try {
      await authStore.sync();
      isLoggedIn = $authStore.identity !== null && $authStore.identity !== undefined;
    } catch (err: unknown) {
      console.error(err);
    }
  }
  
  onMount(async () => {
    try{
      await appStore.checkServerVersion();
    } catch {
      console.error("error syncing version");
    } finally {
      isLoading = false;
    }
  });

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();

  $: (() => {
    if (!browser || $authStore === undefined) return;
    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();

  function toggleNav() {
    expanded = !expanded;
  }
</script>

<svelte:window on:storage={syncAuthStore} />

<svelte:head>
  <link rel="preload" href="/MonaSans-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSans-SemiBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-ExtraBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

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
      {#if isWhitepaper}
        <div class="bg-white text-black flex-1 flex">
          <slot />
        </div>
      {:else}
        {#if isLoggedIn}
          {#if user}
            <div class="bg-white text-black flex-1 flex">
              <slot />
            </div>
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