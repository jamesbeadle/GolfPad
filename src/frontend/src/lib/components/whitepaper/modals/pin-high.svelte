<script lang="ts">
    import Modal from "$lib/components/shared/global/modal.svelte";

  let showModal = false;
  
</script>
<Modal {showModal} onClose={() => {showModal = false;}}>
  <div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
    <div class="flex flex-col space-y-2 text-xl leading-relaxed p-4">
      <p class="relative">
        <span class="condensed">PIN HIGH</span> reimagines your chipping practice, turning it into an engaging and competitive experience that sharpens your skills while keeping things fun and social. Designed for groups of golfers, <span class="condensed">PIN HIGH</span> challenges you to perfect your touch and precision around the green, making every practice session as rewarding as it is enjoyable.
      </p>
      <p class="relative">
        Here’s how it works: Players take turns aiming for specific targets, with points awarded for hitting the right distance and getting close to the hole. It’s not just about making the shot—it’s about dialing in your control and accuracy to outscore your friends. Whether you’re playing casually or competing fiercely, <span class="condensed">PIN HIGH</span> transforms chipping practice into a game that’s easy to play and hard to put down.
      </p>

      <p class="relative">
        With its dynamic scoring and interactive approach, <span class="condensed">PIN HIGH</span> encourages strategic thinking and steady improvement. Each shot becomes an opportunity to test your skills, refine your technique, and gain valuable feedback—all while enjoying the camaraderie of friendly competition.
      </p>
      <p class="relative">
        Whether you’re at the range or in a backyard setup, <span class="condensed">PIN HIGH</span> brings a new level of excitement to your short game. It’s the perfect way to elevate your practice, connect with others, and master the art of getting up and down.
      </p>
      
    </div>
  </div>
</Modal>