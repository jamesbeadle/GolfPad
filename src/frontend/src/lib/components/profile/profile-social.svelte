<script lang="ts">
    import Layout from "../../../routes/+layout.svelte";
    import FriendsList from "../golfer-friends/friends-list.svelte";
    import SearchFriends from "../golfer-friends/search-friends.svelte";
    import Modal from "$lib/components/shared/global/modal.svelte";

    let showSearchFriendsModal = false;

    function closeSearchFriendsModal() {
        showSearchFriendsModal = false;
    }

    function openSearchFriendsModal() {
        showSearchFriendsModal = true;
    }
</script>

<Layout>
    <div class="flex flex-col md:flex-row gap-6 p-4 md:p-6 text-black">
        <div class="w-full md:w-2/3">
            <FriendsList />
            
            <div class="md:hidden mt-4">
                <button 
                    onclick={openSearchFriendsModal}
                    class="w-full bg-BrandGreen text-white py-2 px-4 rounded-md hover:bg-BrandForest transition-colors"
                >
                    Search Friends
                </button>
            </div>
        </div>

        <div class="hidden md:block md:w-1/3">
            <SearchFriends />
        </div>
    </div>

    {#if showSearchFriendsModal}
        <Modal onClose={closeSearchFriendsModal} title="Find Friends">
            <SearchFriends />
        </Modal>
    {/if}
</Layout>