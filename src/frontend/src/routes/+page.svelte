<script lang="ts">
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import Layout from "./Layout.svelte";

    let loadingFeed = true;

</script>
<Layout>
    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-2/3">
            {#if loadingFeed}
                <LocalSpinner />
            {:else}
                <!-- Need to see social news feed -->
                    <!-- Get latest 25 posts from friends -->
                        <!-- Show academy tips in places with links to subscribe -->    
                <!-- Scroll down -->    
            {/if}
        </div>
        <div class="w-full md:w-1/3 flex flex-col">
            <a class="brand-button w-full" href="/whitepaper"><button class="w-full">Whitepaper</button></a>
            <div class="w-full">
                <!-- one third game calendar, prior, live and upcoming -->

            </div>
        </div>
    </div>  
</Layout>