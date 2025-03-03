
<script lang="ts">
  import Modal from "$lib/components/shared/modal.svelte";
  let showModal = false;

  let currentImageIndex = 0;

  let images = [
    { src: 'whitepaper/next-up1.jpg', alt: 'Live View', nextLabel: 'Show Results View' },
    { src: 'whitepaper/next-up2.jpg', alt: 'Results screen', nextLabel: 'Show Live View' }
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
        <span class="condensed">NEXT UP</span> is a dynamic and competitive new game format that puts a spotlight on performing under pressure, especially when it’s your turn to go first off the tee. It’s all about stepping up when it matters most, defending your assigned holes, and seizing opportunities to gain an edge over your opponents.
      </p>

      <p class="relative">
        Here’s how it works: Each hole is a chance to earn points. A golfer earns 3 points for successfully defending a hole when they’re first off the tee, while their opponent can earn 1 point if they manage to beat the defender. The game keeps things fair and exciting by randomising who tees off first across the round, ensuring everyone gets their share of opportunities to defend.          
      </p>

      <p class="relative">
        But that’s not all—<span class="condensed">NEXT UP</span> has a clever comeback mechanic. Any remaining unassigned holes are given to the golfer with the lowest score at the time of tee-off. This creates a unique opportunity for the trailing player to defend the hole, potentially swinging momentum back in their favor and leveling the playing field.
      </p>

      <p class="relative">
        The genius of <span class="condensed">NEXT UP</span> lies in its focus on pressure situations. By training golfers to perform when they’re first off the tee, this format sharpens your ability to stay composed, deliver clutch drives, and take control of the hole from the very start.
      </p>

      <p class="relative">
        Whether you’re playing with friends or looking to refine your skills under competition-like conditions, <span class="condensed">NEXT UP</span> keeps every round fresh, engaging, and full of strategic decisions. It’s a format that builds confidence and adds an extra layer of excitement to your golf game, ensuring that every hole is packed with purpose and potential.
      </p>
    </div>
  </div>
</Modal>





