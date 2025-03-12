<script lang="ts">
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import Layout from "./Layout.svelte";
    import { onMount } from 'svelte';

    let loadingFeed = true;
    let showEventsModal = false;
    let results = [
        {
        game: "MULLIGANS",
        date: "10/24/24",
        course: "ROYAL DORNOCH",
        courseImage: "path/to/image.jpg",
        players: [
            { name: "Smith", score: 6, avatar: '' },
            { name: "Schauffele", score: 8, avatar: '' }
        ]
        }
    ];

    let events: { past: any[], current: any[], upcoming: any[] } = {
        past: [],
        current: [],
        upcoming: []
    };

    onMount(async () => {
        // Simulate fetching data
        setTimeout(() => {
            loadingFeed = false;
            // Mock data - replace with your actual API calls
            
            events = {
                past: [{ title: "Past Event", date: "2025-01-01" }],
                current: [{ title: "Live Event", date: "2025-03-11" }],
                upcoming: [{ title: "Upcoming Event", date: "2025-03-15" }]
            };
        }, 1000);
    });

    function toggleEventsModal() {
        showEventsModal = !showEventsModal;
    }
</script>

<Layout>
    <div class="flex flex-col md:flex-row gap-6 p-4 md:p-6 text-black">
        <div class="w-full md:w-2/3">
            {#if loadingFeed}
                <div class="flex justify-center items-center h-64">
                    <LocalSpinner />
                </div>
            {:else}
                <div class="rounded-lg p-4 max-h-[80vh] overflow-y-auto">
                    <header class="bg-white">
                        <div class="flex flex-col md:flex-row justify-between items-center py-4">
                            <h1 class="title">THE BUZZ</h1>
                            <h2 class="text-BrandDarkGray text-sm md:text-base">THE LATEST MATCHES</h2>
                        </div>
                    </header>
                    {#each results as result}
                        <div class="flex items-center justify-between shadow-md rounded-lg p-4 mb-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                                
                                    <img class="w-12 p-2" alt="mulligans" src="mulligans.png" />
                            </div>
                            <div>
                            <p class="text-BrandDarkGray text-sm">GAME</p>
                            <p class="text-xl condensed">{result.game}</p>
                            <p class="text-BrandDarkGray text-sm">{result.date}</p>
                            </div>
                        </div>

      <!-- Course Section -->
      <div class="flex items-center space-x-4">
        <img src={result.courseImage} alt={result.course} class="w-24 h-24 object-cover rounded-md" />
        <p class="text-xl font-bold">{result.course}</p>
      </div>

      <!-- Results Section -->
      <div class="flex items-center space-x-6">
        {#each result.players as player}
          <div class="flex items-center space-x-2">
            <img src={player.avatar || 'default-avatar.jpg'} alt={player.name} class="w-12 h-12 rounded-full" />
            <div>
              <p class="text-sm font-medium">{player.name}</p>
              <p class="text-lg font-bold">{player.score}</p>
            </div>
          </div>
        {/each}
        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span>🏆</span>
        </div>
      </div>
    </div>
  {/each}
                </div>
            {/if}
            
            <div class="md:hidden mt-4">
                <button 
                    on:click={toggleEventsModal}
                    class="w-full bg-BrandGreen text-white py-2 px-4 rounded-md hover:bg-BrandForest transition-colors"
                >
                    View Events Calendar
                </button>
            </div>
        </div>

        <div class="hidden md:block md:w-1/3">
            <div class="flex flex-col gap-4">
                <a 
                    href="/whitepaper" 
                    class="bg-BrandYellow text-BrandForest py-2 px-4 rounded-md text-center hover:bg-BrandGreen hover:text-white transition-colors"
                >
                    Whitepaper
                </a>
                
                <div class="bg-BrandLightGreen rounded-lg p-4">
                    <h2 class="text-xl font-sub text-BrandForest mb-4">Events</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-BrandBlue font-med">Current</h3>
                            {#each events.current as event}
                                <div class="text-BrandDarkGreen bg-white p-2 rounded-md mt-2">
                                    {event.title} - {event.date}
                                </div>
                            {/each}
                        </div>
                        
                        <div>
                            <h3 class="text-BrandBlue font-med">Upcoming</h3>
                            {#each events.upcoming as event}
                                <div class="text-BrandDarkGreen bg-white p-2 rounded-md mt-2">
                                    {event.title} - {event.date}
                                </div>
                            {/each}
                        </div>
                        
                        <div>
                            <h3 class="text-BrandBlue font-med">Past</h3>
                            {#each events.past as event}
                                <div class="text-BrandDarkGray bg-white p-2 rounded-md mt-2">
                                    {event.title} - {event.date}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {#if showEventsModal}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:hidden">
            <div class="bg-BrandLightGreen rounded-lg p-6 w-11/12 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-sub text-BrandForest">Events</h2>
                    <button 
                        on:click={toggleEventsModal}
                        class="text-BrandDeclineRed hover:text-BrandDarkRed"
                    >
                        ✕
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h3 class="text-BrandBlue font-med">Current</h3>
                        {#each events.current as event}
                            <div class="text-BrandDarkGreen bg-white p-2 rounded-md mt-2">
                                {event.title} - {event.date}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</Layout>

<style>
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: #2D7B66;
        border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
        background: #F3F3F3;
    }
</style>