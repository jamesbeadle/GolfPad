<script lang="ts">
    import { onMount } from "svelte";


    import BrandPanel from "../shared/brand-panel.svelte";
    import LocalSpinner from "../shared/local-spinner.svelte";

    let isLoading = true;
    let buzzItems: BuzzItem[] = [];

    onMount(() => {
        buzzItems = buzzStore.get
    });

</script>
<BrandPanel title="The Buzz" subTitle="The latest Matches">
    {#if isLoading}
        <LocalSpinner />
    {:else}
        {#each buzzItem in buzzIteams}
            <BuzzRow {buzzIteam} />
        {/each}
    {/if}
</BrandPanel>