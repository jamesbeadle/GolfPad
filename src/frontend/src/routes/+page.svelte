<script lang="ts">
    import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
    import { authSignedInStore } from "$lib/derived/auth-derived";
    import { userGetAgentPicture } from "$lib/derived/user-derived";
    import Layout from "./Layout.svelte";
    
    function handleLogin() {
        let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URLS,
        };
        authStore.signIn(params);
        console.log("Logged in Successfully");
    }

    function handleLogout(){
        authStore.signOut();
    }
</script>
<Layout>    
   
  <div class="z-10 px-4 mb-20 text-center">
    <h1 class="mb-1 font-bold text-BrandForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1>
    <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2>
    
    {#if !$authSignedInStore}
        <button 
            class="px-10 py-3 text-sm font-semibold rounded shadow-lg md:px-12 md:text-lg bg-BrandForest text-BrandYellow"
            on:click={handleLogin}
        >
        CONNECT
        </button>
    {/if}

    {#if $authSignedInStore}
        <img
            src={$userGetAgentPicture}
            alt="Profile"
            class="fixed w-12 h-12 rounded-full bottom-3 right-3"
            aria-label="Toggle Profile"
        />
        <button 
            class="px-10 py-3 text-sm font-semibold rounded shadow-lg md:px-12 md:text-lg bg-BrandForest text-BrandYellow"
            on:click={handleLogout}
        >
            SIGN OUT
        </button>
    {/if}
    
</div>
<div class="absolute bottom-0 left-0 z-0 w-full">
    <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
    <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex">
</div>

</Layout>
