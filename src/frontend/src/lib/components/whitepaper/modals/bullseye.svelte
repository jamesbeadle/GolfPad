<script lang="ts">
    import Modal from "$lib/components/shared/global/modal.svelte";
    let showModal = false;
</script>
<Modal {showModal} onClose={() => { showModal = false; }}>

  <div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
    <div class="flex flex-col space-y-2 text-xl leading-relaxed p-4">
      <p class="relative">
        <span class="condensed">BULLSEYE</span> takes your putting practice to a whole new level, turning every putt into a fun, competitive challenge that sharpens your accuracy and touch. Designed for groups, <span class="condensed">BULLSEYE</span> adds an exciting twist to your putting sessions, making it a game of skill and precision with every stroke.
      </p>
      <p class="relative">
        Here’s how it works: Players take turns attempting to hit designated targets on the green, with points awarded for getting within a putter’s length of the hole. It’s all about precision, as each putt must be carefully judged to land as close to the hole as possible. The more accurate your putts, the higher your score, creating a thrilling dynamic of friendly competition.        
      </p>
      <p class="relative">
        <span class="condensed">BULLSEYE</span> encourages players to refine their putting technique in a relaxed yet challenging environment, fostering both individual focus and group camaraderie. Whether you’re practicing with friends or challenging yourself to beat your best, <span class="condensed">BULLSEYE</span> makes every putting session a rewarding experience.
      </p>
      <p class="relative">
        Ideal for groups of golfers, <span class="condensed">BULLSEYE</span> turns your practice into an engaging game that’s as fun as it is effective. Perfect your putting, engage in friendly competition, and make every round count—one precise putt at a time.
      </p>
    </div>
  </div>
    
  </Modal>