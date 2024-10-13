<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../../Layout.svelte";
    export let params;    
</script>

<Layout>
    <div class="w-full">
        <div class="w-full p-2 px-4 text-black">
            <div class="flex items-center justify-between">
                <h2 class="mt-1 text-3xl font-black text-black md:text-5xl condensed">GAME DETAILS</h2>
            </div>
        </div>
        <div class="flex w-full p-4 text-black bg-gray-100 ">
            <div class="w-1/3">
                <img src="/hero.png" alt="Mulligans" class="game-image" />
            </div>

            <div class="flex flex-col items-start justify-center w-1/3 ml-8"style="margin-top: 10px;" >
                <span class="mb-0 text-sm font-medium text-gray-500 ">GAMETYPE</span>
                <h1 class="font-black text-7xl game-type condensed"style="line-height: 1;">
                    MULLI-<br>GANS
                </h1>
                <!--TODO needs to be replaced with date of game-->
                <div class= "flex flex-col"style="margin-top: 10px;">
                    <span class="mb-0 text-sm font-medium text-gray-500"style="margin-top: 10px;">DATE</span>
                    <h3 class ="mb-4 text-4xl font-bold text-center condensed game-date">October 9 2024</h3>
                </div>
                <!--TODO needs to be replaced with actual course-->
                <div class="flex items-center justify-start course-details"style="margin-top: 10px;" >
                    <img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg course-image"/>
                    <div class= "flex flex-col">
                        <span class="mb-0 text-sm font-medium text-gray-500">COURSE</span>
                        <div>
                            <p class="text-3xl font-bold text-center condensed game-date">Course's Name</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!--TODO needs to be replaced with game info-->
            <div class="w-1/3">
                <h4 class="mt-8 mb-0 text-3xl font-bold condensed"style="margin-top: -3px;">Player Details</h4>
                <div class="mt-4 bg-white player-details">
                    <div class="flex flex-col mb-3">
                        <div class="flex px-4 mt-6 mb-2 space-x-2">
                            <img src="/team/james.jpg" alt="Player 1" class="w-10 h-10 rounded-full">
                            <img src="/team/josh.jpg" alt="Player 2" class="w-10 h-10 rounded-full">
                            <img src="/team/george.jpg" alt="Player 3" class="w-10 h-10 rounded-full">
                        </div>
                        <hr class="my-2 mb-5 border-gray-300 border-t-1"style="border-color: #F3F3F3;"/>
                        <div class ="flex items-center justify-between bg-white">
                            <div class="flex flex-col px-4">
                                <div class="font-medium text-gray-500 text-xxs">PLAYER</div>
                                <p class="mb-2 text-lg font-bold condensed">James (18)</p>
                            </div>

                            <div class="flex flex-col">
                                <div class="font-medium text-gray-500 text-xxs">GAME PLACE</div>
                                <p class="mb-2 text-lg font-bold condensed">WINNER</p>
                            </div>

                            <div class="flex flex-col px-4">
                                <div class="font-medium text-gray-500 text-xxs">PLAYER</div>
                                <p class="mb-2 text-lg font-bold condensed">78 (+6)</p>
                            </div>
                        </div>
                        <hr class="mt-2 border-gray-300 border-t-1" style="border-color: #F3F3F3;" />
                    </div>
                    <div class="mt-2"style="margin-top: -15px;">
                        <table class="flex flex-col w-full border-collapse table-auto ">
                            <thread>
                                <tr style="border-color: #F3F3F3; margin-top: -10px; border-top-width: 1px;">
                                    <th class="p-4 pr-10 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Hole</th>
                                    <th class="p-6 pr-10 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Par</th>
                                    <th class="p-6 pr-6 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">Score</th>
                                    <th class="p-6 text-lg font-bold text-center border-b condensed"style="border-color: #F3F3F3;">+/- Par</th>
                                </tr>
                            </thread>
                            <tbody>
                                <!--TODO needs to be replaced with game info-->
                                <tr>
                                    <td class="p-4 pl-6 text-lg font-bold text-center border-b condensed">1</td>
                                    <td class="p-4 pl-16 text-lg text-center border-b">4</td>
                                    <td class="p-4 pl-16 text-lg text-center border-b">4</td>
                                    <td class="p-4 pl-16 text-lg text-center border-b">E</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
<style>
    .game-image {
        width: 100%;
        height: auto;
        border-radius:8px;
    }
    .course-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }
</style>