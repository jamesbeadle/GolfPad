<script lang="ts">
    import { getImageURL } from "$lib/utils/helpers";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    interface Props {
        golfer: GolferSummary;
    }

    let { golfer } : Props = $props();
    
</script>

<div class="flex flex-row">
    <div class="w-1/5">
        <img alt="profile" src={getImageURL(golfer.profilePicture)} class="w-6" />
    </div>
    <div class="w-4/5">
        <p>{golfer.name}</p>
    </div>
</div>