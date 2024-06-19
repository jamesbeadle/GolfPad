<script lang="ts">
    import LogoIcon from "$lib/icons/logo-icon.svelte";
    import Layout from "../Layout.svelte";
    
    //let games: GameDTO[] = [];


</script>
<Layout>    
    <div class="p-4">
        <div class="flex flex-col bg-BrandGold rounded-md rounded-b-lg">
            <div class="flex flex-row items-center px-4 border-b border-b-BrandGreen justify-between">
                <div class="flex items-center">
                    <LogoIcon fill='#FFFFFF' className="w-8 mr-2 my-2" />
                    <p class="text-base text-BrandBlue">My Games</p>
                </div>
                <button class="btn-add my-2">New Game</button>
            </div>
            
            <div class="w-full bg-BrandDeepGreen p-4 rounded-b-md flex flex-col text-sm">
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
                        <p>Players</p>
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
