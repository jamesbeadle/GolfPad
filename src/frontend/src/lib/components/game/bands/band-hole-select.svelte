<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { HoleNumber } from "../../../../../../declarations/backend/backend.did";

    export let predict : ( startingHole: HoleNumber) => void;

    export let currentPrediction: Writable<number>;
    export let predictionTitle: Writable<string>;

    function selectStartingHole(holeNumber: HoleNumber){
        selectedHoleNumber = holeNumber;
    }

    let selectedHoleNumber = 0;

</script>

<div class="flex flex-col">
    <p>PREDICTION #{$currentPrediction}</p>
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
            <div class="col-1/5"><button on:click={() => selectStartingHole(1)}>1</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(2)}>2</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(3)}>3</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(4)}>4</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(5)}>5</button></div>
        </div>
        <div class="flex-row">
            <div class="col-1/5"><button on:click={() => selectStartingHole(6)}>6</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(7)}>7</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(8)}>8</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(9)}>9</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(10)}>10</button></div>
        </div>
        <div class="flex-row">
            <div class="col-1/5"><button on:click={() => selectStartingHole(11)}>11</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(12)}>12</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(13)}>13</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(14)}>14</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(15)}>15</button></div>
        </div>
        <div class="flex-row">
            <div class="col-1/5"><button on:click={() => selectStartingHole(16)}>16</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(17)}>17</button></div>
            <div class="col-1/5"><button on:click={() => selectStartingHole(18)}>18</button></div>
            <div class="col-1/5"></div>
            <div class="col-1/5"></div>
        </div>
        <button disabled={selectedHoleNumber == 0} class="brand-button-yellow" on:click={() => predict(selectedHoleNumber)}>ADD PREDICTION</button>
    </div>
</div>