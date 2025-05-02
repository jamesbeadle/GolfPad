<script lang="ts">
    import { onMount } from "svelte";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    interface Props {
        players: GolferSummary[];
        selectPlayer: (playerId: string) => void;
    }

    let { players, selectPlayer } : Props = $props();

    onMount(() => {
        
    });

</script>