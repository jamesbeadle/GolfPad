<script lang="ts">
    import { Modal } from "@dfinity/gix-components";
    
    export let visible: boolean;
    export let closeModal: () => void;
</script>

<Modal {visible} on:nnsClose={closeModal}>
    <div class="mx-4 p-4">
        <div class="flex justify-between items-center mb-4">
            <p class="condensed text-3xl">BANDS</p>
            <button class="times-button text-2xl" on:click={closeModal}>&times;</button>
        </div>

        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <img src="bands-game.png" alt="game" class="w-full md:w-1/3 rounded-lg shadow-lg object-cover" />
            <div class="flex flex-col space-y-2 text-lg leading-relaxed">
                <p><span class="condensed">BANDS</span> is designed for those purple patches you get in golf, the parts of the round you know you typically play well in.</p>
                <p>You select a 3 hole range, know as a <span class="condensed">BAND</span>, as the part of your round you will hit one of our 9 acheivement categories.</p>
                <p>You'll build up points for scoring well on holes along with hitting fairways, greens or not losing a ball.</p>
                <p><span class="condensed">BANDS</span> trains each part of your game using a new and exciting format.</p>
                <p>Whether you start well or only get going towards the end, playing well at the right time is what counts.</p>
            </div>
        </div>
    </div>
</Modal>
