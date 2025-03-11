<script lang="ts">
    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";
    import { goto, afterNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import { authSignedInStore } from "$lib/derived/auth.derived";
    import { authStore } from "$lib/stores/auth-store";
    import ProfileIcon from "$lib/icons/profile-icon.svelte";
  
    type Route = 'home' | 'whitepaper' | 'profile' | 'sign-out' | 'governance' | 'game-rules' | 'games';
  
    export let expanded: boolean = false;
    export let selectedRoute: Route = 'home';
    export let toggleNav: () => void;
  
    const navItems = writable<{ name: string; route: Route, auth: boolean }[]>([
      { name: 'HOME', route: 'home', auth: false },
      { name: 'WHITEPAPER', route: 'whitepaper', auth: false },
      { name: 'GAME RULES', route: 'game-rules', auth: false },
      { name: 'PROFILE', route: 'profile', auth: false },
      { name: 'SIGN OUT', route: 'sign-out', auth: false }
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
        case '/profile':
          selectedRoute = 'profile';
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
          {#if (item.auth && $authSignedInStore || !item.auth)}
            
            {#if item.route == 'profile'}
              <button
                on:click={() => selectRoute('profile')}
                class="text-3xl lg:text-6xl font-bold condensed {selectedRoute === 'profile' ? 'text-white' : 'text-black'}">
                  <span class="flex flex-row items-center">
                    <ProfileIcon className='w-6 lg:w-20 mr-2' fill='black' />
                    PROFILE
                  </span> 
              </button>
            {:else if item.route == 'sign-out'}
              <div class="nav-item expanded">
                <button
                  on:click={handleLogout}
                  class="text-3xl lg:text-6xl font-bold condensed text-black">
                    SIGN OUT
                </button>
              </div>
            {:else}
              <div class="nav-item expanded">
                <button
                  on:click={() => selectRoute(item.route)}
                  class="text-3xl lg:text-6xl font-bold condensed {selectedRoute === item.route ? 'text-white' : 'text-black'}">
                  {item.name}
                </button>
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
{/if}


