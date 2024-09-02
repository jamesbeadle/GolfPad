<script lang="ts">
    import ShowSelectGameModal from "$lib/components/games/show-select-game-modal.svelte";
import LogoIcon from "$lib/icons/logo-icon.svelte";
    import Layout from "../Layout.svelte";

    let showSelectGameModal = false;

    function showSelectGame(){
        showSelectGameModal = true;
    };
    
    //let games: GameDTO[] = [];


</script>
<Layout> 
    {#if showSelectGameModal}
        <ShowSelectGameModal visible={showSelectGameModal} closeModal={() => showSelectGameModal = false} />
    {/if}
    <div class="p-4">
        <div class="flex flex-col bg-GolfPadYellow rounded-md rounded-b-lg">
            <div class="flex flex-row items-center px-4 border-b border-b-GolfPadGreen justify-between">
                <div class="flex items-center">
                    <LogoIcon fill='#FFFFFF' className="w-8 mr-2 my-2" />
                    <p class="text-base text-GolfPadBlue">My Games</p>
                </div>
                <button on:click={showSelectGame} class="btn-add my-2">New Game</button>
            </div>
            
            <div class="w-full bg-GolfPadGreen p-4 rounded-b-md flex flex-col text-sm">
                <div class="flex flex-row space-x-2">
                    <div class="w-1/12">
                        <p>Date</p>
                    </div>
                    <div class="w-2/12">
                        <p>Game</p>
                    </div>
                    <div class="w-3/12">
                        <p>Course</p>
                    </div>
                    <div class="w-4/12">
                        <p>Golfers</p>
                    </div>
                    <div class="w-1/12">
                        <p>Result</p>
                    </div>
                    <div class="w-1/12">
                        <p></p>
                    </div>
                </div>
                <div class="horizontal-divider my-2" />
                <p>No data.</p>
                <div class="horizontal-divider my-2" />
            </div>
        </div>
    </div>
</Layout>
