<script lang="ts">
  import Vision from "$lib/components/whitepaper/vision.svelte";
  import Merve from "$lib/components/whitepaper/merve.svelte";
  import SideGames from "$lib/components/whitepaper/side-games.svelte";
  import NewGames from "$lib/components/whitepaper/new-games.svelte";
  import Marketing from "$lib/components/whitepaper/marketing.svelte";
  import RoadMap from "$lib/components/whitepaper/roadmap.svelte";

  let activeTab = "vision";
  let cropPositionY = "top";

  const tabs = [
    { name: "Vision", component: Vision },
    { name: "Merve", component: Merve },
    { name: "New Games", component: NewGames },
    { name: "Side Games", component: SideGames },
    { name: "Marketing", component: Marketing },
    { name: "Road Map", component: RoadMap }
  ];

  function nextTab(): void {
    const currentIndex = tabs.findIndex(tab => tab.name.toLowerCase() === activeTab);
    if (currentIndex < tabs.length - 1) {
      activeTab = tabs[currentIndex + 1].name.toLowerCase();
    }
  }

  function prevTab(): void {
    const currentIndex = tabs.findIndex(tab => tab.name.toLowerCase() === activeTab);
    if (currentIndex > 0) {
      activeTab = tabs[currentIndex - 1].name.toLowerCase();
    }
  }

  function isActiveTab(index: number): boolean {
    return tabs[index].name.toLowerCase() === activeTab;
  }

  function setActiveTab(index: number): void {
    activeTab = tabs[index].name.toLowerCase();
  }
</script>

  <div class="w-full h-full p-2 px-4 text-black">
    <h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed">
      GOLFPAD WHITEPAPER
    </h2>
    <div class="flex flex-col w-full md:flex-row">
      <img 
        src="mulligans.png" 
        alt="hero" 
        class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg" 
        style="--crop-position-y: {cropPositionY};"
      />

      <div class="w-full px-2 mt-4 md:w-3/4 md:mt-0">
        {#each tabs as { name, component }, index}
          {#if activeTab === name.toLowerCase()}
            <div class="flex flex-col">
              <div class="flex">
                <svelte:component this={component} />
              </div>

              <div class="flex flex-col mt-8 text-xs">
                <div class="flex flex-row space-x-2">
                  <button
                    class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white"
                    on:click={prevTab}
                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === 0}
                  >
                    Previous Section
                  </button>
                  <button
                    class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white"
                    on:click={nextTab}
                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === tabs.length - 1}
                  >
                    Next Section
                  </button>
                </div>
                <div class="flex flex-row justify-center my-4">
                  {#each tabs as _, index}
                    <button 
                    class={`
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-0.5 cursor-pointer border-none
                      ${isActiveTab(index) ? 'bg-BrandBlue' : 'bg-gray-500 hover:bg-gray-600'}
                    `} 
                      on:click={() => setActiveTab(index)}
                      aria-label={`Go to ${tabs[index].name} section`}
                    ></button>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>