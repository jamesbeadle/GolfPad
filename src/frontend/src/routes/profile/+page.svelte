<script lang="ts">
  import Layout from "../Layout.svelte";
  import CustomDropdown from '$lib/components/shared/dropdown.svelte';
  import { onMount } from 'svelte';
  import { playerStore } from "$lib/stores/player-store";
  import { courseStore } from "$lib/stores/course-store";
  import { userStore } from "$lib/stores/user-store";
  import type { GolfCourseDTO, CreateGolferDTO, PaginationFilters } from "../../../../declarations/backend/backend.did";
  import EditIcon from "$lib/icons/edit-icon.svelte";
  import AddImage from "$lib/components/profile/add-image.svelte";
  import AddHomeCourse from "$lib/components/profile/add-home-course.svelte";

  let golfer: CreateGolferDTO = {
      username: "",
      handicap: [],
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

  onMount(async () => {
    try {
        /* userStore.sync(); 
        userStore.subscribe((user) => {
            if (user && user.principalId) {
                principalId = user.principalId;
                console.log("Principal ID:", principalId);
            } else {
                console.error("Principal ID not found");
            }
        }); */

        const filters: PaginationFilters = {
            limit: BigInt(10),
            offset: BigInt(0),
        };
        courses = await courseStore.getCourses(filters);
        console.log("Courses:", courses);
    } catch (err) {
        console.error('Error fetching courses or user store:', err);
    }
});

  function handleProfilePictureChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
          golferPictureFile = input.files[0];
          golferPicture = URL.createObjectURL(input.files[0]);
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

          const result = await playerStore.createPlayer(createGolferDTO);
          if (result.length > 0) {
              console.log("Golfer details saved successfully");
          } else {
              console.error("Error saving golfer details");
          }
      } catch (err) {
          console.error("Failed to save golfer details:", err);
      }
  }
</script>

<Layout>
  <div class="w-full">
    <div class="flex items-center justify-between px-8 pt-4">
        <h2 class="text-4xl text-black condensed">PROFILE</h2>
        <div class="flex justify-end">
          <button
              class="px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md rounded-r-none {activeTab === 'DETAILS' ? 'bg-BrandForest' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
              on:click={() => activeTab = 'DETAILS'}
          >
              DETAILS
          </button>
          <button
              class="px-10 py-3 text-xl text-BrandYellow condensed rounded-t-md {activeTab === 'SOCIAL' ? 'bg-BrandForest' : 'bg-[#F9F9F9] text-[#C0C0C0]'}"
              on:click={() => !isNewUser && (activeTab = 'SOCIAL')}
              disabled={isNewUser}
          >
              SOCIAL
          </button>
        </div>
    </div>
      <div class="w-full h-full px-2 pt-4">
          <div class="flex p-4 rounded-md bg-BrandLightGray">
              <div class="w-1/3">
                  <div class="relative flex items-center justify-center w-full h-full bg-yellow-400 rounded-lg">
                      {#if golferPicture}
                      <div class="relative w-full h-full">
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
                            on:fileSelect={(event) => {
                                const { file, preview } = event.detail;
                                golferPictureFile = file;
                                golferPicture = preview;
                                isImageModalOpen = false;
                            }}
                        />
                      {/if}
                      <!-- <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" on:change={handleProfilePictureChange} /> -->
                  </div>
              </div>
              <div class="flex flex-col w-1/3 px-4">
                  <h3 class="mb-4 text-xl text-black condensed">DETAILS</h3>

                  <label for="username" class="block pt-8 pb-3 text-sm text-BrandDarkGray">USERNAME</label>
                  <input 
                    id="username"
                    placeholder="Enter your username"
                    type="text" 
                    class="w-full p-2 mb-4 text-2xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
                    bind:value={golfer.username} 
                  />
                  
                  <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label>
                  <input 
                    id="handicap"
                    placeholder="Enter your handicap"
                    type="number" 
                    class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
                    bind:value={golfer.handicap} 
                  />

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

              <!-- Yardages Section -->
              <div class="w-1/3 px-4">
                  <h3 class="text-xl text-black condensed">YARDAGES</h3>
                  <div class="flex flex-col h-[calc(100%-1rem)] p-4 rounded-lg bg-BrandLightGray">
                      <div class="flex flex-col h-full bg-white rounded-lg">
                          <div class="flex items-center justify-between py-4 mx-4 text-black condensed">
                              <span>CLUB</span>
                              <span>YARDS</span>
                          </div>
                          <div class="flex items-center justify-center flex-1">
                              <p class="px-8 text-sm text-center text-BrandDarkGray">No yardages have been added. Click the button below to get started.</p>
                          </div>
                          <div class="px-4 pb-4">
                              <button 
                                class="w-full p-2 rounded text-BrandYellow bg-BrandForest hover:bg-green-700"
                          >
                                  ADD YARDAGES
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</Layout>
