<script lang="ts">
    import Modal from "../shared/modal.svelte";

    export let showFriendRequestSent: boolean;

</script>
<Modal showModal={showFriendRequestSent} onClose={() => showFriendRequestSent = false}>
    <p>Friend Request Sent</p>
</Modal> 