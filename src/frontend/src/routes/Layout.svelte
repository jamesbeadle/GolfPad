<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { authStore, type AuthSignInParams, type AuthStoreData } from "$lib/stores/auth-store";
  import { BusyScreen, Spinner } from "@dfinity/gix-components";
  import "../app.css";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
  
  let expanded = false;
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let buttonHeight = 0;
  let sidebar: HTMLElement;
  let heightSet = false;

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
    
  });

  onDestroy(() => {
    
  });

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
</script>

<svelte:window on:storage={syncAuthStore} />
{#await init()}
  <div in:fade>
    <Spinner />
  </div>
{:then _}
  
<div class="flex h-screen flex-col relative">
  <!-- Header Section -->
  <div class="bg-GolfPadYellow flex-none relative h-[80px]">
      <div class="absolute top-4 left-4 z-10">
          <button class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              +
          </button>
      </div>
      <div class="absolute top-4 right-4 z-10">
          <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
      </div>
  </div>

  <!-- Main Section -->
  <div class="{isHomepage ? 'bg-GolfPadYellow' : 'bg-white'} flex-1 flex items-center justify-center overflow-hidden relative">
      <slot />
  </div>

  <!-- Footer: Only show if not on homepage -->
  {#if !isHomepage}
  <div class="bg-GolfPadYellow flex-none relative h-[50px]"> 
      <div class="absolute bottom-4 left-4 z-10">
          <a href="/whitepaper" class="text-black text-sm font-medium">WHITEPAPER</a>
      </div>
  </div>
  {/if}
</div>

{/await}

<BusyScreen />

<style>
  aside {
    position: absolute;
    left: -500px;
    transition: all 0.5s;
    height: var(--sidebar-height);
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  aside.expanded {
    left: 0px;
  }
</style>
