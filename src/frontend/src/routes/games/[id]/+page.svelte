<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../Layout.svelte";
    import type { Game, GetGame } from "../../../../../declarations/backend/backend.did";
    import { page } from "$app/state";
    import { gameStore } from "$lib/stores/game-store";

    let isLoading = true;
    let gameId: bigint;
    let game: Game | null = null;

    onMount(async () => {
        gameId = BigInt(page.params.id);
        let dto: GetGame = { gameId };
        game = await gameStore.getGame(dto);
        isLoading = false;
    });

</script>

<Layout>

    <!--
    
        If game unplayed then 
            Bands will show your predict screen if not predicted but if you have it will just show summary information about when it starts
            Mulligans will show information about when the game starts
        If active then game will show the hole by hole view for the game allowing the user to enter scores and validate the game saving as they go also saving in local storage
        If completed then the game will show the result applicable 
    -->

</Layout>