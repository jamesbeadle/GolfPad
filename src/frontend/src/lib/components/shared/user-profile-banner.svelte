<script lang="ts">
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    
    export let players: GolferSummary[];
    export let selectPlayer: (playerId: string) => void;

</script>