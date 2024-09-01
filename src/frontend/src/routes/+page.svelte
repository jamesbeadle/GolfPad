<script lang="ts">
    import { authSignedInStore } from "$lib/derived/auth.derived";
import LogoIcon from "$lib/icons/logo-icon.svelte";
    import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
import Layout from "./Layout.svelte";


    function handleLogin() {
        let params: AuthSignInParams = {
        domain: import.meta.env.VITE_AUTH_PROVIDER_URL,
        };
        authStore.signIn(params);
    }
</script>
<Layout>    
   
  <div class="text-center px-4 z-10">
    <h1 class="font-bold text-GolfPadForest mb-1">WELCOME TO GOLFPAD</h1>
    <h2 class="text-cta md:text-6xl font-black text-black mb-6 condensed tracking-tight leading-tight mx-16">THE FUTURE OF GOLF STARTS HERE</h2>
    <button class="bg-GolfPadForest text-GolfPadYellow py-3 px-12 text-lg font-semibold shadow-lg" on:click="{handleLogin}">CONNECT</button>
</div>
<div class="absolute bottom-0 left-0 w-full z-0">
    <img src="golfball.png" alt="Golf Ball" class="w-full h-auto object-cover">
</div>

</Layout>
