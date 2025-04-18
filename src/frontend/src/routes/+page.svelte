<script lang="ts">
   import { onMount } from "svelte";

   import FullScreenSpinner from "$lib/components/shared/full-screen-spinner.svelte";

   let isLoading = $state(true);
   let loadingMessage = $state("Loading Homepage");

   onMount(async () => {
      await loadData();
   });

   async function loadData() {
      isLoading = true;
      try {
         //TODO: get tournament data
         //TODO: get leaderboard data
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
      
   </div>
{/if}




