<script lang="ts">
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";
    import { getImageURL } from "$lib/utils/helpers";

    interface Props {
        player: GolferSummary;
        isSelected: boolean;
        onClick: () => void;
    }

    let { player, isSelected, onClick } : Props = $props();

</script>

<button 
    class="flex flex-row items-center w-full gap-3 px-5 py-3 transition-colors duration-200 rounded cursor-pointer {isSelected ? 'bg-BrandForest' : 'bg-BrandLightGray hover:bg-BrandLightGray/80'}"
    on:click={onClick}
>
    <div class="relative">
        <img 
            src={getImageURL(player.profilePicture)} 
            alt={player.name}
            class="w-8 h-8 rounded-full bg-BrandYellow"
        />
    </div>
    <p class="text-sm {isSelected ? 'text-BrandYellow' : 'text-black'}">
        {player.name}
    </p>
</button>