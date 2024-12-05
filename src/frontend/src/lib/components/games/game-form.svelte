<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Layout from "../../../routes/Layout.svelte";
    import Dropdown from "../shared/dropdown.svelte";
    import { gameStore } from "$lib/stores/game-store";
    import { courseStore } from "$lib/stores/course-store";
    import { playerStore } from "$lib/stores/player-store";
    import type { CreateGameDTO, GolfCourseDTO, GameType, PaginationFilters, GolfersDTO, TeeGroup } from "../../../../../declarations/backend/backend.did";
    import { formatDateStringtoBigInt } from "$lib/utils/helpers";
    
    export let gameTitle: string;
    export let opponentConfig: {
        multiple: boolean;
        maxPlayers?: number;
        playerLabels?: string[]; 
    };

    let courses:GolfCourseDTO[] = []; 
    let opponents: GolfersDTO[] = [];
    let tees: {name: string, value: string}[] = [];
    let dropdownItems: {name: string, value: any}[] = [];

    let selectedOpponent: {name: string, value: any}[] = [];
    let selectedCourse: GolfCourseDTO | null = null;
    let selectedCourseObject: {name: string, value: any} | null = null;
    let selectedCourseId: { value: string }| null = null;
    let selectedTee: {name: string, value: string} | null = null;

    let currentGameId = 1;
    let teeOffDate: string = "";
    let teeOffTime: string = "";
    let teeOffDateTime: string = "";

    $: teeOffDateTime = teeOffDate + "T" + teeOffTime;
    
    // onMount(async () => {
    //     try{
    //         const filters: PaginationFilters = {
    //             limit: BigInt(10),
    //             offset: BigInt(0),
    //         };
    //         courses = await courseStore.getCourses(filters);

    //         const golfersResponse = await playerStore.listPlayers("");
    //         opponents = golfersResponse.golfers;
    //         dropdownItems = opponents.map(opponent => {
    //             return {
    //                 name: opponent.username,
    //                 value: opponent.username
    //             };
    //             });
    //         }
    //     catch(error){
    //         console.error("Error Fetching Course", error);
    //     }
    // });

    $: if (selectedCourseId?.value) {
        selectedCourse = courses.find((course) => course.courseId.toString() === selectedCourseId!.value) || null;
        console.log("Selected Course:", selectedCourseId);
        if (selectedCourse) {
            tees = selectedCourse.tees.map((tee: TeeGroup) => ({
                name: tee.name,
                value: tee.name,
            }));
            console.log("Tees:", tees);
            selectedTee = null;
        }
    }

    function generateGameId() {
        //TODO Get highest game id and add 1 (currently no backend canister function to get highest game id)
        currentGameId += 1;
        return currentGameId;
    }
    async function handleCreateGame() {
        if (!selectedCourse || !selectedTee || selectedOpponent.length === 0) {
        console.error("Please fill out all fields.");
        return;
    }
        const gameTypeMap: Record<string, GameType> = {
            Mulligans: { Mulligans: null },
            BuildIt: { BuildIt: null },
            Bands: { Bands: null },
            NextUp: { NextUp: null },
            Prophet: { Prophet: null },
        };
        const gameType = gameTypeMap[gameTitle];
        if (!gameType) {
            console.error(`Invalid gameTitle: ${gameTitle}`);
            return;
        }
        
        const teeOffTime = formatDateStringtoBigInt(teeOffDateTime);
        
        const dto: CreateGameDTO = {
            createdById: "Kelly-Howlett",
            courseType: {Official: null},
            courseId: BigInt(selectedCourse.courseId),
            gameType: gameType,
            inviteIds: ["James-Beadle"],
            teeOffTime: teeOffTime,
            teeGroup: selectedTee.value,
        };
        console.log("DTO:", dto);
        try{
            const result = await gameStore.createGame(dto);
            if (result.ok) {
                console.log("Game Created, Game ID:", result.ok);
                goto(`/games/${result.ok}`);
            } else {
                console.error("Error Creating Game", result.err);
            }
        }
        catch(error){
            console.error("Error Creating Game", error);
        }
    }
</script>

<Layout>
    <div class="flex flex-col w-full">
        <div class="w-full p-2 px-4 text-black">
            <h2 class="mx-2 mt-2 mb-0 text-5xl font-black text-black md:mx-4 condensed">
                {gameTitle.toUpperCase()}
            </h2>
        </div>

        <div class="w-full p-4 text-black bg-gray-100 rounded-lg">
            <label for="course" class="block mt-4 text-lg font-bold text-black">
                Course
            </label>
            <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                <div class="flex-grow max-w-md">
                    <Dropdown 
                        items={courses.map(course => ({
                            name: course.name,
                            value: course.courseId.toString()
                        }))}
                        bindSelected={selectedCourseObject}
                        placeholder="Select Course"
                        multiple={false}
                        searchEnabled={false}
                        on:select={(e) => {
                            selectedCourseObject = e.detail; 
                            selectedCourseId = e.detail.value;
                        }}
                    />
                </div> 
            </div>
            {#if selectedCourseId}
                <label for="tee" class="block mt-4 text-lg font-bold text-black">Select Tee Group</label>
                <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                    <div class="flex-grow max-w-md">
                        <Dropdown
                            items={tees}
                            bindSelected={selectedTee}
                            placeholder="Select Tee Group"
                            searchEnabled={false}
                            multiple={false}
                            on:select={(e) => {
                                selectedTee = e.detail.value;
                            }}
                        />
                    </div> 
                </div>
            {/if}
            <label for="date" class="block mt-4 text-lg font-bold text-black">Select Tee Off Date</label>
            <div class="flex items-center w-full mt-2">
                <div class="flex-grow max-w-md">
                    <input
                        type="date"
                        bind:value={teeOffDate}
                        class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded"
                        placeholder="dd/mm/yyyy"
                    />
                </div>
            </div>
            <label for="time" class="block mt-4 text-lg font-bold text-black">Select Tee Off Time</label>
            <div class="flex items-center w-full mt-2">
                <div class="flex-grow max-w-md">
                    <input
                        type="time"
                        bind:value={teeOffTime}
                        class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded"
                        placeholder="hh:mm"
                    />
                </div>
            </div>
            <label for="opponent" class="block mt-4 text-lg font-bold text-black">
                {opponentConfig.playerLabels ? 'Players' : 'Opponents'}
            </label>

            <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                <div class="flex-grow max-w-md">
                    {#if opponents.length > 0}
                        <Dropdown
                            items={dropdownItems}
                            bindSelected={selectedOpponent}
                            placeholder="Select your Opponent(s)"
                            searchEnabled={false}
                            multiple={false}
                            on:select={(e) => {
                                selectedOpponent = e.detail.value;
                            }}
                        />
                    {:else}
                        <div>Loading opponents...</div>
                    {/if}

                </div>
            </div>
        </div>    
        <button class="btn btn-new-game md:w-[400px] w-full" on:click={handleCreateGame}>
            Create New Game
        </button>
    </div>
</Layout>
