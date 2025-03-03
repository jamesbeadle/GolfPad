<script lang="ts">
  import Modal from "$lib/components/shared/modal.svelte";
  let showModal = false;
</script>
<Modal {showModal} onClose={() => { showModal = false; }}>
  <div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
    <div class="flex flex-col space-y-2 text-xl leading-relaxed p-4">
      <p class="relative">
        <span class="condensed">BOMBS</span> is a cutting-edge game format that transforms your driving range sessions into interactive, competitive, and endlessly entertaining experiences. Designed to bring a social element to your practice, <span class="condensed">BOMBS</span> introduces an exciting new way to challenge yourself and your friends while sharpening your accuracy and focus.
      </p>
      <p class="relative">
        Here’s how it works: Friends can tune into each other’s live driving range streams, creating a shared experience no matter where they are. Using their devices, they select specific targets on the range for the player on the tee to aim for. This isn’t just about hitting long drives—it’s about precision, strategy, and rising to the challenge your friends set for you.
      </p>
      <p class="relative">
        Thanks to advanced AI capabilities, the game identifies when a golfer successfully hits a target, awarding points in real time. Every successful shot brings a mix of satisfaction and bragging rights, while missed targets fuel the fun and banter that makes <span class="condensed">BOMBS</span> so engaging.
      </p>
      <p class="relative">
        Whether you’re practicing solo and inviting friends to join remotely or competing side-by-side at the range, <span class="condensed">BOMBS</span> adds an electrifying layer of competition and camaraderie to every session. It’s not just about hitting the ball; it’s about making every shot count in a dynamic, interactive game that keeps you coming back for more.
      </p>
    </div>
  </div>
</Modal>