<script lang="ts">
    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";
    import { goto, afterNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import { authSignedInStore } from "$lib/derived/auth.derived";
    import { authStore } from "$lib/stores/auth-store";
  
    type Route = 'home' | 'whitepaper' | 'governance' | 'game-rules' | 'games';
  
    export let expanded: boolean = false;
    export let selectedRoute: Route = 'home';
    export let toggleNav: () => void;
  
    const navItems = writable<{ name: string; route: Route }[]>([
      { name: 'HOME', route: 'home' },
      { name: 'WHITEPAPER', route: 'whitepaper' },
      { name: 'GAME RULES', route: 'game-rules' }
    ]);
  
    function selectRoute(route: Route) {
      selectedRoute = route;
      toggleNav();
      if(route === 'home'){
        goto(`/`);
        return;
      }
      goto(`/${route}`);
    }
  
    function closeNav() {
      toggleNav();
    }

    function goHome(){
        toggleNav();
        goto('/');
    }

    $: {
      switch($page.url.pathname){
        case '/':
          selectedRoute = 'home';
          break;
        case '/whitepaper':
          selectedRoute = 'whitepaper';
          break;
        case '/game-rules':
          selectedRoute = 'game-rules';
          break;
        case '/games':
          selectedRoute = 'games';
          break;
        case '/governance':
          selectedRoute = 'governance';
          break;
        default:
          selectedRoute = 'home';
          break;
      }
    }

    function handleLogout(){
      authStore.signOut();
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
  
    .social-links a {
      margin-right: 10px;
      text-decoration: none;
      color: black;
    }
  
    .nav-content {
      margin-top: 100px;
    }
</style>
  
{#if expanded}

    <div class="flex min-h-screen flex-col relative nav-overlay" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
      
      <div class="absolute top-4 left-4 z-10">
        <button
          on:click={closeNav}
          class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">
          -
        </button>
      </div>
      <div class="absolute top-4 right-4 z-10">
        <button on:click={goHome}>
            <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
        </button>
      </div>
  
      <div class="nav-content flex flex-col items-start pl-10">
        {#each $navItems as item (item.route)}
          <div class="nav-item expanded">
            <button
              on:click={() => selectRoute(item.route)}
              class="text-3xl lg:text-6xl font-bold condensed {selectedRoute === item.route ? 'text-white' : 'text-black'}">
              {item.name}
            </button>
          </div>
        {/each}

       



    {#if $authSignedInStore}
      <div class="nav-item expanded">

        <a class="brand-button" href="/profile">Profile</a>
              
        <button 
            class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow"
            on:click={handleLogout}
        >
            SIGN OUT
        </button>
        </div>
    {/if}
      </div>
  
      <div class="flex justify-between items-center p-5 text-xs lg:text-base">
        <div class="social-links">
          <a href="https://twitter.com" target="_blank">TWITTER</a>
          <a href="https://oc.app" target="_blank">OPENCHAT</a>
          <a href="https://youtube.com" target="_blank">YOUTUBE</a>
        </div>
        
        <div>
          <img src="placeholder.png" alt="Profile" class="w-12 h-12 rounded-full" />
        </div>
      </div>
    </div>
{/if}


