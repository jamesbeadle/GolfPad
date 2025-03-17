<script lang="ts">
    import type { Writable } from "svelte/store";

    export let predictionNumber: Writable<number>;
    export let predictionTitle: Writable<string>;
    export let predict : () => void;
</script>

<div class="flex flex-col">
    <p>PREDICTION #{$predictionNumber}</p>
    <div class="flex flex-row">
        <div class="w-4/5">
            <p>{$predictionTitle}</p>
        </div>
        <div class="w-1/5">
            <p>SELECT BAND OF 3</p>
        </div>
    </div>
    <div class="flex flex-col w-full">
        <div class="flex-row">
            <div class="col-1/5">1</div>
            <div class="col-1/5">2</div>
            <div class="col-1/5">3</div>
            <div class="col-1/5">4</div>
            <div class="col-1/5">5</div>
        </div>
        <div class="flex-row">
            <div class="col-1/5">6</div>
            <div class="col-1/5">7</div>
            <div class="col-1/5">8</div>
            <div class="col-1/5">9</div>
            <div class="col-1/5">10</div>
        </div>
        <div class="flex-row">
            <div class="col-1/5">11</div>
            <div class="col-1/5">12</div>
            <div class="col-1/5">13</div>
            <div class="col-1/5">14</div>
            <div class="col-1/5">15</div>
        </div>
        <div class="flex-row">
            <div class="col-1/5">16</div>
            <div class="col-1/5">17</div>
            <div class="col-1/5">18</div>
            <div class="col-1/5"></div>
            <div class="col-1/5"></div>
        </div>
        <button class="brand-button-yellow" on:click={predict}>ADD PREDICTION</button>
    </div>
</div>