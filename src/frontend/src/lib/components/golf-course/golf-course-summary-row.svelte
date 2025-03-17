<script lang="ts">
    import type { Writable } from "svelte/store";
    import type { GolfCourseSummary } from "../../../../../declarations/backend/backend.did";

    export let golfCourse: GolfCourseSummary;
    export let searchTerm: Writable<string>;
</script>