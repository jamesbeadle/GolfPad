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
          <p class="select-game-text">SELECT GAME</p>
          
          <!-- Grid of games -->
          <div class="games-grid">
            <button class="game-card" on:click={() => playGame('mulligans')}>
                <a href="/games/mulligans">
                  <img src="/hero.png" alt="Mulligans" class="game-image" />
                  <h3>MULLIGANS</h3>
                  <p>Mulligans offer golfers a second chance to retake a shot without penalty, providing a do-over opportunity to improve their game.</p>
                </a>
            </button>
              
              <button class="game-card" on:click={() => playGame('prophet')}>
                  <img src="/bands.png" alt="Prophet" class="game-image" />
                  <h3>PROPHET</h3>
                  <p>Prophet is a golf game format that emphasizes precise scoring based on the length of each putt made by players.</p>
              </button>
              
              <button class="game-card" on:click={() => playGame('bands')}>
                  <img src="/next-up.png" alt="Bands" class="game-image" />
                  <h3>BANDS</h3>
                  <p>Bands is a golf game where players hit designated targets to earn points.</p>
              </button>
              
              <button class="game-card" on:click={() => playGame('build-it')}>
                  <img src="/build-it.png" alt="Build It" class="game-image" />
                  <h3>BUILD IT</h3>
                  <p>Build It is a golf game where players aim to progressively improve their scores over each hole.</p>
              </button>
              
              <button class="game-card" on:click={() => playGame('next-up')}>
                  <img src="/mulligans.png" alt="Next Up" class="game-image" />
                  <h3>NEXT UP</h3>
                  <p>Next Up is a golf game where players compete to score the next best shot after each hole.</p>
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
      max-width: 900px;
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
      font-size: 2rem;
      font-weight: bold;
  }

  .close-button {
      font-size: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
  }

  .select-game-text {
      font-size: 1rem;
      margin-bottom: 20px;
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
    width: 150px; /* Set a fixed width */
    text-align: center;
    background-color: #fff; /* Optional: add background to visually separate */
    padding: 10px;
    height: 100%;
  }

  .game-card img {
    width: 100%; /* Image will take up the full width of its container */
    height: 150px; /* Maintain aspect ratio */
    object-fit: cover; /* Ensure images cover the container */
    border-radius: 8px;
  }

  .game-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 10px;
  }

  .game-card h3 {
      font-size: 1.2rem;
      font-weight: bold;
  }

  .game-card p {
      font-size: 0.9rem;
      color: #555;
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
  }
</style>