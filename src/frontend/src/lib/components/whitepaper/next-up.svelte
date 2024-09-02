<script lang="ts">
    import { Modal } from "@dfinity/gix-components";
    
    export let visible: boolean;
    export let closeModal: () => void;
</script>

<Modal {visible} on:nnsClose={closeModal}>
    <div class="mx-4 p-4">
        <div class="flex justify-between items-center mb-4">
            <p class="condensed text-3xl">NEXT UP</p>
            <button class="times-button text-2xl" on:click={closeModal}>&times;</button>
        </div>

        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <img src="next-up-game.png" alt="game" class="w-full md:w-1/3 rounded-lg shadow-lg object-cover" />
            <div class="flex flex-col space-y-2 text-lg leading-relaxed">
                <p><span class="condensed">NEXT UP</span> is built around going first on the tee, needing to win the holes assigned to you.</p>
                <p>
                    A player gets 3 points for successfully defending a hole, an opponent will get 1 if they can beat them.
                </p>
                <p>Whoever tees off first is randomised equally throughout the round. 
                    Any remaining holes are assigned to the player with the lowest score at the time of tee off, 
                    allowing them to successfully defend the hole and potentially get back into the game.
                </p>
                <p><span class="condensed">NEXT UP</span> trains you to get good off the tee, when it matters most.</p>

            </div>
        </div>
    </div>
</Modal>
