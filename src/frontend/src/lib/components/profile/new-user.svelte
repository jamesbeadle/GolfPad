<script lang="ts">
  import { authStore } from "$lib/stores/auth-store";
  import { toasts } from "$lib/stores/toasts-store";
  import { userStore } from "$lib/stores/user-store";
  import { isUsernameValid, getFileExtensionFromFile } from "$lib/utils/helpers";
  import { onMount } from "svelte";
  import type { CreateProfile, IsUsernameValid } from "../../../../../declarations/backend/backend.did";

  import TermsAndConditions from "$lib/components/shared/terms.svelte";
  import BrandPanel from "../shared/brand-panel.svelte";
  import LocalSpinner from "../shared/local-spinner.svelte";

  let isLoading = $state(true);
  let isCheckingUsername = $state(false);
  let usernameAvailable = $state(false);
  let usernameError = $state("");
  let showTerms = $state(false);
  
  let profileSrc = $state('/default-profile-picture.jpg');
  let file: File | null = null;
  let fileInput = $state<HTMLInputElement | null>(null);

  let username = $state("");
  let agreedToTerms = $state(false);

  let usernameTimeout: NodeJS.Timeout;
  let isSubmitDisabled = $derived(!username || !usernameAvailable || !agreedToTerms);

  onMount(async () => {
    try{
    } catch {
      toasts.addToast({type: 'error', message: 'Failed to load data.'});
    } finally {
      isLoading = false;
    }
  });

  function toggleTerms() {
    showTerms = !showTerms;
  }

  async function createProfile(){

    try {
      isLoading = true;
      if(file){
        const extension = getFileExtensionFromFile(file);
        const reader = new FileReader();

        const profilePictureData = new Promise<Uint8Array>((resolve, reject) => {
          reader.onloadend = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            resolve(uint8Array);
          };
          reader!.onerror = reject;
          reader.readAsArrayBuffer(file!);
        });

        const profilePicture = await profilePictureData;
        const dto: CreateProfile = {
          username,
          profilePicture: [profilePicture]
        };
        await userStore.createUser(dto);
      } else {
        const dto: CreateProfile = {
          username,
          profilePicture: []
        };
        await userStore.createUser(dto);
      }
      await userStore.cacheProfile();
      toasts.addToast({type: 'success', message: 'Profile created.'})
    } catch (error) {
      console.error("Error creating profile:", error);
      toasts.addToast({type: 'error', message: 'Error creating profile.'})
    } finally {
      isLoading = false;
    }
  }

  function handleUsernameInput() {
    clearTimeout(usernameTimeout);
    usernameAvailable = false;
    if (username.length >= 5) {
      usernameTimeout = setTimeout(checkUsername, 500);
    }
  } 

  async function checkUsername() {
    isCheckingUsername = true;
    try {
      if(!isUsernameValid(username)){
        usernameError = "Username must be between 5 and 20 characters.";
        return;
      }
      let dto: IsUsernameValid = { username };
      //const available = await userStore.isUsernameValid(dto);
      const available = true;
      usernameAvailable = available;
      usernameError = available ? "" : "Username is already taken";
    } catch (error) {
      console.error("Error checking username:", error);
      usernameError = "Error checking username availability";
    } finally {
      isCheckingUsername = false;
    }
  } 

  function clickFileInput() {
      fileInput?.click();
  } 

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file = input.files[0];
      if (file.size > 1000 * 1024) {
        toasts.addToast({ 
          type: "error", 
          message: "Profile image too large. The maximum size is 1MB." 
        });
        file = null;
        profileSrc = '/profile_placeholder.png';
        return;
      }
      profileSrc = URL.createObjectURL(file);
    }
  }
</script>

<div class="min-h-screen bg-white">
  <BrandPanel title="Create Profile" subTitle="Join the Internet Computer Fantasy Golf">
    {#if isLoading}
      <LocalSpinner message="Creating profile" />
    {:else}
      <div class="mx-auto">
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div class="space-y-4">
            <div class="p-6 bg-white rounded-lg shadow-sm">
              <div class="flex items-start mb-2">
                <h3 class="text-2xl condensed text-BrandForest">Profile Picture <span class="relative text-xs align-top text-BrandDarkGray">(Optional)</span></h3>
              </div>
              <p class="mb-4 text-sm text-BrandDarkGray">Max size 1MB</p>
              
              <div class="relative w-full mb-4 overflow-hidden rounded-lg aspect-square bg-BrandLightGreen">
                <img 
                  src={profileSrc} 
                  alt="Profile" 
                  class="object-cover w-full h-full"
                />
              </div>
              
              <button 
                class="w-full py-3 text-center brand-button-yellow"
                onclick={clickFileInput}
              >
                Upload Photo
              </button>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                bind:this={fileInput}
                onchange={handleFileChange}
                class="hidden"
              />
            </div>
          </div>

          <div class="space-y-6">
            <div class="p-6 bg-white rounded-lg shadow-sm">
              <h3 class="mb-2 text-xl condensed text-BrandForest">Username <span class="text-red-500">*</span></h3>
              <p class="mb-4 text-sm text-BrandDarkGray">
                5-20 characters, letters & numbers only
              </p>
              
              <input
                type="text"
                bind:value={username}
                oninput={handleUsernameInput}
                class="brand-input"
                placeholder="Enter username"
              />
              
              {#if username.length > 0}
                <div class="mt-2">
                  {#if isCheckingUsername}
                    <p class="text-sm text-BrandDarkGray">Checking username availability...</p>
                  {:else if usernameError}
                    <p class="text-sm text-BrandError">{usernameError}</p>
                  {:else if usernameAvailable}
                    <p class="text-sm text-BrandSuccess">Username is available!</p>
                  {/if}
                </div>
              {/if}
            </div>

            <div class="p-6 bg-white rounded-lg shadow-sm">
              <div class="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  bind:checked={agreedToTerms} 
                  class="w-5 h-5 rounded border-BrandDivider text-BrandForest focus:ring-BrandForest"
                />
                <label class="ml-3 text-sm text-BrandTextBlack">
                  I agree to the 
                  <button 
                    type="button" 
                    onclick={toggleTerms} 
                    class="underline text-BrandForest hover:text-BrandGreen"
                  >
                    terms and conditions
                  </button>
                </label>
              </div>

              {#if showTerms}
                <div class="p-4 mt-4 rounded-lg bg-BrandLightGray">
                  <TermsAndConditions />
                </div>
              {/if}
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-6">
          <button 
            onclick={createProfile} 
            disabled={isSubmitDisabled} 
            class="brand-button-forest px-12 py-3 text-lg {isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            Create Profile
          </button>
        </div>
      </div>
    {/if}
  </BrandPanel>
</div>