<script lang="ts">
    export let isOpen = false;
    export let onConfirm: () => void;
    export let onCancel: () => void;
    export let message: string;
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="p-6 bg-white rounded-lg">
            <p class="mb-6 text-lg text-black">{message}</p>
            <div class="flex justify-end space-x-3">
                <button 
                    class="px-4 py-2 text-sm rounded bg-BrandLightGray text-BrandDarkGray hover:bg-BrandLightGray/80"
                    on:click={onCancel}
                >
                    Cancel
                </button>
                <button 
                    class="px-4 py-2 text-sm rounded bg-BrandForest text-BrandYellow hover:bg-BrandYellow hover:text-BrandForest"
                    on:click={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
{/if}