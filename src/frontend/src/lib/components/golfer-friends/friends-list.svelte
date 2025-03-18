<script lang="ts">
    import FriendRequestRow from "./friend-request-row.svelte";
    import FriendRow from "./friend-row.svelte";
    //TODO get friend requests

</script>
<div class="flex flex-col">
    <p>FRIEND REQUESTS</p>
    {#each friendRequests as friendRequest}
        <FriendRequestRow {friendRequest} />
    {/each}
    {#if moreFriendRequests}
        <div>
            <button>Load More</button>
        </div>
    {/if}
</div>

<div class="flex flex-col">
    <p>YOUR FRIENDS</p>
    {#each friends as friend}
        <FriendRow {friend} />
    {/each}
    {#if moreFriends}
        <div>
            <button>Load More</button>
        </div>
    {/if}
</div>
