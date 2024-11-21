<script lang="ts">
  import Bands from "./modals/bands.svelte";
  import BuildIt from "./modals/build-it.svelte";
  import Mulligans from "./modals/mulligans.svelte";
  import NextUp from "./modals/next-up.svelte";
  import { onMount } from "svelte";

  let showMulligans = false;
  let showBands = false;
  let showBuildIt = false;
  let showNextUp = false;
  
  onMount(() => {
      window.scrollTo(0, 0);
  });

  function openMulligans(){
    showMulligans = true;
  }

  function closeMulligans(){
    showMulligans = false;
  }
  
  function openBands(){
    showBands = true;
  }

  function closeBands(){
    showBands = false;
  }
  
  function openBuildIt(){
    showBuildIt = true;
  }

  function closeBuiltIt(){
    showBuildIt = false;
  }
  
  function openNextUp(){
    showNextUp = true;
  }

  function closeNextUp(){
    showNextUp = false;
  }
</script>

{#if showMulligans}
  <Mulligans closeModal={closeMulligans} visible={showMulligans} />
{/if}

{#if showBands}
  <Bands closeModal={closeBands} visible={showBands} />
{/if}

{#if showBuildIt}
  <BuildIt closeModal={closeBuiltIt} visible={showBuildIt} />
{/if}

{#if showNextUp}
  <NextUp closeModal={closeNextUp} visible={showNextUp} />
{/if}

<div class="flex flex-col space-y-4 text-base">
  <h2 class="text-2xl font-black text-black condensed">OUR NEW GAMES</h2>
    
  <p>We want <span class="condensed">GOLFPAD</span> to have everything a user needs to play, learn and socialise with the world's community of golfers. 
    Initially we have designed 4 new game formats for golfers to enjoy on our platform, with the DAO deciding on future additions. 
  </p>
  <p>
    Our first 4 games will be released in the following order and are described in the following sections:
  </p>

  <div class="flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2">
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <img src="prophet.png" alt="mulligans" class="w-full" />
      <p class="text-3xl text-center condensed md:text-lg">MULLIGANS</p>
      <button on:click={openMulligans} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <img src="bands.png" alt="bands" class="w-full" />
      <p class="text-3xl text-center condensed md:text-lg">BANDS</p>
      <button on:click={openBands} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <img src="build-it.png" alt="build-it" class="w-full" />
      <p class="text-3xl text-center condensed md:text-lg">BUILD IT</p>
      <button on:click={openBuildIt} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <img src="next-up.png" alt="next-up" class="w-full" />
      <p class="text-3xl text-center condensed md:text-lg">NEXT UP</p>
      <button on:click={openNextUp} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">Info</button>
    </div>
  </div>
</div>
