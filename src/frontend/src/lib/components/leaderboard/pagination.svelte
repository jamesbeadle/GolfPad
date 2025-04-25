<script lang="ts">
    interface Props {
        currentPage: bigint;
        totalPages: number;
        onPageChange: (page: bigint) => Promise<void>;
        totalEntries: bigint;
        currentEntries: number;
    }

    let { 
        currentPage,
        totalPages,
        onPageChange,
        totalEntries,
        currentEntries
    }: Props = $props();
</script>

<div class="flex items-center justify-between p-4 border-t border-BrandDivider">
    <div class="flex items-center gap-2">
        <button 
            class="px-3 py-1 text-sm rounded {currentPage === 1n ? 'text-BrandGray cursor-not-allowed' : 'text-BrandForest hover:bg-BrandLightGray'}"
            onclick={() => onPageChange(currentPage - 1n)}
            disabled={currentPage === 1n}
        >
            Previous
        </button>
        <span class="text-sm text-BrandDarkGray">
            Page {currentPage} of {totalPages}
        </span>
        <button 
            class="px-3 py-1 text-sm rounded {currentPage === BigInt(totalPages) ? 'text-BrandGray cursor-not-allowed' : 'text-BrandForest hover:bg-BrandLightGray'}"
            onclick={() => onPageChange(currentPage + 1n)}
            disabled={currentPage === BigInt(totalPages)}
        >
            Next
        </button>
    </div>
    <p class="text-sm text-BrandDarkGray">
        Showing {currentEntries} of {totalEntries} entries
    </p>
</div> 