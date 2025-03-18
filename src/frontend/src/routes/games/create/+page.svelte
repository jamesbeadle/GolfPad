
<script lang="ts">
    import { page } from "$app/state";
    import BandsCreate from "$lib/components/game/bands/bands-create.svelte";
    import MulligansCreate from "$lib/components/game/mulligans/mulligans-create.svelte";
    import Layout from "../../Layout.svelte";

    
  $: type = page.url.searchParams.get("type");

  function playMulligans(){
    type = 'Bands'
  }

  function playBands(){
    type = 'Mulligans'
  }

</script>

<Layout>
    {#if type && type != "" }
            {#if type == 'Bands'}
                <BandsCreate />
            {/if}
            {#if type == 'Mulligans'}
                <MulligansCreate />
            {/if}
    {:else}
        <div class="flex flex-col w-ful">
            <p>Create a new game</p>
            <div class="flex flex-row">
                <button on:click={playMulligans}>MULLIGANS</button>
                <button on:click={playBands}>BANDS</button>
            </div>
        </div>
    {/if}
            
</Layout>