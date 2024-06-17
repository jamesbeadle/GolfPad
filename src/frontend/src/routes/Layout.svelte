<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { initAuthWorker } from "$lib/services/worker.auth.services";
  import { authStore, type AuthSignInParams, type AuthStoreData } from "$lib/stores/auth-store";
  import { BusyScreen, Spinner } from "@dfinity/gix-components";
  import { fade } from "svelte/transition";
  import LogoIcon from "$lib/icons/logo-icon.svelte";
  import "../app.css";
  import MenuIcon from "$lib/icons/menu-icon.svelte";
    import { authSignedInStore } from "$lib/derived/auth.derived";
    import { goto } from "$app/navigation";

  let expanded = false;
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let buttonHeight = 0;
  let sidebar: HTMLElement;

  const init = async () => await Promise.all([syncAuthStore()]);
  
  $: links = $authSignedInStore ? [
    { name: 'Connect', href: '#' },
  ] : 
  [
    { name: 'Connect', href: '#' },
  ];

  let lessImportantOptions = [
    { name: 'Lightpaper', href: '/lightpaper' }
  ];

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

  const updateSidebarHeight = () => {
    if (browser) {
      requestAnimationFrame(() => {
        const button = document.querySelector(".menu-row");
        if (button) {
          buttonHeight = button.clientHeight;
          const sidebarHeight = window.innerHeight - buttonHeight;
          document.documentElement.style.setProperty('--sidebar-height', `${sidebarHeight}px`);
        }
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (browser && expanded && sidebar && !sidebar.contains(event.target as Node)) {
      expanded = false;
    }
  };

  const handleButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    expanded = !expanded;
  };

  const handleCloseButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    expanded = false;
  };

  onMount(async () => {
    worker = await initAuthWorker();
    if (browser) {
      window.addEventListener('resize', updateSidebarHeight);
      document.addEventListener('click', handleClickOutside);
    }
    requestAnimationFrame(() => {
      updateSidebarHeight();
    });

  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', updateSidebarHeight);
    }
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
  <div class="menu-row flex items-center bg-Brand5b w-full p-2">
    <button on:click={handleButtonClick} class="flex items-center">
      <MenuIcon fill='#FFFFFF' className="w-5 m-1" />
    </button>
    <div class="ml-auto">
      <a class="flex flex-row items-center ml-auto" href="/">
        <p class="text-sm">OpenCare</p>
        <LogoIcon fill='#FFFFFF' className="w-4 m-1" />
      </a>
    </div>
  </div>

<aside class="bg-Brand5 p-4" bind:this={sidebar} class:expanded={expanded}>
  <div class="p-2">
    <div class="p-2 flex justify-between items-center">
      <h2 class="text-xl font-bold p-2">Options</h2>
      <button on:click={handleCloseButtonClick} class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
    
    <ul class="mt-4 space-y-2">
      {#each links as option}
        <li>
          
          {#if option.name === 'Connect'}

            {#if $authSignedInStore}
              <a href={option.href} class="block rounded hover:bg-Brand5b px-4 py-2" on:click={handleLogout}>Disconnect</a>
            {:else}
              <a href={option.href} class="block rounded hover:bg-Brand5b px-4 py-2" on:click={handleLogin}>Connect</a>
            {/if}
          {:else}
            <a href={option.href} class="block rounded hover:bg-Brand5b px-4 py-2">{option.name}</a>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  <div class="less-important p-2">
    <div class="horizontal-divider my-2" />
    <ul class="space-y-2 text-xs">
      {#each lessImportantOptions as option}
        <li>
          <a href={option.href} class="block rounded hover:bg-Brand5b px-4 py-2">{option.name}</a>
        </li>
      {/each}
    </ul>
  </div>
</aside>
  <div class="flex">
    <div class="flex-1 p-4">
      <slot />
    </div>
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
