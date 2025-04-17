<script lang="ts">
  import { authStore } from "$lib/stores/auth-store";
  import { toasts } from "$lib/stores/toasts-store";
  import { userStore } from "$lib/stores/user-store";
  import { isUsernameValid } from "$lib/utils/helpers";
  import { onMount } from "svelte";
  //import type{ CreateProfile } from "../../../../../declarations/backend/backend.did";

  import TermsAndConditions from "$lib/components/shared/terms.svelte";
  import BrandPanel from "../shared/brand-panel.svelte";
  import LocalSpinner from "../shared/local-spinner.svelte";

  type CreateProfile = {
        username: string;
        profilePicture: Blob | null;
  };

  let isLoading = $state(true);
  let isCheckingUsername = $state(false);
  let usernameAvailable = $state(false);
  let usernameError = $state("");
  let showTerms = $state(false);
  
  let profileSrc = $state('/profile_placeholder.png');
  let file: File | null = null;
  let fileInput = $state<HTMLInputElement | null>(null);

  let username = $state("");
  let displayName = $state("");
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

      let dto: CreateProfile = {
        username,
        profilePicture: file
      };
      
      await userStore.createUser(dto);
      toasts.addToast({type: 'success', message: 'Profile created.'})
    } catch {
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
      }
      const available = await userStore.isUsernameAvailable({ principalId: $authStore.identity?.getPrincipal().toString() ?? "", username });
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

  <BrandPanel title="ICGC Membership" subTitle="Join the Internet Computer Golf Club">
    {#if isLoading}
      <LocalSpinner />
    {:else}

    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col w-full space-y-2 md:w-1/3">
        <p class="form-title">Profile Picture</p>
        <p class="form-hint">Max size 1mb</p>
        
        <img 
          src={profileSrc} 
          alt="Profile" 
          class="object-cover w-full h-48 rounded-lg profile-picture"
        />
        <button 
          class="brand-button"
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
      <div class="flex flex-col w-full md:w-1/3">
        <div class="flex flex-col w-full space-y-1 md:w-1/2">
          <p class="form-title">Username</p>
          <p class="form-hint">5-20 characters, letters & numbers only. <span class="text-xs">(Required)</span></p>
          <input
            type="text"
            bind:value={username}
            oninput={handleUsernameInput}
            class="brand-input"
            placeholder="Enter username"
          />
          {#if username.length > 0}
            <div class="text-sm">
              {#if isCheckingUsername}
                <p class="mt-2 text-BrandGrayShade2">Checking username availability...</p>
              {:else if usernameError}
                <p class="mt-2 text-BrandRed">{usernameError}</p>
              {:else if usernameAvailable}
                <p class="mt-2 text-BrandSuccess">Username is available!</p>
              {/if}
            </div>
          {/if}
        </div>
        <div class="flex flex-col w-full space-y-1 md:w-1/2">
          <p class="form-title">Display Name</p>
          <p class="form-hint">5-20 characters, letters & numbers only.</p>
          <input
            type="text"
            bind:value={displayName}
            placeholder="Enter display name"
            class="brand-input"
          />
        </div>


        <div class="flex items-center">
          <input type="checkbox" bind:checked={agreedToTerms} class="w-4 h-4 text-indigo-600 border-gray-300 rounded" />
          <label class="block ml-2 text-sm text-white">
            I agree to the <button type="button" onclick={toggleTerms} class="text-indigo-600 hover:text-indigo-500">terms and conditions</button>
          </label>
        </div>
        {#if showTerms}
          <div class="mt-4">
            <TermsAndConditions />
          </div>
        {/if}
      </div>
    </div>


    <button onclick={createProfile} disabled={!agreedToTerms} class="brand-button">
      Create Profile
    </button>
    {/if}

  </BrandPanel>