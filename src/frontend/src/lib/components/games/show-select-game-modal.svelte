<script lang="ts">
    import { goto } from "$app/navigation";
    import { Modal } from "@dfinity/gix-components";
    
    export let visible: boolean;
    export let closeModal: () => void;

    function playGame(game: string){
        closeModal();
        goto(`/${game}-new`);
    }

  </script>
  
  <Modal {visible} on:nnsClose={closeModal}>
    <div class="mx-4 p-4">
        <div class="flex justify-between items-center">
            <h3 class="default-header">Select Game</h3>
            <button class="times-button" on:click={closeModal}>&times;</button>
        </div>
      
        <div class="flex grid grid-cols-3 gap-1 items-center w-full">
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('bands')}>Bands</button>   
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('mulligans')}>Mulligans</button>   
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('prophet')}>Prophet</button>   
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('call-it')}>Call It</button>   
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('build-it')}>Build It</button>   
            <button class="text-center p-4 bg-GolfPadLightGreen text-GolfPadDarkGreen rounded" on:click={() => playGame('next-up')}>Next Up</button>   
        </div>
    </div>
  </Modal>