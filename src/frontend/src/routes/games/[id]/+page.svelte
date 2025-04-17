<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { gameStore } from "$lib/stores/game-store";
    import { gameStateStore } from "$lib/stores/game-state-store";
    import { currentCourseStore } from "$lib/stores/current-course-store";
    import type { Game, GetGame, GolfCourseTeeGroup, GolferSummary } from "../../../../../declarations/backend/backend.did";
    import Layout from "../../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import BandsGame from "$lib/components/game/bands/bands-game.svelte";
    import MulligansGame from "$lib/components/game/mulligans/mulligans-game.svelte";
    import GameHeader from "$lib/components/game/game-header.svelte";

    let isLoading = true;
    let gameId: bigint;
    let game: Game | null = null;
    let players: GolferSummary[] = [];
    let golfCourse: GolfCourseTeeGroup | null = null;

    onMount(async () => {
        gameId = BigInt(page.params.id);
        let dto: GetGame = { gameId };
        game = await gameStore.getGame(dto);

        gameStateStore.set(game);
        currentCourseStore.set(golfCourse);
        isLoading = false;
    });

</script>

<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#if $gameStateStore && golfCourse}
        <div class="p-2 overflow-y-auto rounded-lg lg:p-4">
            <GameHeader game={$gameStateStore} />

            <div class="w-full p-2 space-y-4 rounded-lg bg-BrandLightGray lg:p-4">
                {#if Object.keys($gameStateStore.gameType)[0] == 'Mulligans'}
                    <img 
                        src="/game-images/mulligans.jpg" 
                        alt="mulligans" 
                        class="object-cover w-full h-48 rounded-lg md:hidden"
                    />

                    <MulligansGame game={$gameStateStore} {players} {golfCourse} />
                {/if}
            </div>

            {#if Object.keys($gameStateStore.gameType)[0] == 'Bands'}
                <BandsGame game={$gameStateStore} {players} {golfCourse}/>
            {/if}
        </div>
        {:else}
            <p class="text-black">Could not load game.</p>
        {/if}
    {/if}
</Layout>