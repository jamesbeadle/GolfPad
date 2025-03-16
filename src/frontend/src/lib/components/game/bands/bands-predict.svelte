
<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;
</script>


<div class="flex flex-col">
    <p>PLAYER SETUP</p>
    <ActivePlayerPanel />
    <p>PLAYER</p>
    <p>{activePlayer.name}<span class="name-handicap">{activePlayer.handicap}</span></p>
    <BandsCategoryBrowser />
</div>