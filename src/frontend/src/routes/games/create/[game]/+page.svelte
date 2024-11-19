<script lang="ts">
    import { page } from '$app/stores';
    import GameForm from '$lib/components/games/game-form.svelte';
    import { gameConfigs } from '$lib/components/games/game-configs';
    import type { GameType } from "$lib/types";

    // Get the game type from the URL parameter
    const gameType = $page.params.game as GameType;
    const config = gameConfigs[gameType];
    const defaultOpponentConfig = { multiple: false };
    const safeConfig = { ...defaultOpponentConfig, ...config.opponentConfig };

</script>

<GameForm 
    gameTitle={config.title}
    opponentConfig={safeConfig}
/>