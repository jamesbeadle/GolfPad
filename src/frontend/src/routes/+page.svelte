<script lang="ts">
    import { authSignedInStore } from "$lib/derived/auth-derived";
    import LogoIcon from "$lib/icons/logo-icon.svelte";
    import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
    import Layout from "./Layout.svelte";
    import { userGetAgentPicture } from "$lib/derived/user-derived";
    import { goto } from "$app/navigation";

    function handleLogin() {
        let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URLS,
        };
        authStore.signIn(params);
        console.log("Logged in Successfully");
    }

    function handlePlay() {
        goto('/games');
    }
</script>
<Layout>    
   
  <div class="z-10 px-4 text-center">
    <h1 class="mb-1 font-bold text-GolfPadForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1>
    <h2 class="mx-16 mb-6 text-3xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2>
    
    {#if !$authSignedInStore}
        <button 
            class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow"
            on:click={handleLogin}
        >
        CONNECT
        </button>
    {/if}

    {#if $authSignedInStore}
        <img
            src={$userGetAgentPicture}
            alt="Profile"
            class="profile-pic-bottom-right"
            aria-label="Toggle Profile"
        />
        <button 
            class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow"
            on:click={handlePlay}
        >
            PLAY
        </button>
    {/if}

    <style>
        .profile-pic-bottom-right {
            position: fixed;
            bottom: 10px; 
            right: 10px; 
            width: 50px;  
            height: auto; 
            border-radius: 50%; 
        }
    </style>
    
</div>
<div class="absolute bottom-0 left-0 z-0 w-full">
    <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
    <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full h-auto md:flex">
</div>

</Layout>
