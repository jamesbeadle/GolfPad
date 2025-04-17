<script lang="ts">
    import { onMount } from "svelte";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    
    export let players: GolferSummary[];
    export let selectPlayer: (playerId: string) => void;

    onMount(() => {
        
    });

</script>