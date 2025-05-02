<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
    import type { GolferSummary, PrincipalId } from "../../../../../declarations/backend/backend.did";
    import UserProfileCircle from "./user-profile-circle.svelte";

    interface Props {
        selectUser: () => void;
        selectedPlayerId: PrincipalId;
        players: GolferSummary[];
    }

    let { selectUser, selectedPlayerId, players } : Props = $props();

</script>

<div class="flex w-full flex-row">
    {#each players as user}
        <button on:click={selectUser}>
            <UserProfileCircle src={getImageURL(user.profilePicture)} selected={user.principalId == selectedPlayerId} />
        </button>
    {/each}
</div>