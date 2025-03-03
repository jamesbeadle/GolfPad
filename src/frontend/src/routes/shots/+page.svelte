<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";
    import AddYardages from "$lib/components/profile/add-shots.svelte";
    import AddClub from "$lib/components/yardages/add-club.svelte";
    import EditYardageName from "$lib/components/yardages/edit-yardage-name.svelte";
    import DeleteClub from "$lib/components/yardages/delete-club.svelte";
    import EditIcon from "$lib/icons/edit-icon.svelte";
    import DeleteIcon from "$lib/icons/delete-icon.svelte";
    import type { YardageClub, YardageSetId, ClubIndex } from "../../../../declarations/backend/backend.did";

    interface YardageSet {
        id: YardageSetId;
        name: string;
        clubs: YardageClub[];
    }

    interface YardageClub {
        index: ClubIndex;
        name: string;
        yards: number;
    }

    let yardageSet: YardageSet = {
        id: 1,
        name: "Championship Tees",
        clubs: [
            { index: 1, name: "Driver", yards: 320 },
            { index: 2, name: "3 Wood", yards: 210 },
            { index: 3, name: "5 Wood", yards: 190 },
            { index: 4, name: "3 Iron", yards: 183 },
            { index: 5, name: "4 Iron", yards: 176 },
            { index: 6, name: "5 Iron", yards: 164 },
            { index: 7, name: "6 Iron", yards: 144 },
            { index: 8, name: "7 Iron", yards: 135 },
            { index: 9, name: "8 Iron", yards: 133 },
            { index: 10, name: "9 Iron", yards: 128 },
            { index: 11, name: "PW", yards: 0 }
        ]
    };

    let isYardagesModalOpen: boolean = false;
    let isAddClubModalOpen: boolean = false;
    let isEditYardageNameModalOpen: boolean = false;
    let isDeleteClubModalOpen: boolean = false;
</script>

<Layout>
    <div class="w-full bg-white">
        <div class="flex items-center justify-between px-8 pt-4">
            <h2 class="text-4xl text-black condensed">MY YARDAGES</h2>
        </div>
        <div class="w-full h-full px-2 pt-4">
            <div class="flex flex-col gap-4 p-4 rounded-lg lg:flex-row bg-BrandLightGray">
                <div class="flex flex-col w-full p-4 rounded-md lg:w-1/3">
                    <label for="yardage-set" class="pb-2 text-2xl text-black condensed">YARDAGE SET</label>
                    <select id="yardage-set" class="p-2 mb-6 text-lg text-black border rounded-md">
                        <option>{yardageSet.name}</option>
                    </select>
                    <button
                        type="button" 
                        class="w-full p-4 mt-auto rounded-md text-BrandForest bg-BrandYellow"
                        on:click={() => {
                            isYardagesModalOpen = true;
                        }}
                    >
                        ADD NEW SET
                    </button>
                    {#if isYardagesModalOpen}
                        <AddYardages 
                            isOpen={isYardagesModalOpen} 
                            on:close={() => isYardagesModalOpen = false}
                        />
                    {/if}
                </div>
                <div class="flex-1 p-4 bg-white rounded-md">
                    <div class="flex items-center justify-between pb-4 border-b">
                        <div class="flex items-center gap-2">
                            <h3 class="text-2xl text-black condensed">{yardageSet.name}</h3>
                            <button 
                                type="button" 
                                class="p-1 rounded-full hover:bg-gray-100"
                                on:click={() => {
                                    isEditYardageNameModalOpen = true;
                                }}
                            >
                                <EditIcon className="w-4 h-4" />
                            </button>
                            {#if isEditYardageNameModalOpen}
                                <EditYardageName 
                                    isOpen={isEditYardageNameModalOpen} 
                                    on:close={() => isEditYardageNameModalOpen = false}
                                    yardageSetName={yardageSet.name}
                                />
                            {/if}
                        </div>
                        <button class="p-2 text-sm text-black rounded-md bg-BrandLightGray">Copy From</button>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-4 text-sm sm:text-base">
                        <span class="col-span-1 text-black condensed">CLUB</span>
                        <span class="col-span-2 text-black condensed">YARDS</span>
                    </div>
                    {#each yardageSet.clubs as club, index (club.index)}
                        <div class="grid items-center grid-cols-3 gap-4 mt-4 group">
                            <span class="col-span-1 text-black condensed">{club.name}</span>
                            <div class="flex items-center justify-between col-span-2">
                                <div class="flex items-center gap-2">
                                    <input
                                        type="number"
                                        class="w-1/3 p-2 text-black border rounded-md bg-BrandLightGray focus:outline-none focus:ring-2 focus:ring-BrandForest"
                                        placeholder="Enter"
                                        bind:value={club.yards}
                                    />
                                    <button 
                                        type="button"
                                        class="invisible p-1 rounded-full hover:bg-BrandLightGray group-hover:visible"
                                        on:click={() => {
                                            isDeleteClubModalOpen = true;
                                        }}
                                    >
                                        <DeleteIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                {#if index === yardageSet.clubs.length - 1}
                                    <button 
                                        type="button"
                                        class="p-2 text-center rounded-md w-28 text-BrandYellow bg-BrandForest"
                                        on:click={() => {
                                            isAddClubModalOpen = true;
                                        }}
                                    >
                                        ADD CLUB
                                    </button>
                                {/if}
                            </div>
                        </div>
                    {/each}
                    {#if isDeleteClubModalOpen}
                        <DeleteClub 
                            isOpen={isDeleteClubModalOpen} 
                            on:close={() => isDeleteClubModalOpen = false}
                        />
                    {/if}
                    {#if isAddClubModalOpen}
                        <AddClub 
                            isOpen={isAddClubModalOpen} 
                            on:close={() => isAddClubModalOpen = false}
                        />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</Layout>