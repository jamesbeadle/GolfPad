<script lang="ts">
    import type { AverageShot } from "../../../../../declarations/backend/backend.did";

    interface Props {
        averageShot: AverageShot;
    }
    
    let { averageShot } : Props = $props();
    
</script>

<!-- //TODO show profile yardage row -->