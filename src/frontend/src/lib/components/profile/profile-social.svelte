
<!-- Social Panel -->
    <!-- Your friends -->
     <!-- Friend search -->
<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import { authStore } from "$lib/stores/auth-store";
    import type { Friend, FriendRequest, GetGolfCourses, GolfCourse, GolferSummary, Profile } from "../../../../../declarations/backend/backend.did";
   
    let friends: Friend[] = [];

    let friendRequests: FriendRequest[] = [];

    let searchResults: GolferSummary[] = [];
    let searchQuery: string = "";

    
    let isAcceptFriendModalOpen = false;
    let isDeclineFriendModalOpen = false;
    let selectedFriendRequest: FriendRequest | null = null;

    let selectedPlayer: FriendRequest | null = null;

async function handleAcceptFriend(request: FriendRequest) {
    selectedFriendRequest = request;
    isAcceptFriendModalOpen = true;
}

async function handleDeclineFriend(request: FriendRequest) {
    selectedFriendRequest = request;
    isDeclineFriendModalOpen = true;
}

function handleAddFriend() {
    if (selectedPlayer) {
    }
}
</script>

<div class="w-full h-full px-2 pt-4">
    <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray">
        <div class="w-full mb-8 lg:w-3/5 lg:pr-4 lg:mb-0">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl text-black condensed">YOUR FRIENDS</h3>
                <span class="text-xxs lg:text-sm text-BrandDarkGray">SMOKE THESE GUYS</span>
            </div>
            <div class="space-y-4">
                {#each friendRequests as request}
                    <div class="grid items-center grid-cols-12 p-4 bg-white rounded-lg">
                        <div class="flex items-center justify-between col-span-12 mb-2 lg:col-span-5 lg:mb-0">
                            <div class="flex items-center">
                                <img 
                                    src="default-profile-picture.jpg" 
                                    alt="Profile" 
                                    class="mr-4 rounded-full w-14 h-14"
                                />
                                <div>
                                    <span class="text-xxs text-BrandDarkGray">{request.principalId}</span>
                                    <h4 class="text-2xl text-black md:text-3xl condensed">{request.principalId.split('_')[0]}</h4>
                                </div>
                            </div>
                            <div class="flex flex-col items-end lg:hidden">
                                <span class="text-xxs text-BrandDarkGray">HANDICAP</span>
                                <span class="text-2xl text-black md:text-3xl condensed">4</span>
                            </div>
                        </div>
                        <div class="items-center hidden col-span-2 lg:flex lg:flex-col">
                            <span class="text-xxs text-BrandDarkGray">HANDICAP</span>
                            <span class="text-2xl text-black md:text-3xl condensed">4</span>
                        </div>
                        <div class="flex justify-center col-span-12 space-x-2 lg:justify-end lg:col-span-5">
                            <button 
                                class="flex-1 px-3 py-1 text-sm text-black rounded lg:flex-initial bg-BrandAcceptGreen"
                                on:click={() => handleAcceptFriend(request)}
                            >
                                ACCEPT
                            </button>
                            <button 
                                class="flex-1 px-3 py-1 text-sm text-white rounded lg:flex-initial bg-BrandDeclineRed"
                                on:click={() => handleDeclineFriend(request)}
                            >
                                REJECT
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="w-full rounded lg:w-2/5 lg:pl-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl text-black condensed">PLAYER SEARCH</h3>
                <span class="md:text-sm text-xxs text-BrandDarkGray">TIME FOR NEW FRIENDS</span>
            </div>
            
            <div class="p-4 mb-4 bg-white rounded">
                <h4 class="mb-4 text-xl text-black condensed">SEARCH PLAYERS BY NAME</h4>
                <input 
                    type="text"
                    placeholder="Enter Name"
                    class="w-full p-3 text-lg bg-white border rounded border-BrandDivider"
                    bind:value={searchQuery}
                />

                <button 
                    class="w-full p-3 mt-4 text-center transition-colors duration-200 rounded-lg"
                    class:bg-BrandYellow={selectedPlayer}
                    class:text-BrandForest={selectedPlayer}
                    class:bg-gray-200={!selectedPlayer}
                    class:text-gray-400={!selectedPlayer}
                    class:cursor-not-allowed={!selectedPlayer}
                    disabled={!selectedPlayer}
                    on:click={handleAddFriend}
                >
                    ADD FRIEND
                </button>
            </div>
        </div>
    </div>
</div>