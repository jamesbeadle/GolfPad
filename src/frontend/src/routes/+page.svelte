<script lang="ts">
    import Buzz from "$lib/components/buzz/buzz.svelte";
    import Modal from "$lib/components/shared/modal.svelte";
    import Upcoming from "$lib/components/upcoming/upcoming.svelte";
    import Layout from "./Layout.svelte";

    let showEventsModal = false;

    function closeEventsModal() {
        showEventsModal = false;
    }

    function openEventsModal() {
        showEventsModal = true;
    }
</script>

<Layout>
    <div class="flex flex-col md:flex-row gap-6 p-4 md:p-6 text-black">
        <div class="w-full md:w-2/3">
            <Buzz />
            
            <div class="md:hidden mt-4">
                <button 
                    on:click={openEventsModal}
                    class="w-full bg-BrandGreen text-white py-2 px-4 rounded-md hover:bg-BrandForest transition-colors"
                >
                    View Events
                </button>
            </div>
        </div>

        <div class="hidden md:block md:w-1/3">
            <Upcoming />
        </div>
    </div>

    {#if showEventsModal}
        <Modal showModal={showEventsModal} onClose={closeEventsModal}>
            <Upcoming />
        </Modal>
    {/if}
</Layout>