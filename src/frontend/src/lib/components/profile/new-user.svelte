<script lang="ts">
  import TermsAndConditions from "$lib/components/shared/terms.svelte";
  import { authStore } from "$lib/stores/auth-store";
  import { membershipStore } from "$lib/stores/membership-store";
  import { toasts } from "$lib/stores/toasts-store";
  import { userStore } from "$lib/stores/user-store";
  import { isUsernameValid, sortByHighestNeuron } from "$lib/utils/helpers";
  import { onMount } from "svelte";
  import type { CreateUser, EligibleMembership, Neuron } from "../../../../../declarations/backend/backend.did";
  import AvailableMembership from "../membership/available-membership.svelte";
  import BrandPanel from "../shared/brand-panel.svelte";
  import LocalSpinner from "../shared/local-spinner.svelte";
  import CopyPrincipal from "./copy-principal.svelte";

  let isLoading = true;
  let isSubmitDisabled = true;
  let isCheckingUsername = false;
  let usernameAvailable = false;
  let usernameError = "";
  let loadingNeurons = false;
  let showTerms = false;
  
  let profileSrc = '/profile_placeholder.png';
  let file: File | null = null;
  let fileInput: HTMLInputElement;

  let username = "";
  let displayName = "";
  let handicap: number | undefined = undefined;
  let agreedToTerms = false;

  let usernameTimeout: NodeJS.Timeout;

  let snsComplete = process.env.SNS_GOVERNANCE_CANISTER_ID && process.env.SNS_GOVERNANCE_CANISTER_ID.length > 0;

  let neurons: Neuron[] = [];
  let maxStakedICFC = 0n;
  let userMembershipEligibility: EligibleMembership | null = null;
  
  $: isSubmitDisabled = !username || !usernameAvailable || !agreedToTerms || !loadingNeurons;

  onMount(async () => {
    try{
      await loadData();
    } catch {
      toasts.addToast({type: 'error', message: 'Failed to load data.'});
    } finally {
      isLoading = false;
    }
  });

  async function loadData(){
      try {
          await getNeurons();
      } catch (error) {
          console.error("No neurons found:", error);
      } finally {
          isLoading = false;
      }
  }

  function toggleTerms() {
    showTerms = !showTerms;
  }

  async function createProfile(){

    try {
      isLoading = true;
      let createHandicap : [number] | [] = [];
      if(handicap != undefined){
        createHandicap = [handicap]
      } else {
        createHandicap = []
      }

      let dto: CreateUser = {
        username,
        profilePictureExtension: [''],
        profilePicture: [],
        handicap: createHandicap
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

  async function refreshNeurons() {
    try{
      loadingNeurons = true;
      await loadData();
    } catch {
      toasts.addToast({ type: 'error', message: 'Failed to refresh neurons' })
    } finally {
      loadingNeurons = false;
    }
  }

  async function getNeurons() {
    console.log("Getting neurons for create user");
    let neuronsResult = await membershipStore.getUserNeurons();
    console.log("neuronsResult: ", neuronsResult);
    if (neuronsResult) {
        neurons = neuronsResult.userNeurons.sort(sortByHighestNeuron);
        console.log("Sorted neurons: ", neurons);
        userMembershipEligibility = neuronsResult.userMembershipEligibility;
        console.log("userMembershipEligibility: ", userMembershipEligibility);
        maxStakedICFC = neuronsResult.totalMaxStaked;
        console.log("maxStakedICFC: ", maxStakedICFC);
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
      fileInput.click();
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
      <div class="flex w-full md:w-1/3 flex-col space-y-2">
        <p class="form-title">Profile Picture</p>
        <p class="form-hint">Max size 1mb</p>
        
        <img 
          src={profileSrc} 
          alt="Profile" 
          class="object-cover w-full h-48 rounded-lg profile-picture"
        />
        <button 
          class="brand-button"
          on:click={clickFileInput}
        >
          Upload Photo
        </button>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          bind:this={fileInput}
          on:change={handleFileChange}
          class="hidden"
        />
      </div>
      <div class="flex w-full md:w-1/3 flex-col">
        <div class="flex flex-col w-full space-y-1 md:w-1/2">
          <p class="form-title">Username</p>
          <p class="form-hint">5-20 characters, letters & numbers only. <span class="text-xs">(Required)</span></p>
          <input
            type="text"
            bind:value={username}
            on:input={handleUsernameInput}
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


        <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label>
        <input 
          id="handicap"
          placeholder="Enter your handicap"
          type="number" 
          class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
          bind:value={handicap}
          min="0"
          max="54"
        />


        <div class="flex items-center">
          <input type="checkbox" bind:checked={agreedToTerms} class="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <label class="ml-2 block text-sm text-white">
            I agree to the <button type="button" on:click={toggleTerms} class="text-indigo-600 hover:text-indigo-500">terms and conditions</button>
          </label>
        </div>
        {#if showTerms}
          <div class="mt-4">
            <TermsAndConditions />
          </div>
        {/if}
      </div>
      <div class="flex w-full md:w-1/3">



        <div class="flex flex-col space-y-4">
          <p class="text-lg text-white cta-text">Neuron Based Membership</p>
          <p class="text-BrandGrayShade5">
            To join the ICFC you need to have a non-dissolving NNS neuron with at least 1,000 ICFC staked, max staked for 2 years. Add your ICFC Principal as a hotkey to any ICFC NNS neuron over 1,000 ICFC to continue:
          </p>
          <CopyPrincipal />
          {#if loadingNeurons}
            <LocalSpinner />
          {:else}
            {#if snsComplete}
              {#if neurons.length > 0}
                <div class="flex flex-col space-y-4">
    
                  <AvailableMembership {neurons} {refreshNeurons} availableMembership={userMembershipEligibility?.membershipType!} {maxStakedICFC} />
    
                  <div class="border-t horizontal-divider border-BrandGrayShade3"></div>
                  
    
                </div>
              {/if}
            {:else}
                <p>Enter your access code to join:</p>
                <input />
            {/if}
          {/if}

          <button 
            class="py-2 text-white transition rounded-lg brand-button bg-BrandBlue hover:bg-BrandInfo disabled:bg-BrandGrayShade3" 
            on:click={createProfile} 
            disabled={isSubmitDisabled}
          >
            JOIN ICGC
          </button>
          
          <div class="h-6"></div>
        </div>

      </div>
    </div>


    <button on:click={createProfile} disabled={!agreedToTerms} class="brand-button">
      Create Profile
    </button>
    {/if}

  </BrandPanel>