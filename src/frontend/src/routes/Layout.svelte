<!-- Parent.svelte -->
<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { userStore } from "$lib/stores/user-store";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import "../app.css";
  import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";
  import { appStore } from "$lib/stores/app-store";
  import { initAuthWorker } from "$lib/services/worker-auth.service";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import Navigation from "$lib/components/shared/navigation.svelte";
  import Landing from "$lib/components/landing/landing.svelte";
  import Header from "$lib/components/shared/header.svelte";
  import NewUser from "$lib/components/profile/new-user.svelte";
    import { page } from "$app/state";

  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let isLoading = true;
  let isLoggedIn = false;
  let selectedRoute: 'home' | 'governance' | 'whitepaper' = 'home';
  let expanded = false;
  let principalId: string | undefined;
  let user: any | undefined = undefined;

  $: isWhitepaper = browser && page.url.pathname === "/whitepaper";

  // Initialize the app
  const init = async () => {
    await Promise.all([syncAuthStore()]);
    worker = await initAuthWorker();
  };

  // Sync the auth store
  async function syncAuthStore() {
    if (!browser) return;
    try {
      await authStore.sync();
    } catch (err: unknown) {
      console.error(err);
    }
  }
  onMount(() => {

    let unsubscribe: () => void;

    (async () => {
      try {
        await appStore.checkServerVersion();
        await authStore.sync();

        unsubscribe = authStore.subscribe((store) => {
          isLoggedIn = store.identity !== null && store.identity !== undefined;
          if (isLoggedIn) {
            principalId = store.identity?.getPrincipal().toString();
            if (principalId) {
              user = userStore.getProfile(principalId);
              isLoading = false;
            }
          }
        });
      } catch (error) {
        console.error('Error syncing auth store:', error);
      } finally {
      }
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });

  $: worker, $authStore, (() => worker?.syncAuthIdle($authStore))();

  $: (() => {
    if (!browser || $authStore === undefined) return;
    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
  })();

  // Toggle navigation
  function toggleNav() {
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