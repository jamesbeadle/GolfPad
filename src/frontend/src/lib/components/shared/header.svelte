<script lang="ts">
  export let toggleNav: () => void;
</script>
<div class="flex-none h-[80px] bg-BrandYellow relative m-[0.2rem] rounded-lg">
    <div class="absolute z-10 top-4 left-4">
      <button
        on:click={toggleNav}
        class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">
        +
      </button>
    </div>
    <div class="absolute z-10 top-4 right-4">
      <a href="/">
        <span class="text-3xl font-extrabold text-black condensed">ICGC</span>
      </a>
    </div>
  </div>