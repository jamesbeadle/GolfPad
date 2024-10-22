<script lang="ts">
    import { goto } from "$app/navigation";
    import { Modal } from "@dfinity/gix-components";
    import { createEventDispatcher } from "svelte";
    
    export let visible: boolean;
    export let closeModal: () => void;

    const dispatch = createEventDispatcher();

    function playGame(game: string){
        closeModal();
        dispatch('gameSelected', game);
    }

    
</script>
  
  {#if visible}
    <div class="modal-overlay">
      <div class="modal-content">
          <div class="modal-header">
              <h2 class="modal-title condensed">NEW GAME</h2>
              <button class="close-button" on:click={closeModal}>&times;</button>
          </div>
          <p class="select-game-text font-inter font-sub">SELECT GAME</p>
          
          <!-- Grid of games -->
          <div class="games-grid">
            <button class="game-card" on:click={() => goto('/games/mulligans')}>
                <img src="/hero.png" alt="Mulligans" class="game-image" />
                <h3 class="condensed">MULLIGANS</h3>
                <p class="font-inter font-med">Mulligans offer golfers a second chance to retake a shot without penalty, providing a do-over opportunity to improve their game.</p>
            </button>
                
            <button class="game-card" on:click={() => playGame('prophet')}>
                <img src="/bands.png" alt="Prophet" class="game-image" />
                <h3 class="condensed">PROPHET</h3>
                <p class="font-inter font-med">Prophet is a golf game format that emphasizes precise scoring based on the length of each putt made by players.</p>
            </button>
              
            <button class="game-card" on:click={() => playGame('bands')}>
                <img src="/next-up.png" alt="Bands" class="game-image" />
                <h3 class="condensed">BANDS</h3>
                <p class="font-inter font-med">Bands is a golf game where players hit designated targets to earn points.</p>
            </button>
            
            <button class="game-card" on:click={() => playGame('build-it')}>
                <img src="/build-it.png" alt="Build It" class="game-image" />
                <h3 class="condensed">BUILD IT</h3>
                <p class="font-inter font-med">Build It is a golf game where players aim to progressively improve their scores over each hole.</p>
            </button>
            
            <button class="game-card" on:click={() => playGame('next-up')}>
                <img src="/mulligans.png" alt="Next Up" class="game-image" />
                <h3 class="condensed">NEXT UP</h3>
                <p class="font-inter font-med">Next Up is a golf game where players compete to score the next best shot after each hole.</p>
            </button>
          </div>

          <!-- Select button -->
          <div class="modal-footer">
              <button class="select-button" on:click={closeModal}>SELECT</button>
          </div>
      </div>
    </div>
{/if}

<style>
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  }

  .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 1100px;
      height: 653px;
      width: 100%;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      position: relative;
  }

  .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
  }

  .modal-title {
      font-size: 3rem;
      font-weight: bold;
      margin-left: 20px;
  }

  .close-button {
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;                
    justify-content: center;       
    align-items: center;          
    width: 2.5rem;                  
    height: 2.5rem;                  
    font-size: 1.5rem;      
    font-weight: bold;            
    color: white;                 
    background-color: black;      
    border-radius: 50%;       
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
}

  .select-game-text {
      font-size: 1rem;
      margin-left: 20px;
      margin-bottom: 20px;
      color: #8C8C8C; 
  }

  .games-grid {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 20px;
  }

  .game-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 200px;
    text-align: center;
    background-color: #fff;
    padding: 10px;
    height: 100%;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  .game-card:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

  .game-card img {
    width: 100%;
    height: 200px;
    object-fit: fit;
    border-radius: 8px;
  }

  .game-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 10px;
  }

  .game-card h3 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.4rem;
  }

  .game-card p {
    font-size: 0.9rem;
    color: #8C8C8C; 
    text-align: left; 
}

  .modal-footer {
      margin-top: 20px;
      text-align: right;
  }

  .select-button {
      background-color: #1C4932;
      color: #F4C802;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      margin-right: 20px;
  }
</style>