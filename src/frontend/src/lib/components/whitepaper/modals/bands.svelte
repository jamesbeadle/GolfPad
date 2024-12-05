<script lang="ts">
 
    export let visible: boolean;
    export let closeModal: () => void;

  </script>
  
  {#if visible}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        class="absolute inset-0 bg-black bg-opacity-50"
        on:click={closeModal}
      ></button>

      <div class="relative z-50 w-[60vw] max-h-[90vh] overflow-y-auto bg-BrandYellow rounded-lg border border-black">
        <div class="p-4 mx-4">
          <div class="flex items-center justify-between mb-4">
            <p class="text-3xl condensed">BANDS</p>
            <button class="text-2xl times-button" on:click={closeModal}>&times;</button>
          </div>
          
          <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <img 
              src="bands-game.png" 
              alt="game" 
              class="w-full h-48 md:w-1/3 md:h-auto rounded-lg shadow-lg object-cover object-center md:object-[50%_top]" 
            />
            <div class="flex flex-col space-y-2 text-lg leading-relaxed">
              <p><span class="condensed">BANDS</span> is designed for those purple patches you get in golf, the parts of the round you know you typically play well in.</p>
              <p>You select a 3 hole range, known as a <span class="condensed">BAND</span>, as the part of your round you will hit one of our 9 achievement categories.</p>
              <p>You'll build up points for scoring well on holes along with hitting fairways, greens or not losing a ball.</p>
              <p><span class="condensed">BANDS</span> trains each part of your game using a new and exciting format.</p>
              <p>Whether you start well or only get going towards the end, playing well at the right time is what counts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  