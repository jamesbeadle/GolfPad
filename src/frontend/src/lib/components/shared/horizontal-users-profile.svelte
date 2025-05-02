<script lang="ts">
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";

    interface Props {
        player: GolferSummary;
    }

    let { player } : Props = $props();
    
</script>

<div class="flex flex-row items-center gap-3">
    <div class="relative">
        <img 
            src={getImageURL(player.profilePicture)} 
            alt={player.name}
            class="w-10 h-10 rounded-full bg-BrandYellow"
        />
    </div>
    <p class="text-lg text-black condensed">
        {player.name}
    </p>
</div>