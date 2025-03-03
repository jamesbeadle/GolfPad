
  <script lang="ts">
    import Modal from "$lib/components/shared/modal.svelte";
    let showModal = false;

    let currentImageIndex = 0;

    let images = [
      { src: 'whitepaper/bands1.jpg', alt: 'Prediction view', nextLabel: 'Show Live View' },
      { src: 'whitepaper/bands2.jpg', alt: 'Live view', nextLabel: 'Show Results View' },
      { src: 'whitepaper/bands3.jpg', alt: 'Results view', nextLabel: 'Show Prediction View' }
    ];

    async function toggleImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }

  </script>

  <Modal {showModal} onClose={() => { showModal = false; }}>
    
    <div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0">
      <div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3">
        <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt}
          class="object-cover w-full rounded-lg shadow-lg"
        />
        <button 
          class="w-full brand-button"
          on:click={toggleImage}
        >
          { images[currentImageIndex].nextLabel }
        </button>
      </div>

      <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3">
        <p class="relative">
          <span class="condensed">BANDS</span> is an exciting new game format designed to help you capitalise on those "purple patches"—the stretches in your golf round where you know you tend to play your best. It’s a game that rewards strategic thinking, consistency, and your ability to perform under pressure, no matter when your game heats up.
        </p>
        <p class="relative">
          Here’s how it works: At the start of your round, you’ll select a three-hole stretch, known as your <span class="condensed">BANDS</span>, where you aim to shine. This is your moment to rack up points by excelling in one of our nine achievement categories. From hitting fairways and greens to avoiding penalties like lost balls, every element of your game contributes to your overall score.        
        </p>
        <p class="relative">
          Points are awarded for performing well during your <span class="condensed">BANDS</span>, whether it’s a string of solid pars, hitting every green in regulation, or nailing a clutch birdie. The goal is simple: train your focus and precision during this chosen stretch to maximise your scoring potential. But the impact goes beyond just the BAND itself—<span class="condensed">BANDS</span> is designed to enhance every part of your game, helping you build consistency and confidence across the board, from tee to green.
        </p>
        <p class="relative">
          What makes <span class="condensed">BANDS</span> so exciting is its flexibility. Whether you’re the type of golfer who starts strong, finishes with a flourish, or peaks somewhere in the middle, <span class="condensed">BANDS</span> allows you to choose the part of your round where you’re most likely to excel. It’s not just about playing well—it’s about playing well at the right time.
        </p>
        <p class="relative">
          Perfect for friendly matches, practice rounds, or personal challenges, <span class="condensed">BANDS</span> adds a fresh dimension to your game, encouraging you to refine your skills while keeping the competition fun and engaging. With its innovative approach to training and scoring, <span class="condensed">BANDS</span> is your opportunity to make every round more rewarding, one BAND at a time.
        </p>
      </div>
    </div>
  </Modal>





