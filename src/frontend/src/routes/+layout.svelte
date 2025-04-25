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
  import PortalHost from 'svelte-portal';
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
        await initUserProfile({ identity });
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

<svelte:window on:storage={authStore.sync} />

{#if browser && isLoading}
  <div in:fade>
    <FullScreenSpinner  message='Loading GolfPad' />
  </div>
{:else}
  <div class="flex flex-col min-h-screen default-text">
    <LayoutController>
      <div class="mx-4 mt-2">
        {@render children()}
      </div>
    </LayoutController>
    <Toasts />
    <PortalHost />
  </div>
{/if}