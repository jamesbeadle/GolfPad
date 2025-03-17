<script lang="ts">
    import CategoryIndicator from "$lib/components/shared/category-indicator.svelte";
    import { writable, type Writable } from "svelte/store";
    import BandHoleSelect from "./band-hole-select.svelte";

    export let predict : () => void;
    export let currentPrediction: Writable<number>;
    let predictionTitle = writable('');
    let totalCategories = 9;
</script>

<div class="flex flex-row">
    <div class="w-2/5">
        <p>Categories</p>
    </div>
    <div class="w-3/5">
        <CategoryIndicator currentCategory={currentPrediction} {totalCategories} />
    </div>
</div>
<div class="flex flex-row">
    <BandHoleSelect predictionNumber={currentPrediction} {predictionTitle} {predict} />
</div>