<script lang="ts">
    import Bands from "./modals/bands.svelte";
    import BuildIt from "./modals/build-it.svelte";
    import Mulligans from "./modals/mulligans.svelte";
    import NextUp from "./modals/next-up.svelte";

    let showMulligans = false;
    let showBands = false;
    let showNextUp = false;
    let showBuildIt = false;

</script>

{#if showMulligans}
  <Mulligans  />
{/if}

{#if showBands}
  <Bands />
{/if}

{#if showBuildIt}
  <BuildIt />
{/if}

{#if showNextUp}
  <NextUp />
{/if}

<div class="md:px-4">
  <h2 class="mb-2 text-2xl tracking-wide condensed">
    OUR NEW GAMES
  </h2>

  <div class="space-y-4">
    <p class="relative">
      We’re excited to introduce <span class="condensed">FOUR</span> new game formats designed with the next generation of golfers in mind. These fresh takes on the sport offer opportunities to challenge yourself, refine your skills, and enjoy the game in new ways. Whether you’re aiming for serious competition or just some lighthearted fun, these formats have something for everyone.
    </p>
    
    <p class="relative">
      Blending the traditions of golf with creative innovations, each format adds a unique twist to the game. Some reimagine classic rules for a modern edge, while others take an entirely new approach to keep things fresh and engaging. They’re designed to make every round memorable, no matter your skill level.
    </p>

    <p class="relative">
      In the following sections, you’ll learn what makes each format stand out and why they’re worth trying. With <span class="condensed">GOLFPAD</span>, golf’s rich history and exciting future come together, offering new ways to play, compete, and grow.
    </p>
  </div>

  <div
    class="flex flex-col w-full pt-4 mt-2 space-y-4 md:flex-row md:space-y-0 md:space-x-2"
  >
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="overflow-hidden aspect-square rounded-2xl">
        <img
          src="game-images/mulligans.jpg"
          alt="mulligans"
          class="object-fill w-full h-full"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">MULLIGANS</p>
      <button
        onclick={() => { showMulligans = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>

    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="overflow-hidden aspect-square rounded-2xl">
        <img
          src="game-images/bands.jpg"
          alt="bands"
          class="object-cover w-full h-full"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BANDS</p>
      <button
          onclick={() => { showBands = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>

    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="overflow-hidden ">
        <img
          src="game-images/next-up.jpg"
          alt="next-up"
          class="object-cover w-full h-full"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">NEXT UP</p>
      <button
      onclick={() => { showNextUp = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>

    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="overflow-hidden aspect-square rounded-2xl">
        <img
          src="game-images/build-it.jpg"
          alt="build-it"
          class="object-cover w-full h-full"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BUILD IT</p>
      <button
      onclick={() => { showBuildIt = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>
  </div>
</div>