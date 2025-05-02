
<script lang="ts">
  import Modal from "$lib/components/shared/global/modal.svelte";
  let showModal = false;

  let currentImageIndex = 0;

  let images = [
    { src: 'whitepaper/mulligans1.jpg', alt: 'In-game view', nextLabel: 'Show Results View' },
    { src: 'whitepaper/mulligans2.jpg', alt: 'Results screen', nextLabel: 'Show In-game View' }
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
          onclick={toggleImage}
        >
          { images[currentImageIndex].nextLabel }
        </button>
    </div>

    <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3">
      <p class="relative">
        <span class="condensed">MULLIGANS</span> is an exciting new twist on the traditional match play format, designed to add a layer of strategy and fun to your round of golf. It’s a game that rewards tactical thinking, careful decision-making, and the ability to bounce back from mistakes—perfect for golfers looking to shake up their usual match play routine.
      </p>

      <p class="relative">
        In <span class="condensed">MULLIGANS</span>, both players automatically receive a mulligan every three holes, starting with the 1st hole and continuing on the 4th, 7th, 10th, 13th, and 16th. These "do-over" shots can be used at any time, giving golfers the opportunity to replay a wayward drive, take another approach shot, or try again on the greens—all with the aim of staying competitive in the match.
      </p>

      <p class="relative">
        But here’s where the strategy deepens: golfers also compete to earn additional mulligans by winning a hole. Each hole becomes a battle not just for the lead but for valuable resources that can change the tide of the game. Will you save your mulligan for a critical moment later in the round, or use it now to put pressure on your opponent?
      </p>

      <p class="relative">
        The key to <span class="condensed">MULLIGANS</span> lies in how you play them. A well-timed mulligan can help secure a win on a tough hole or stop your opponent from running away with the match. Every decision becomes part of the strategy, keeping the competition fresh, engaging, and unpredictable from start to finish.
      </p>

      <p class="relative">
        With <span class="condensed">MULLIGANS</span>, golfers can enjoy their round with a little less pressure, knowing that a few mistakes are not just allowed—they’re part of the fun. It’s a format that brings out the competitive spirit while encouraging players to laugh off the occasional misstep, making it perfect for friendly matches or lively rivalries.
      </p>

      <p class="relative">
        Whether you’re a seasoned golfer or a casual player, <span class="condensed">MULLIGANS</span> offers a new way to enjoy the game, combining tradition with innovation for a round that’s as entertaining as it is strategic.
      </p>
    </div>
  </div>
</Modal>





