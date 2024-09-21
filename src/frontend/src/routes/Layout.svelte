<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { browser } from "$app/environment";
  import { authStore, type AuthSignInParams, type AuthStoreData } from "$lib/stores/auth-store";
  import { BusyScreen, Spinner } from "@dfinity/gix-components";
  import "../app.css";
  import { authSignedInStore } from "$lib/derived/auth-derived";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import NavOverlay from "$lib/components/shared/navigation.svelte";

  let expanded = false;
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;

  let selectedRoute: 'home' | 'whitepaper' = 'home';
  const init = async () => await Promise.all([syncAuthStore()]);

  const syncAuthStore = async () => {
    if (!browser) {
      return;
    }

    try {
      await authStore.sync();
    } catch (err: unknown) {
      console.error("Error syncing auth store", err);
    }
  };

  $: isHomepage = browser && window.location.pathname === "/";

  onMount(async () => {
    expanded = false;
  });

  onDestroy(() => {});

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();

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

  function handleLogin() {
    let params: AuthSignInParams = {
      domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
    };
    authStore.signIn(params);
  }

  function handleLogout() {
    authStore.signOut();
    goto("/");
  }

  function toggleNav(): void {
    expanded = !expanded;
    console.log(expanded)
  }

  function selectRoute(route: 'home' | 'whitepaper'): void {
    selectedRoute = route;
    expanded = false;
    goto(`/${route}`);
  }
</script>

<svelte:window on:storage={syncAuthStore} />

{#await init()}
  <div in:fade>
    <Spinner />
  </div>
{:then _}
  
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

  <NavOverlay {expanded} {selectedRoute} {toggleNav}/>

  <div class="{isHomepage ? 'bg-GolfPadYellow  items-center justify-center relative' : 'bg-white'} flex-1 flex">
    <slot />
  </div>

  {#if !isHomepage}
  <div class="bg-GolfPadYellow flex-none relative h-[50px] mt-auto">
    <div class="absolute z-10 bottom-4 left-4">
      <a href="/whitepaper" class="text-sm font-medium text-black">WHITEPAPER |</a> 
      <a href="/team" class="text-sm font-medium text-black">TEAM |</a> 
      <a target="_blank" href="https://github.com/jamesbeadle/golfpad" class="text-sm font-medium text-black">GITHUB</a> 
    </div>
  </div>
  {/if}
</div>

{/await}

<BusyScreen />
