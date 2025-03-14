<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";

    export let game: Game;
</script>
countdown to when the game starting
If active then game will show the hole by hole view for the game allowing the user to enter scores and validate the game saving as they go also saving in local storage
