<script lang="ts">
    import TermsAndConditions from "$lib/components/shared/terms.svelte";
    import { toasts } from "$lib/stores/toasts-store";
    import { userStore } from "$lib/stores/user-store";
    import type { CreateUser } from "../../../../../declarations/backend/backend.did";
    import LocalSpinner from "../shared/local-spinner.svelte";

    let agreedToTerms = false;
    let showTerms = false;
    let username = '';
    let handicap: number | undefined = undefined;
    let creatingProfile = false;
  
    function toggleTerms() {
      showTerms = !showTerms;
    }

    async function createProfile(){

      try {
        creatingProfile = true;
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
        creatingProfile = false;
      }
    }
  </script>
  
  <div class="p-4 bg-BrandDarkGreen m-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold my-4">Create Your Profile</h2>
    {#if creatingProfile}
      <LocalSpinner />
    {:else}
      <div class="space-y-4">

        <input 
          id="username"
          placeholder="Enter your username"
          type="text" 
          class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" 
          bind:value={username} 
        />
        
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
        <button on:click={createProfile} disabled={!agreedToTerms} class="brand-button">
          Create Profile
        </button>
      </div>
    {/if}
  </div>