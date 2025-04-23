<script lang="ts">
    interface Props {
        currentPage: number;
        totalPages: number;
        searchQuery: string;
        filteredTotalPages: number;
        handlePageChange: (page: number) => void;
    }
    let { currentPage, totalPages, searchQuery, filteredTotalPages, handlePageChange }: Props = $props();
</script>



<div class="flex items-center justify-between px-4 py-3 border-t border-BrandDivider">
    <div class="flex items-center space-x-2 text-sm text-BrandDarkGray">
        <span>Page {currentPage} of {searchQuery ? filteredTotalPages : totalPages}</span>
    </div>
    <div class="flex items-center space-x-2">
        <button
            class="px-3 py-1 text-sm font-medium transition-colors border rounded-md text-BrandYellow border-BrandDivider bg-BrandForest hover:bg-BrandForest/80 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onclick={() => handlePageChange(currentPage - 1)}
        >
            Previous
        </button>
        <button
            class="px-3 py-1 text-sm font-medium transition-colors border rounded-md text-BrandYellow border-BrandDivider bg-BrandForest hover:bg-BrandForest/80 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === (searchQuery ? filteredTotalPages : totalPages)}
            onclick={() => handlePageChange(currentPage + 1)}
        >
            Next
        </button>
    </div>
</div>