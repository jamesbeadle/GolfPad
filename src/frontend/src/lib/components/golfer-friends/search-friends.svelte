<script lang="ts">
    import FriendRequestSentModal from "./friend-request-sent-modal.svelte";

    let showFriendRequestSent = false;
</script>



<div>
    <p>SEARCH PLAYERS BY NAME</p>
</div>

<div>
    <input />
</div>

<!-- //TODO rows with add confirm button -->

{#if showFriendRequestSent}
    <FriendRequestSentModal {showFriendRequestSent} />
{/if}