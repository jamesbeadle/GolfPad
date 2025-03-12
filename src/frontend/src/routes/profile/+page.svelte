<!-- Tabs for Detail and Social -->
<!-- Details Panel -->
    <!-- Golfer Details -->    
    <!-- Golfer Yardages -->
        <!-- Include link to detail yardages view -->
     <!-- Seach Home Course Modal -->
<!-- Social Panel -->
    <!-- Your friends -->
     <!-- Friend search -->

<script lang="ts">
    import Layout from "../Layout.svelte";
    import { getContext, onMount } from 'svelte';
    import { userStore } from "$lib/stores/user-store";
    import EditIcon from "$lib/icons/edit-icon.svelte";
    import AddImage from "$lib/components/profile/add-image.svelte";
    import type { Friend, FriendRequest, GetGolfCourses, GolfCourse, GolferSummary, Profile } from "../../../../declarations/backend/backend.did";
    import { authStore } from "$lib/stores/auth-store";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { writable } from "svelte/store";

    let isLoading = writable(true);
    let friends: Friend[] = [];

    let friendRequests: FriendRequest[] = [];

    let searchResults: GolferSummary[] = [];

    let golfer: Profile;

    let golferPicture: string | null = null;
    let golferPictureFile: File | null = null;

    let courses: GolfCourse[] = [];
    let selectedCourse: GolfCourse | null = null;

    let activeTab: 'DETAILS' | 'SOCIAL' = 'DETAILS';

    let isImageModalOpen: boolean = false;
    let isHomeCourseModalOpen: boolean = false;
    
    let searchQuery: string = "";
    let isAcceptFriendModalOpen = false;
    let isDeclineFriendModalOpen = false;
    let selectedFriendRequest: FriendRequest | null = null;

    let selectedPlayer: FriendRequest | null = null;

    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                console.log(user)
                if(!user){ return }
                golfer = user;
                $isLoading = false;
            });
        } catch (err) {
            console.error('Creating Golfer Error:', err);
        }
    });

    async function handleFileSelect(event: CustomEvent) {
        const { file, preview } = event.detail;
        golferPictureFile = file;
        golferPicture = preview;
        isImageModalOpen = false;

        try {
        await userStore.updateProfilePicture(file);
        await userStore.cacheProfile();
        await userStore.sync();
        } catch (error) {
        console.error("Error updating profile picture:", error);
        }
    }

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

<Layout>
    {#if $isLoading}
        <LocalSpinner />
    {:else}
        <div class="w-full">
            <div class="flex items-center justify-between px-8 pt-4">
                <h2 class="text-5xl text-black md:text-4xl condensed">PROFILE</h2>
                <div class="justify-end hidden md:flex">
                    <button
                        class="px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md rounded-r-none {activeTab === 'DETAILS' ? 'bg-BrandForest' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                        on:click={() => activeTab = 'DETAILS'}
                    >
                        DETAILS
                    </button>
                    <button
                        class="px-10 py-3 text-xl text-BrandYellow condensed rounded-t-md {activeTab === 'SOCIAL' ? 'bg-BrandForest' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                        on:click={() => activeTab = 'SOCIAL'}
                    >
                        SOCIAL
                    </button>
                </div>
            </div>
            {#if activeTab === 'DETAILS'}
                <div class="w-full h-full px-2 pt-4">
                    <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray">
                        <div class="w-full mb-6 lg:w-1/3 lg:mb-0">
                            <h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3>
                            <div class="relative flex items-center justify-center w-full aspect-[16/9] lg:aspect-square bg-yellow-400 rounded-lg">
                                {#if golferPicture}
                                <div class="relative w-full h-full">
                                <!-- TODO: Should be using $userGetProfilePicture -->
                                <img src={golferPicture} alt="Profile" class="object-cover w-full h-full rounded-lg"/>
                                <button 
                                    class="absolute p-2 transition-all duration-200 bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-70"
                                    on:click={() => isImageModalOpen = true}
                                    >
                                    <EditIcon className="w-4 h-4" fill="white"/>
                                </button>
                                </div>                          
                                {:else}
                                    <img src="default-profile-picture.jpg" alt="Default Profile" class="object-cover w-full h-full rounded-lg"/>
                                    <button 
                                        class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                        on:click={() => isImageModalOpen = true}
                                    >
                                        <EditIcon className="w-20 h-20" fill="white"/>
                                    </button>
                                {/if}
                                {#if isImageModalOpen}
                                <AddImage 
                                    isOpen={isImageModalOpen} 
                                    on:close={() => isImageModalOpen = false}
                                    on:fileSelect={handleFileSelect}
                                />
                                {/if}
                            </div>
                        </div>
                        <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0">
                            <h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3>
                            {#if golfer}

                            <label for="username" class="block pt-8 pb-3 text-sm text-BrandDarkGray">USERNAME</label>
                            <input 
                            id="username"
                            placeholder="Enter your username"
                            type="text" 
                            class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
                            bind:value={golfer.username} 
                            />
                            
                            <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label>
                            <input 
                            id="handicap"
                            placeholder="Enter your handicap"
                            type="number" 
                            class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
                            bind:value={golfer.handicap[0]}
                            min="0"
                            max="54"
                            />

                            <div class="flex items-center mt-auto text-black">
                            <img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"/>
                            <div class="flex-1">
                                <label for="homeCourse" class="block pb-3 text-sm text-BrandDarkGray">HOME COURSE</label>
                                {#if selectedCourse}
                                    <div class="relative">
                                        <button 
                                            type="button"
                                            class="absolute bottom-0 right-0 p-1 transition-all duration-200 rounded-full hover:bg-black/10"
                                            on:click={() => isHomeCourseModalOpen = true}
                                        >
                                            <EditIcon className="w-4 h-4 fill-black"/>
                                        </button>
                                    </div>
                                {:else}
                                    <button 
                                        type="button"
                                        class="w-full p-2 text-left rounded text-BrandDarkGray hover:bg-black/5"
                                        on:click={() => isHomeCourseModalOpen = true}
                                    >
                                        Select home course
                                    </button>
                                {/if}
                            </div>
                            </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
            {#if activeTab === 'SOCIAL'}
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
            {/if}
            <div class="sticky bottom-0 left-0 right-0 z-10 flex w-full bg-white md:hidden">
                <button
                    class="flex-1 py-2 text-xl condensed {activeTab === 'DETAILS' ? 'bg-BrandForest text-BrandYellow' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                    on:click={() => activeTab = 'DETAILS'}
                >
                    DETAILS
                </button>
                <button
                    class="flex-1 py-2 text-xl condensed {activeTab === 'SOCIAL' ? 'bg-BrandForest text-BrandYellow' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
                    on:click={() => activeTab = 'SOCIAL'}
                >
                    SOCIAL
                </button>
            </div>
        </div>
    {/if}
</Layout>