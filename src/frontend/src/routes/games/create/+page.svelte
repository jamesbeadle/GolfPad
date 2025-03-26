<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import Layout from "../../Layout.svelte";
    import BulletPointIcon from "$lib/icons/bullet-point-icon.svelte";
    import BandsCreate from "$lib/components/game/bands/bands-create.svelte";
    import MulligansCreate from "$lib/components/game/mulligans/mulligans-create.svelte";
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";

    $: gameType = page.url.searchParams.get("type");

    const games = [
        {
            name: "Mulligans",
            description: "Play a round of golf with the ability to replay shots. Perfect your game with strategic do-overs.",
            features: [
                "Replay difficult shots",
                "Practice course management",
                "Track improvement over time"
            ]
        },
        {
            name: "Bands",
            description: "Compete in distance-based challenges. Test your accuracy and power in different scoring zones.",
            features: [
                "Distance-based scoring",
                "Accuracy challenges",
                "Compete with friends"
            ]
        }
    ];

    function selectGame(type: string) {
        gameType = type;
    }
</script>

<Layout>
    {#if gameType && gameType != ""}
        {#if gameType === "Mulligans"}
            <ListViewPanel title="Mulligans" buttonTitle="Reset" buttonCallback={() => gameType = ""}>
                <MulligansCreate />
            </ListViewPanel>
        {:else if gameType === "Bands"}
            <ListViewPanel title="Bands" buttonTitle="Reset" buttonCallback={() => gameType = ""}>
                <BandsCreate />
            </ListViewPanel>
        {/if}
    {:else}
        <div class="p-4 overflow-y-auto rounded-lg">
            <header>
                <h1 class="title">CREATE A NEW GAME</h1>
            </header>
            
            <div class="space-y-6">
                {#each games as game}
                    <button 
                        on:click={() => selectGame(game.name)}
                        class="w-full p-4 text-left transition-all duration-300 rounded-lg bg-BrandLightGray hover:shadow-lg group"
                    >
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="mb-2 text-3xl text-black condensed">{game.name}</h2>
                                <p class="mb-6 text-lg text-BrandGray">{game.description}</p>
                                <ul class="space-y-3">
                                    {#each game.features as feature}
                                        <li class="flex items-center gap-3">
                                            <BulletPointIcon className="w-3 h-3 flex-shrink-0" />
                                            <span class="text-BrandForest">{feature}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                            <div class="transition-transform duration-300 text-BrandGreen group-hover:translate-x-2">
                                →
                            </div>
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</Layout>