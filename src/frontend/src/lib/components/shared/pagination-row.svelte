<script lang="ts">
    export let changePage: (delta: bigint) => void;
    export let page: bigint;
    export let pageSize: bigint;
    export let total: bigint;
    export let typeName: string;
</script>


{#if total > 0}
<div class="flex justify-between items-center mt-4">
    <div class="text-sm text-BrandDarkGray">
        Showing {(page - 1n) * pageSize + 1n} to
        {Math.min(Number(page * pageSize), Number(total))} of {total} {typeName}
    </div>
    <div class="flex gap-2">
        <button
            class="brand-button"
            disabled={page === 1n}
            on:click={() => changePage(page - 1n)}
        >
            Previous
        </button>
        <button
            class="brand-button"
            disabled={page === BigInt(Math.ceil(Number(total / pageSize)))}
            on:click={() => changePage(page + 1n)}
        >
            Next
        </button>
    </div>
</div>
{/if}