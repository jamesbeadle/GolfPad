<script lang="ts">
    export let changePage: (delta: number) => void;
    export let currentPage: number;
    export let totalPages: bigint;

    $: canGoBack = currentPage > 1;
    $: canGoForward = currentPage < Number(totalPages);
</script>

<div class="pagination">
    <button 
        on:click={() => changePage(-1)} 
        disabled={!canGoBack}
        class:disabled={!canGoBack}
    >
        Previous
    </button>
    
    <span>Page {currentPage} of {Number(totalPages)}</span>
    
    <button 
        on:click={() => changePage(1)} 
        disabled={!canGoForward}
        class:disabled={!canGoForward}
    >
        Next
    </button>
</div>

<style>
    .pagination {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        justify-content: center;
    }

    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    button.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>