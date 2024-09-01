<script lang="ts">
    import Mulligans from "./mulligans.svelte";


  let showMulligans = false;

  function openMulligans(){
    showMulligans = true;
  }

  function closeMulligans(){
    showMulligans = false;
  }
</script>

{#if showMulligans}
  <Mulligans closeModal={closeMulligans} visible={showMulligans} />
{/if}

<div class="flex flex-col space-y-2 text-base">
  <h1 class="text-xl condensed">Product</h1>
    
  <p>We want GolfPad to have everything a user needs to play, learn and socialise with the world's community of golfers. 
    We will introduce users to 4 new games initially, showing how new formats introduce a new dimension of fun. 
  </p>
  <p>
    Our first 4 games will be released in the following order and are described in the following sections:
  </p>

  <div class="w-full flex flex-row space-x-2">
    <div class="w-1/4 flex flex-col space-y-2">
      <img src="mulligans.png" alt="mulligans" class="w-full" />
      <p class="condensed text-lg">MULLIGANS</p>
      <button on:click={openMulligans} class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs">Info</button>
    </div>
    <div class="w-1/4 flex flex-col space-y-2">
      <img src="bands.png" alt="bands" class="w-full" />
      <p class="condensed text-lg">BANDS</p>
      <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs">Info</button>
    </div>
    <div class="w-1/4 flex flex-col space-y-2">
      <img src="build-it.png" alt="build-it" class="w-full" />
      <p class="condensed text-lg">BUILD IT</p>
      <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs">Info</button>
    </div>
    <div class="w-1/4 flex flex-col space-y-2">
      <img src="next-up.png" alt="next-up" class="w-full" />
      <p class="condensed text-lg">NEXT UP</p>
      <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs">Info</button>
    </div>
  </div>
</div>