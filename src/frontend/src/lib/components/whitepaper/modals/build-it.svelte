
<script lang="ts">
  import Modal from "$lib/components/shared/global/modal.svelte";
  let showModal = false;

  let currentImageIndex = 0;

  let images = [
    { src: 'whitepaper/build-it1.jpg', alt: 'Team Creation View', nextLabel: 'Show Results View' },
    { src: 'whitepaper/build-it2.jpg', alt: 'Results screen', nextLabel: 'Show Team View' }
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
        <span class="condensed">BUILD IT</span> is an innovative and customisable team-based format that brings a new level of camaraderie and competition to golf. Designed for groups of friends, it allows golfers to create their own unique tournaments, playing together over a chosen course and timeframe that suits their schedules and ambitions.
      </p>
      <p class="relative">
        Here’s how it works: Players form teams and compete against other teams, building a combined scorecard using their lowest individual scores. This collaborative approach ensures that every contribution matters, while also encouraging teammates to push each other to perform their best. The format is entirely flexible, letting golfers decide how long the competition runs—whether it’s a single round, a weeklong event, or even an epic season that stretches across an entire year.
      </p>
      <p class="relative">
        The magic of <span class="condensed">BUILD IT</span> lies in its adaptability. Teams can tailor the experience to fit their goals, preferences, and schedules, making it perfect for everything from casual weekend rivalries to long-term leaderboards. With its ability to bring friends together in a shared quest for victory, <span class="condensed">BUILD IT</span> fosters stronger bonds and plenty of friendly banter along the way.
      </p>
      <p class="relative">
        By focusing on teamwork, strategy, and consistency, <span class="condensed">BUILD IT</span> offers golfers a fresh and engaging way to enjoy the sport they love. It’s not just about individual performance—it’s about creating something greater together and enjoying every step of the journey. Whether you’re competing for bragging rights or organising a yearlong competition, <span class="condensed">BUILD IT</span> transforms golf into a truly collaborative adventure.
      </p>
    </div>
  </div>
</Modal>





