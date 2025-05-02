<script lang="ts">
    import type { AverageShot } from "../../../../../declarations/backend/backend.did";

    interface Props {
        golfCourseId: GolfCourseId;
        selectTee: (teeGroup: TeeGroupIndex) => void;
        onClose: () => void;
        showModal: boolean;
    }
    
    let { golfCourseId, selectTee, onClose, showModal } : Props = $props();

    export let averageShot: AverageShot;
</script>

<!-- //TODO show profile yardage row -->