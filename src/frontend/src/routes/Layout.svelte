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
    import exp from "constants";
    import Toasts from "$lib/components/toasts/toasts.svelte";
    import Navigation from "$lib/components/shared/navigation.svelte";

  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  let isLoading = true;
  let isLoggedIn = false;
  let showApps = writable(false);
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
      
      <div class="relative flex flex-col min-h-screen">
        <div class="flex-none h-[80px] relative">
          <div class="absolute z-10 top-4 left-4">
            <button
              on:click={toggleNav}
              class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">
              +
            </button>
          </div>
          <div class="absolute z-10 top-4 right-4">
            <a href="/">
              <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
            </a>
          </div>
        </div>

        <Navigation {expanded} {selectedRoute} {toggleNav}/>

        <div class="{isHomepage ? 'bg-BrandYellow  items-center justify-center relative' : 'bg-white'} flex-1 flex">
          <slot />
        </div>

        {#if !isHomepage}
        <div class="bg-BrandYellow flex-none relative h-[50px] mt-auto">
          <div class="absolute z-10 bottom-4 left-4">
            <a href="/whitepaper" class="text-sm font-medium text-black">WHITEPAPER |</a> 
            <a href="/team" class="text-sm font-medium text-black">TEAM |</a> 
            <a target="_blank" href="https://github.com/jamesbeadle/golfpad" class="text-sm font-medium text-black">GITHUB</a> 
          </div>
        </div>
        {/if}
      </div>

      <Toasts />
    {/if}
  </div>
{/await}
