<script lang="ts">
    import { goto } from "$app/navigation";
    import { games, type Game } from "./games";
        
    export let visible: boolean;
    export let closeModal: () => void;

    function playGame(gameId: Game['id']) {
        closeModal();
        goto(`/games/create/${gameId}`);
    }

    
</script>
  
  {#if visible}
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4">
      <div class="bg-white p-8 sm:p-5 rounded-lg max-w-[1100px] w-full h-auto max-h-[90vh] overflow-y-auto shadow-lg relative">
        <div class="flex items-center justify-between mb-5">
          <h2 class="ml-5 text-4xl font-bold sm:text-5xl condensed">NEW GAME</h2>
          <button 
            class="flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-black rounded-full shadow-md hover:bg-gray-800"
            on:click={closeModal}
          >
            &times;
          </button>
        </div>
        
        <p class="mb-5 ml-5 text-base text-gray-500 font-inter font-sub">SELECT GAME</p>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-5">
          {#each games as game (game.id)}
            <button 
              class="flex flex-col justify-between sm:items-center w-full p-2.5 bg-white transition-all duration-200 
                     hover:scale-105 hover:shadow-lg hover:rounded-lg"
              on:click={() => playGame(game.id)}
            >
              <img 
                src={game.image} 
                alt={game.title} 
                class="object-cover object-[center_20%] h-[140px] sm:h-auto w-full mx-0 mb-4 rounded-lg sm:max-w-none sm:aspect-square sm:object-fill sm:mx-auto" 
              />
              <div class="flex flex-col flex-grow w-full">
                <h3 class="text-2xl font-bold mb-1 condensed h-[2em] flex items-start sm:items-center text-left sm:text-center sm:justify-center">
                  {game.title}
                </h3>
                <p class="text-sm text-left text-gray-500 md:text-sm font-inter font-med">
                  {game.description}
                </p>
              </div>
            </button>
          {/each}
        </div>

        <div class="hidden mt-5 text-right lg:block">
          <button 
            class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 md:px-5 md:py-2.5 rounded text-sm md:text-base"
            on:click={closeModal}
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
{/if}

