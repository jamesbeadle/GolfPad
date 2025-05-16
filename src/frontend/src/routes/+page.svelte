<script lang="ts">
   import { onMount } from "svelte";

   import FullScreenSpinner from "$lib/components/shared/global/full-screen-spinner.svelte";
   import Leaderboard from "$lib/components/leaderboard/leaderboard.svelte";

   let isLoading = $state(true);
   let loadingMessage = $state("Loading Homepage");

   onMount(async () => {
      await loadData();
   });

   async function loadData() {
      isLoading = true;
      try {
      } catch (error) {
         console.error(error);
      } finally {
         isLoading = false;
      }
   }

</script>

{#if isLoading}
   <FullScreenSpinner message={loadingMessage} />
{:else}
   <div>
      <Leaderboard />
   </div>
{/if}




