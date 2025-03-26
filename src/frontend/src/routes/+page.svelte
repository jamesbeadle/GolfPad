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
    <div class="flex flex-row gap-6 p-4 text-black md:p-6">
        <div class="w-full md:w-2/3">
            <Buzz />
            
            <div class="mt-4 md:hidden">
                <button 
                    on:click={openEventsModal}
                    class="w-full px-4 py-2 transition-colors rounded-md text-BrandYellow bg-BrandForest hover:bg-BrandForest/80"
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