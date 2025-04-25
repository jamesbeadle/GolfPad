<script lang="ts">
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { signOut } from "$lib/services/auth.services";
    import { authSignedInStore } from "$lib/derived/auth.derived";
    import { authStore } from "$lib/stores/auth-store";
    import ProfileIcon from "$lib/icons/profile-icon.svelte";
  
    interface Props{
      expanded: boolean;
      toggleNav: () => void;
    }

    let { expanded, toggleNav }: Props = $props();
  
    const navItems = [
      { name: 'HOME', route: '/', auth: false },
      { name: 'WHITEPAPER', route: '/whitepaper', auth: false },
      { name: 'GAME RULES', route: '/game-rules', auth: false },
      { name: 'PROFILE', route: '/profile', auth: true },
      { name: 'SIGN OUT', route: '/', auth: true }
    ];
  
    function closeNav() {
      toggleNav();
    }

    function goHome(){
        toggleNav();
        goto('/');
    }

    async function handleMenuItemClick(item: (typeof navItems)[number]) {
    if (item.name === "SIGN OUT") {
      await signOut();
      await goto("/", { replaceState: true });
      toggleNav();
      console.log("signing out");
      return;
    }
    await goto(item.route);
      toggleNav();
    }

</script>
  
<style>
    .nav-overlay {
    @apply bg-BrandYellow fixed top-0 left-0 w-screen h-full z-50 flex flex-col justify-between overflow-x-hidden;
  }
  
    .nav-item {
      transform: translateY(-100%);
      opacity: 0;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
  
    .nav-item.expanded {
      transform: translateY(0);
      opacity: 1;
    }

  
    .nav-content {
      margin-top: 100px;
    }
</style>
  
{#if expanded}

    <div class="relative flex flex-col min-h-screen nav-overlay" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
      
      <div class="absolute z-10 top-4 left-4">
        <button
          onclick={closeNav}
          class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">
          -
        </button>
      </div>
      <div class="absolute z-10 top-4 right-4">
        <button onclick={goHome}>
            <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
        </button>
      </div>
  
      <div class="flex flex-col items-start pl-10 nav-content">
        {#each navItems as item}
          {#if (item.auth && $authSignedInStore || !item.auth)}
            {#if item.name == 'PROFILE'}
              <button
                onclick={() => handleMenuItemClick(item)}
                class="text-3xl font-bold text-white hover:text-black lg:text-6xl condensed">
                  <span class="flex flex-row items-center">
                    <ProfileIcon className='w-6 lg:w-20 mr-2' fill='black' />
                    PROFILE
                  </span> 
              </button>
            {:else if item.route == 'sign-out'}
              <div class="nav-item expanded">
                <button
                  onclick={() => handleMenuItemClick(item)}
                  class="text-3xl font-bold text-black lg:text-6xl condensed">
                    SIGN OUT
                </button>
              </div>
            {:else}
              <div class="nav-item expanded">
                <button
                  onclick={() => handleMenuItemClick(item)}
                  class="text-3xl font-bold text-white hover:text-black lg:text-6xl condensed">
                  {item.name}
                </button>
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
{/if}


