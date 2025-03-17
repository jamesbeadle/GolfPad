<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { gameStore } from "$lib/stores/game-store";
    import type { Game, GetGame, GolfCourseTeeGroup, GolferSummary } from "../../../../../declarations/backend/backend.did";
    import Layout from "../../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import BandsGame from "$lib/components/game/bands/bands-game.svelte";
    import MulligansGame from "$lib/components/game/mulligans/mulligans-game.svelte";

    let isLoading = true;
    let gameId: bigint;
    let game: Game | null = null;
    let players: GolferSummary[] = [];
    let golfCourse: GolfCourseTeeGroup | null = null;

    onMount(async () => {
        gameId = BigInt(page.params.id);
        let dto: GetGame = { gameId };
        game = await gameStore.getGame(dto);
        isLoading = false;
    });

</script>

<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#if game && golfCourse}
            {#if Object.keys(game?.gameType)[0] == 'Bands'}
                <BandsGame {game} {players} {golfCourse}/>
            {/if}
            {#if Object.keys(game?.gameType)[0] == 'Mulligans'}
                <MulligansGame {game} {players} {golfCourse} />
            {/if}
        {:else}
            <p>Could not load game.</p>
        {/if}
    {/if}

</Layout>