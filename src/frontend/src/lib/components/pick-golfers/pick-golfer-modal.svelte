<script lang="ts">
    import { golferStore } from "$lib/stores/golfer-store";
    import { onMount } from "svelte";
    import type { GolferSummary } from "../../../../../declarations/backend/backend.did";
    
    import PickGolferModalHeader from "./pick-golfer-modal-header.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import SearchIcon from "$lib/icons/search-icon.svelte";
    import PickGolferModalRow from "./pick-golfer-modal-row.svelte";
    import Modal from "$lib/components/shared/modal.svelte";
    import ModalPagination from "./modal-pagination.svelte";
    
    interface Props {
        onClose: () => void;
        onSelect?: (golfer: GolferSummary) => void;
        selectedGolfers: Record<number, GolferSummary | null>;
    }
    
    let { onClose, onSelect, selectedGolfers }: Props = $props();

    let page = $state(1n);
    let totalEntries = $state(10n);
    let itemsPerPage = $state(5n);
    let golfers = $state<GolferSummary[]>([]);
    let searchQuery = $state("");
    let isLoading = $state(true);

    let filteredGolfers = $derived(
        golfers.filter(golfer => 
            `${golfer.firstName} ${golfer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            golfer.worldRanking.toString().includes(searchQuery)
        )
    );

    let filteredTotalPages = $derived(Math.ceil(filteredGolfers.length / Number(itemsPerPage)));
    let totalPages = $derived(Math.ceil(Number(totalEntries) / Number(itemsPerPage)));

    let currentPage = $derived(Number(page));

    let paginatedGolfers = $derived(
        filteredGolfers.slice(
            (Number(page) - 1) * Number(itemsPerPage),
            Number(page) * Number(itemsPerPage)
        )
    );

    $effect(() => {
        if (searchQuery) {
            page = 1n;
        }
    });

    onMount(async () => {
        await getGolfers(page);
    });

    async function getGolfers(page: bigint) {
        try {
            isLoading = true;
            let result = await golferStore.listGolfers({ page });
            console.log(result);
            if (result) {
                totalEntries = result.totalEntries;
                golfers = result.entries;
            }
            sortGolfers();
        } catch (error) {
            console.error("Error fetching golfers", error);
        } finally {
            isLoading = false;
        }
    }

    async function sortGolfers() {
        golfers.sort((a, b) => Number(a.worldRanking) - Number(b.worldRanking));
    }

    function handleSelect(golfer: GolferSummary) {
        if (onSelect) {
            onSelect(golfer);
            onClose();
        }
    }

    function handlePageChange(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages) {
            page = BigInt(newPage);
            getGolfers(page);
        }
    }

    function isGolferSelected(golfer: GolferSummary): boolean {
        return Object.values(selectedGolfers).some(
            selectedGolfer => selectedGolfer?.id === golfer.id
        );
    }
</script>

<Modal title="Pick Golfer" {onClose}>
    <div class="space-y-4">
        <div class="relative">
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search by name..."
                class="w-full p-3 pr-10 border rounded-lg border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest text-BrandTextBlack"
            />
            <SearchIcon className="absolute w-5 h-5 text-BrandDarkGray right-3 top-3.5" />
        </div>

        {#if isLoading}
            <div class="flex justify-center py-8">
                <LocalSpinner message="Loading golfers" />
            </div>
        {:else if filteredGolfers.length === 0}
            <div class="py-8 text-center text-BrandDarkGray">
                No golfers found matching your search.
            </div>
        {:else}
            <div class="overflow-y-auto">
                <div class="grid gap-2">
                    <PickGolferModalHeader />
                    {#each paginatedGolfers as golfer}
                        <button
                            class="flex items-center w-full p-4 text-left transition-colors border rounded-lg hover:bg-BrandLightGray focus:outline-none border-BrandDivider"
                            onclick={() => handleSelect(golfer)}
                            disabled={isGolferSelected(golfer)}
                        >
                            <PickGolferModalRow {golfer} isSelected={isGolferSelected(golfer)} />
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
        {#if !isLoading && filteredGolfers.length > 0}
            <ModalPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                searchQuery={searchQuery}
                filteredTotalPages={filteredTotalPages}
                handlePageChange={handlePageChange}
            />
        {/if}
    </div>
</Modal>