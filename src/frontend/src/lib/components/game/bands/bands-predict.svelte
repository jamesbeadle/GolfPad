
<script lang="ts">
    import type { Game, GolfCourseTeeGroup, GolferSummary } from "../../../../../../declarations/backend/backend.did";
    import BandsCategoryBrowser from "./bands-category-browser.svelte";

    export let game: Game;
    export let players: GolferSummary[];
    export let golfCourse: GolfCourseTeeGroup;
</script>

<div class="flex flex-col">
    <p>PLAYER SETUP</p>
    <ActivePlayerPanel />
    <p>PLAYER</p>
    <p>{activePlayer.name}<span class="name-handicap">{activePlayer.handicap}</span></p>
    <BandsCategoryBrowser />
</div>