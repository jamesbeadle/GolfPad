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
    <div class="background h-screen relative flex items-center justify-center overflow-hidden">

        <div class="absolute top-4 left-4 z-10">
            <button class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                +
            </button>
        </div>
        <div class="absolute top-4 right-4 z-10">
            <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
        </div>
        <div class="text-center px-4 z-10">
            <h1 class="font-bold text-GolfPadForest mb-1">WELCOME TO GOLFPAD</h1>
            <h2 class="text-5xl md:text-6xl font-extrabold text-black mb-6 leading-tight">THE FUTURE OF GOLF STARTS HERE</h2>
            <button class="bg-GolfPadForest text-GolfPadYellow py-3 px-12 rounded-full text-lg font-semibold shadow-lg" on:click="{handleLogin}">CONNECT</button>
        </div>
        <div class="absolute bottom-4 left-4 z-10">
            <a href="#" class="text-black text-sm font-medium">WHITEPAPER</a>
        </div>
        <div class="absolute bottom-0 left-0 w-full z-0">
            <img src="golfball.png" alt="Golf Ball" class="w-full h-auto object-cover">
        </div>
    
    </div>

</Layout>
