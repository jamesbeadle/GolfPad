<script lang="ts">
    import TermsAndConditions from "$lib/components/shared/terms.svelte";

    let agreedToTerms = false;
    let showTerms = false;
    let username = '';
    let handicap: number | undefined = undefined;
  
    function toggleTerms() {
      showTerms = !showTerms;
    }

    function createProfile(){
      //TODO
    }
  </script>
  
  <div class="p-4 bg-BrandDarkGreen m-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold my-4">Create Your Profile</h2>
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
        <label class="ml-2 block text-sm text-gray-900">
          I agree to the <button type="button" on:click={toggleTerms} class="text-indigo-600 hover:text-indigo-500">terms and conditions</button>
        </label>
      </div>
      {#if showTerms}
        <div class="mt-4">
          <TermsAndConditions />
        </div>
      {/if}
      <button on:click={createProfile} disabled={!agreedToTerms} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
        Create Profile
      </button>
    </div>
  </div>