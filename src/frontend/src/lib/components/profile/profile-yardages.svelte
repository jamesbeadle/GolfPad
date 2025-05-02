<script lang="ts">
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { userStore } from "$lib/stores/user-store";
    import BrandPanel from "../shared/brand-panel.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";
    import GolfClubRow from "./golf-club-row.svelte";
    import type { GetShotAverages, ShotAverages } from "../../../../../declarations/backend/backend.did";
    import AddShotModal from "./modals/add-shot-modal.svelte";


    interface Props {
        shotAverages: ShotAverages;
    }
    
    let { shotAverages } : Props = $props();
    
    let isLoading = true;
    let showAddShotModal = true;

    onMount(async () => {
        await loadGolfShots();
    });

    async function loadGolfShots() {
        try {
            authStore.subscribe(async (store) => {
                let principalId = store.identity?.getPrincipal();
                
                const dto: GetShotAverages = {
                    principalId: principalId ? principalId.toString() : ''
                };

                shotAverages = await userStore.getShotAverages(dto);
            });
        } catch (error) {
            console.error('Error loading golf shot averages:', error);
        } finally {
            isLoading = false;
        }
    }

</script>
<BrandPanel title="The Buzz" subTitle="The latest Matches">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#if shotAverages}
            {#each shotAverages.shots as averageShot}
                <GolfClubRow {averageShot} />
            {/each}

            {#if shotAverages.shots.length == 0}
                <p>No club yardages found.</p>
            {/if}
        {:else}
            <p>No club yardages found.</p>
        {/if}
    {/if}
    <button on:click={() => showAddShotModal = true} class="w-full brand-button">Add Shot</button>
</BrandPanel>

{#if showAddShotModal}
    <AddShotModal />
{/if}