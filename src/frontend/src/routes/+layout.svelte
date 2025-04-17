<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";

  import { browser } from "$app/environment";
  import { initAuthWorker } from "$lib/services/worker.auth.services";
  import { displayAndCleanLogoutMsg } from "$lib/services/auth.services";
  import { authStore, type AuthStoreData } from "$lib/stores/auth-store";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import { initUserProfile } from "$lib/services/user-profile-service";
  
  import LayoutController from "$lib/components/shared/layout-controller.svelte";
  import FullScreenSpinner from "../lib/components/shared/full-screen-spinner.svelte";
  import Toasts from "$lib/components/toasts/toasts.svelte";
  import "../app.css";

  interface Props { children: Snippet }
  let { children }: Props = $props();
  
  let worker: { syncAuthIdle: (auth: AuthStoreData) => void } | undefined;
  let expanded = $state(false);
  let isLoading = $state(true);

  onMount(async () => {
    if (browser) {
      document.querySelector('#app-spinner')?.remove();
    }
    await init();
    const identity = get(authStore).identity;
    if (identity) {
      try {
        //await initUserProfile({ identity });
      } catch (err) {
        console.error('Error mounting Football God:', err);
      }
    }
    worker = await initAuthWorker();
    isLoading = false;
  });

  const init = async () => {
    if (!browser) return;
    await authStore.sync();
    displayAndCleanLogoutMsg();
  };

</script>

<svelte:head>
  <link rel="preload" href="/MonaSans-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSans-SemiBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-ExtraBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/MonaSansCondensed-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<svelte:window on:storage={authStore.sync} />

{#if browser && isLoading}
  <div in:fade>
    <FullScreenSpinner  message='Loading Football God' />
  </div>
{:else}
  <div class="flex flex-col min-h-screen bg-white default-text">
    <LayoutController>
      <div class="mx-4 mt-6">
        {@render children()}
      </div>
    </LayoutController>
    <Toasts />
  </div>
{/if}