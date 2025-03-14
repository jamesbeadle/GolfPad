<script lang="ts">
    import { formatUnixDateToReadable } from "$lib/utils/helpers";
import type { GolferSummary } from "../../../../../declarations/backend/backend.did";

    export let golfer: GolferSummary;
</script>

<div class="flew flex-row">
    <div class="w-1/4">
        <div class="flex flex-row items-center">
            <img class="w-6 mr-2" alt={`profile-${golfer.principalId}`} />
            <div class="flex flex-col">
                <p>{golfer.name}</p>
                <p>{formatUnixDateToReadable(golfer.joinedOn)}</p>
            </div>
        </div>
    </div>
    <div class="w-1/4">
        <div class="flex flex-row items-center">

        </div>
    </div>
</div>