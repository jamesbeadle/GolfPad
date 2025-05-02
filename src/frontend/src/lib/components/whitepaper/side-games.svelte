<script lang="ts">
    import Bombs from "./modals/bombs.svelte";
    import Bullseye from "./modals/bullseye.svelte";
    import PinHigh from "./modals/pin-high.svelte";

    let showBombs = false;
    let showPinHigh = false;
    let showBullseye = false;
</script>

{#if showBombs}
    <Bombs closeModal={() => { showBombs = false }} visible={showBombs} />
{/if}

{#if showPinHigh}
    <PinHigh closeModal={() => { showPinHigh = false}} visible={showPinHigh} />
{/if}

{#if showBullseye}
    <Bullseye closeModal={() => { showBullseye = false }} visible={showBullseye} />
{/if}
<div class="md:px-4">
  <h2 class="text-2xl condensed tracking-wide mb-2">
    OUR AI POWERED SIDE GAMES
  </h2>

  <div class="space-y-4">
    <p class="relative">
      We’re excited to unveil <span class="condensed">THREE</span> groundbreaking AI-powered side game formats, designed to revolutionise the way you practice and enhance your social golf experience—no matter where you are in the world.
    </p>
    <p class="relative">
      These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.
    </p>
    <p class="relative">
      These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.
    </p>
  </div>

  <div
    class="pt-4 flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2 mt-2 mb-32"
  >
    <div class="flex flex-col w-full space-y-2 md:w-1/3">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img
          src="game-images/bombs.jpg"
          alt="bombs"
          class="w-full h-full object-fill"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BOMBS</p>
      <button
        onclick={() => { showBombs = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>

    <div class="flex flex-col w-full space-y-2 md:w-1/3">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img
          src="game-images/pin-high.jpg"
          alt="pin-high"
          class="w-full h-full object-cover"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">PIN HIGH</p>
      <button
      onclick={() => { showPinHigh = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>

    <div class="flex flex-col w-full space-y-2 md:w-1/3">
      <div class=" overflow-hidden">
        <img
          src="game-images/bullseye.jpg"
          alt="bullseye"
          class="w-full h-full object-cover"
        />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BULLSEYE</p>
      <button
      onclick={() => { showBullseye = true; }}
        class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow"
      >
        More Info
      </button>
    </div>
  </div>
</div>