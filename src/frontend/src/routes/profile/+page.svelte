<script lang="ts">
    import Layout from "../Layout.svelte";
    import CustomDropdown from '$lib/components/shared/dropdown.svelte';
    import { onMount } from 'svelte';
    import { playerStore } from "$lib/stores/player-store";
    import { courseStore } from "$lib/stores/course-store";
    import { userStore } from "$lib/stores/user-store";
    import type { GolfCourseDTO, CreateGolferDTO, PaginationFilters, UpdateGolferPictureDTO, FriendRequestDTO, GolferSummaryDTO } from "../../../../declarations/backend/backend.did";
    import EditIcon from "$lib/icons/edit-icon.svelte";
    import AddImage from "$lib/components/profile/add-image.svelte";
    import AddHomeCourse from "$lib/components/profile/add-home-course.svelte";
    import AddYardages from "$lib/components/profile/add-yardages.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { userGetProfilePicture } from "$lib/derived/user-derived";


    let existingFriends = [
        { principalId: "LEE, M.W._4857357", displayName: "LEE, M.W.", handicap: [2] },
        { principalId: "WOLF_238475", displayName: "WOLF", handicap: [12] },
        { principalId: "MCELROY_238475", displayName: "MCELROY", handicap: [4] },
        { principalId: "HATTON_238475", displayName: "HATTON", handicap: [22] }
    ];

    let friendRequests: FriendRequestDTO[] = [
        { principalId: "DECHU_475", requestTime: BigInt(Date.now()) },
        { principalId: "SMITH_238475", requestTime: BigInt(Date.now()) }
    ];

    let searchResults: GolferSummaryDTO[] = [
        { golferPrincipalId: "SAVAGE3_238475", golferName: "SAVAGE3", golferPicture: [], golferPictureExtension: "jpg", handicap: [8] },
        { golferPrincipalId: "SAVAGE63_238475", golferName: "SAVAGE63", golferPicture: [], golferPictureExtension: "jpg", handicap: [22] }
    ];

    let golfer: CreateGolferDTO = {
        username: "",
        handicap: [0],
    };

    let golferPicture: string | null = null;
    let golferPictureFile: File | null = null;

    let courses: GolfCourseDTO[] = [];
    let selectedCourse: GolfCourseDTO | null = null;

    let activeTab: 'DETAILS' | 'SOCIAL' = 'DETAILS';
    let isNewUser: boolean = true;

    let principalId: string | undefined;

    let isImageModalOpen: boolean = false;
    let isHomeCourseModalOpen: boolean = false;
    let isYardagesModalOpen: boolean = false;

    let isCreating = false;
    let error = '';

    let searchQuery: string = "";
    let isAcceptFriendModalOpen = false;
    let isDeclineFriendModalOpen = false;
    let selectedFriendRequest: FriendRequestDTO | null = null;

    let selectedPlayer: GolferSummaryDTO | null = null;

    onMount(async () => {
        try {
            isNewUser = await userStore.sync(); 
            console.log("sync complete");
            
            const filters: PaginationFilters = {
                limit: BigInt(10),
                offset: BigInt(0),
            };
            courses = await courseStore.getCourses(filters);
            
        } catch (err) {
            console.error('Creating Golfer Error:', err);
        }
    });

    async function createUser() {
        if (isNewUser) {
            if (!golfer.username) {
                error = "Username is required";
                return;
            }

            isCreating = true;
            error = '';

            try {
                const handicapValue = Number(golfer.handicap[0]);
                if (isNaN(handicapValue)) {
                    throw new Error("Invalid handicap value");
                }
                
                const handicapArray: [number] = [handicapValue];
                
                await userStore.createUser(
                    golfer.username,
                    handicapArray,
                );

                isNewUser = false;
                await userStore.cacheProfile();
                await userStore.sync();
                
            } catch (err) {
                error = "Failed to create user. Please try again.";
                console.error("Error creating user:", err);
            } finally {
                isCreating = false;
                console.log("createUser complete");
            }
        }
    }

    async function saveGolferDetails() {
        if (!golfer.username) {
            console.error("Username is required");
            return;
        }
        try {
            const createGolferDTO: CreateGolferDTO = {
                username: golfer.username,
                handicap: golfer.handicap,
            };

            console.log("Saving golfer details:", createGolferDTO);
            await playerStore.createPlayer(createGolferDTO);
            console.log("Golfer details saved successfully");
        } catch (err) {
            console.error("Failed to save golfer details:", err);
        }
  }

  async function handleFileSelect(event: CustomEvent) {
    const { file, preview } = event.detail;
    golferPictureFile = file;
    golferPicture = preview;
    isImageModalOpen = false;

    try {
      await userStore.updateProfilePicture(file);
      await userStore.cacheProfile();
      await userStore.sync();
      console.log("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  }

  async function handleAcceptFriend(request: FriendRequestDTO) {
    selectedFriendRequest = request;
    isAcceptFriendModalOpen = true;
  }

  async function handleDeclineFriend(request: FriendRequestDTO) {
    selectedFriendRequest = request;
    isDeclineFriendModalOpen = true;
  }

  function handleAddFriend() {
    if (selectedPlayer) {
        // TODO: Implement friend request logic
        console.log('Sending friend request to:', selectedPlayer.golferName);
    }
  }
</script>

<Layout>
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

                        {#if isNewUser}
                            {#if error}
                                <p class="mb-2 text-red-500">{error}</p>
                            {/if}
                            <button 
                                class="px-2 py-2 mb-4 text-sm rounded lg:px-3 lg:py-1 text-BrandYellow bg-BrandForest hover:bg-green-700 disabled:opacity-50"
                                on:click={createUser}
                                disabled={!golfer.username || isCreating}
                            >
                                {#if isCreating}
                                    Creating...
                                {:else}
                                    CREATE USER
                                {/if}
                            </button>
                        {/if}

                        <div class="flex items-center mt-auto text-black">
                        <img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"/>
                        <div class="flex-1">
                            <label for="homeCourse" class="block pb-3 text-sm text-BrandDarkGray">HOME COURSE</label>
                            {#if selectedCourse}
                                <div class="relative">
                                    <p class="text-xl text-black condensed">{selectedCourse.name}</p>
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
                            {#if isHomeCourseModalOpen}
                                <AddHomeCourse 
                                    isOpen={isHomeCourseModalOpen} 
                                    on:close={() => isHomeCourseModalOpen = false}
                                    on:courseSelect={(event) => {
                                    selectedCourse = event.detail.course;
                                    isHomeCourseModalOpen = false;
                                    }}
                                />
                            {/if}
                        </div>
                        </div>
                    </div>
                    <div class="w-full px-0 lg:w-1/3 lg:px-4">
                        <h3 class="text-xl text-black condensed">YARDAGES</h3>
                        <div class="flex flex-col h-[calc(100%-1rem)] p-4 rounded-lg bg-BrandLightGray">
                            <div class="flex flex-col h-full bg-white rounded-lg">
                                <div class="flex items-center justify-between p-2 text-black lg:py-4 lg:mx-4 condensed">
                                    <span>CLUB</span>
                                    <span>YARDS</span>
                                </div>
                                <div class="flex items-center justify-center flex-1">
                                    <p class="px-8 text-sm text-center text-BrandDarkGray">No yardages have been added. Click the button below to get started.</p>
                                </div>
                                <div class="px-4 pb-4">
                                    <button 
                                    class="w-full p-2 rounded text-BrandYellow bg-BrandForest hover:bg-green-700"
                                    on:click={() => isYardagesModalOpen = true}
                                    >
                                        ADD YARDAGES
                                    </button>
                                    {#if isYardagesModalOpen}
                                    <AddYardages 
                                        isOpen={isYardagesModalOpen} 
                                        on:close={() => isYardagesModalOpen = false}
                                    />
                                    {/if}
                                </div>
                            </div>
                        </div>
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
                            {#each existingFriends as friend}
                                <div class="grid items-center grid-cols-12 p-4 bg-white rounded-lg">
                                    <div class="flex items-center justify-between col-span-12 mb-2 lg:col-span-5 lg:mb-0">
                                        <div class="flex items-center">
                                            <img 
                                                src="default-profile-picture.jpg" 
                                                alt="Profile" 
                                                class="mr-4 rounded-full w-14 h-14"
                                            />
                                            <div>
                                                <span class="text-xxs text-BrandDarkGray">{friend.principalId}</span>
                                                <h4 class="text-2xl text-black md:text-3xl condensed">{friend.displayName}</h4>
                                            </div>
                                        </div>
                                        <div class="flex flex-col items-end lg:hidden">
                                            <span class="text-xxs text-BrandDarkGray">HANDICAP</span>
                                            <span class="text-2xl text-black md:text-3xl condensed">{friend.handicap[0]}</span>
                                        </div>
                                    </div>
                                    <div class="items-center hidden col-span-2 lg:flex lg:flex-col">
                                        <span class="text-xxs text-BrandDarkGray">HANDICAP</span>
                                        <span class="text-3xl text-black condensed">{friend.handicap[0]}</span>
                                    </div>
                                    <div class="flex justify-center col-span-12 lg:justify-end lg:col-span-5">
                                        <button 
                                            class="w-full px-5 py-1 text-sm rounded lg:w-auto text-BrandYellow bg-BrandForest"
                                        >
                                            VIEW
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

                            <div class="pt-4 space-y-4">
                                {#each searchResults as player}
                                    <button 
                                        type="button"
                                        class="grid items-center w-full grid-cols-12 p-4 text-left bg-white rounded cursor-pointer hover:bg-gray-50"
                                        class:bg-gray-50={selectedPlayer === player}
                                        on:click={() => selectedPlayer = player}
                                        on:keydown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                selectedPlayer = player;
                                            }
                                        }}
                                        role="option"
                                        aria-selected={selectedPlayer === player}
                                    >
                                        <div class="flex items-center justify-between col-span-12">
                                            <div class="flex items-center">
                                                <img 
                                                    src="default-profile-picture.jpg" 
                                                    alt="Profile" 
                                                    class="w-10 h-10 mr-4 rounded-full"
                                                />
                                                <div class="flex flex-col">
                                                    <span class="text-xs text-BrandDarkGray">{player.golferPrincipalId}</span>
                                                    <span class="text-xl text-black condensed">{player.golferName}</span>
                                                </div>
                                            </div>
                                            <div class="flex flex-col items-end">
                                                <span class="text-xs text-BrandDarkGray">HANDICAP</span>
                                                <span class="text-xl text-black condensed">{player.handicap[0]}</span>
                                            </div>
                                        </div>
                                    </button>
                                {/each}
                            </div>
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
</Layout>