<script lang="ts">
    import { Modal } from "@dfinity/gix-components";
    
    export let visible: boolean;
    export let closeModal: () => void;
</script>

<Modal {visible} on:nnsClose={closeModal}>
    <div class="mx-4 p-4">
        <div class="flex justify-between items-center mb-4">
            <p class="condensed text-3xl">BUILD IT</p>
            <button class="times-button text-2xl" on:click={closeModal}>&times;</button>
        </div>

        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <img src="mulligans-game.png" alt="game" class="w-full md:w-1/3 rounded-lg shadow-lg object-cover" />
            <div class="flex flex-col space-y-2 text-lg leading-relaxed">
                <p><span class="condensed">BUILD IT</span> allows groups of friends to play each other over a customisable period of time within their local club.</p>
                <p>Golfers put together a team of players to compete against other teams, buidling a combined scorecard of their lowest scores.</p>
                <p>
                    The competition is decided after the customisable period ends, allowing teams to compete for a single round or an entire year.
                </p>
                <p>
                    <span class="condensed">BUILD IT</span> will allow golfers to contribute to a team on a more granular level, enhancing the community golf experience.  
                </p>
            </div>
        </div>
    </div>
</Modal>
