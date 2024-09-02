<script lang="ts">
    import { Modal } from "@dfinity/gix-components";
    
    export let visible: boolean;
    export let closeModal: () => void;
</script>

<Modal {visible} on:nnsClose={closeModal}>
    <div class="mx-4 p-4">
        <div class="flex justify-between items-center mb-4">
            <p class="condensed text-3xl">MULLIGANS</p>
            <button class="times-button text-2xl" on:click={closeModal}>&times;</button>
        </div>

        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <img src="mulligans-game.png" alt="game" class="w-full md:w-1/3 rounded-lg shadow-lg object-cover" />
            <div class="flex flex-col space-y-2 text-lg leading-relaxed">
                <p><span class="condensed">MULLIGANS</span> is a strategic golf game where you decide when to utilise your free golf shots during a game against your friends.</p>
                <p>A golfer automatically receives a mulligan every 3 holes, starting with the 1st hole.</p>
                <p>Whichever golfer wins the hole gets an additional mulligan.</p>
                <p>Golfers can strategically attempt to win a hole or stop someone else winning by playing a mulligan.</p>
                <p><span class="condensed">MULLIGANS</span> gives golfers a new way of enjoying their round safe in the knowledge a few mistakes are expected.</p>
            </div>
        </div>
    </div>
</Modal>
