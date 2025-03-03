<script lang="ts">
  
    export let visible: boolean;
    export let closeModal: () => void;
  </script>
  
{#if visible}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
     
      <div class="relative z-50 w-[60vw] max-h-[90vh] overflow-y-auto bg-BrandYellow rounded-lg border border-black">
        <div class="p-4 mx-4">
          <div class="flex items-center justify-between mb-4">
        <p class="text-3xl condensed">BUILD IT</p>
        <button class="text-2xl times-button" on:click={closeModal}>&times;</button>
      </div>
  
      <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <img 
          src="build-it-game.png" 
          alt="game" 
          class="w-full h-48 md:w-1/3 md:h-auto rounded-lg shadow-lg object-cover object-center md:object-[50%_top]" 
        />
        <div class="flex flex-col space-y-2 text-lg leading-relaxed">
          <p><span class="condensed">BUILD IT</span> allows groups of friends to play each other over a customizable period of time within their local club.</p>
          <p>Golfers put together a team of players to compete against other teams, building a combined scorecard of their lowest scores.</p>
          <p>The competition is decided after the customizable period ends, allowing teams to compete for a single round or an entire year.</p>
          <p><span class="condensed">BUILD IT</span> will allow golfers to contribute to a team on a more granular level, enhancing the community golf experience.</p>
        </div>
      </div>
      </div>
      </div>
    </div>
{/if}
  