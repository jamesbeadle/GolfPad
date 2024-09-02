<script lang="ts">
  import Layout from "../Layout.svelte";
  import BlackLogoIcon from "$lib/icons/logo-icon.svelte";

  import Vision from "$lib/components/whitepaper/vision.svelte";
  import Product from "$lib/components/whitepaper/product.svelte";
  import DAO from "$lib/components/whitepaper/dao.svelte";
  import Marketing from "$lib/components/whitepaper/marketing.svelte";
  import RoadMap from "$lib/components/whitepaper/roadmap.svelte";
  import Team from "$lib/components/whitepaper/team.svelte";
  import SystemArchitecture from "$lib/components/whitepaper/system-architecture.svelte";

  let activeTab = "vision";
  let cropPositionY = "top";

  const tabs = [
    { name: "Vision", component: Vision },
    { name: "Product", component: Product },
    { name: "DAO", component: DAO },
    { name: "Marketing", component: Marketing },
    { name: "Road Map", component: RoadMap },
    { name: "Team", component: Team },
    { name: "System Architecture", component: SystemArchitecture },
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
</script>

<Layout>
  <div class="p-2 px-4 text-black h-full w-full">
    <h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed tracking-tight leading-tight">
      GOLFPAD WHITEPAPER
    </h2>
    <div class="w-full flex flex-col md:flex-row">
      <img 
        src="hero.png" 
        alt="hero" 
        class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg" 
        style="--crop-position-y: {cropPositionY};"
      />

      <div class="w-full md:w-3/4 px-2 mt-4 md:mt-0">
        {#each tabs as { name, component }}
          {#if activeTab === name.toLowerCase()}
            <div class="flex flex-col">
              <div class="flex">
                <svelte:component this={component} />
              </div>

              <div class="flex flex-col text-xs mt-8">
                <div class="flex flex-row space-x-2">
                  <button
                    class="w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white"
                    on:click={prevTab}
                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === 0}
                  >
                    Prior Section
                  </button>
                  <button
                    class="w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white"
                    on:click={nextTab}
                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === tabs.length - 1}
                  >
                    Next Section
                  </button>
                </div>
                <div class="flex flex-row justify-center my-4">
                  {#each tabs as _, index}
                    <div class="pip" class:is-active={isActiveTab(index)}></div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</Layout>

<style>
  .pip {
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 50%;
    margin: 0 2px;
  }
  
  .pip.is-active {
    @apply bg-GolfPadBlue;
  }

  @media (min-width: 640px) {
    .pip {
      width: 12px;
      height: 12px;
    }
  }
</style>
