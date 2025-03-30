<script lang="ts">
    import type { NeuronSummary } from '$lib/types/neuron-types';
    
    export let neuron: NeuronSummary;

    export let copyToClipboard: (id: string) => void;

    const backgroundProperties = {
        opacity: "opacity-[0.10]",
        size: "w-[130%] h-[130%]",
        frontPosition: "-bottom-1 -right-24",
        backPosition: "-bottom-1 -left-[12.5rem]"
    };

    let isFlipped = false;

    function handleFlip(id: string) {
        isFlipped = !isFlipped;
    }
    
</script>
<div class="relative z-10 mt-auto">
    <div class="flex items-center gap-2">
        <p class="mb-1 text-lg opacity-75 xxs:text-xl cta-text">Neuron</p>
        <button on:click={() => copyToClipboard(neuron.id)} class="text-sm text-BrandGrayShade4">#{neuron.displayId}</button>
    </div>
    <h3 class="text-base mini:text-lg md:text-xl lg:text-2xl">{neuron.stakedAmount} ICFC</h3>
</div>

<div class="py-4">
                
    <p class="pl-1 my-2 text-base md:text-lg cta-text">#{neuron.displayId}</p>
    <h3 class="mb-3 brand-title">Neuron Details</h3>
    
    <div class="w-full h-[1px] mini:h-[2px] bg-current mb-4"></div>

    <div class="space-y-4">
        <div>
            <p class="text-BrandGrayShade4">Staked Amount</p>
            <p class="text-xl font-semibold">{neuron.stakedAmount} ICFC</p>
        </div>
        <div>
            <p class="text-BrandGrayShade4">Status</p>
            <p class="text-xl font-semibold capitalize">{neuron.status}</p>
        </div>
        <div>
            <p class="text-BrandGrayShade4">Lock Period</p>
            <p class="text-xl font-semibold">{neuron.lockPeriod}</p>
        </div>
    </div>
</div>