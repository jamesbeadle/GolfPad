<script lang="ts">
    export let holeNumber: number;
    export let par: number;
    export let yards: bigint;
    export let strokeIndex: number;
</script>

<div class="flex items-center justify-between p-4 text-black bg-white border-b rounded-lg border-BrandLightGray">
    <div class="items-start pr-4 space-y-1 border-r border-BrandLightGray">
        <p class="text-xs text-BrandGray">HOLE</p>
        <p class="text-3xl condensed">{holeNumber.toString().padStart(2, '0')}</p>
    </div>
    <div class="flex flex-row gap-6">
        <div class="space-y-1 text-center">
            <p class="text-sm text-BrandGray">PAR</p>
            <p class="text-2xl condensed">{par}</p>
        </div>
        
        <div class="space-y-1 text-center">
            <p class="text-sm text-BrandGray">YARDS</p>
            <p class="text-2xl condensed">{yards}</p>
        </div>
        
        <div class="space-y-1 text-center">
            <p class="text-sm text-BrandGray">S.I</p>
            <p class="text-2xl condensed">{strokeIndex}</p>
        </div>
    </div>
</div> 