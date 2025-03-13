<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { UpdateLastName } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    
    let showModal = false;
    let isLoading = true;
    
    let lastName = '';
    let isFormValid = false;
    let errors = {
        lastName: ''
    };
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }
                lastName = user.lastName;
                isLoading = false;
            });
        } catch (err) {
            toasts.addToast({ type: 'error', message: 'Error fetching golfer last name.' })
        }
    });

    async function updateLastName(){
        isLoading = true;
        try{
            let dto: UpdateLastName = {
                lastName,
                principalId: $authStore.identity?.getPrincipal().toString()!
            };
            await userStore.updateLastName(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error updating last name.' })
        } finally {
            isLoading = false;
            showModal = false;
        }
    }

    function validateLastName(value: string) {
        if (value.length < 3) {
            return 'Last name must be at least 3 characters long';
        }
        return '';
    }

    function handleInput() {
        errors.lastName = validateLastName(lastName);
        isFormValid = !errors.lastName && lastName.length > 0;
    }

    function closeModal() {
        showModal = false;
    }


</script>

<Modal {showModal} onClose={() => { showModal = false; }}>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <div class="flex flex-col">
            <label for="lastName" class="input-title">LAST NAME</label>
            <input 
                id="lastName"
                placeholder="Enter your last name"
                type="text" 
                class="text-input" 
                bind:value={lastName}
                on:input={handleInput}
            />
            {#if errors.lastName}
                <p class="error-text">{errors.lastName}</p>
            {/if}
        </div>
        <div class="flex w-full flex-col">
            <button 
                on:click={closeModal}
                class="brand-cancel-button"
            >
                Cancel
            </button>
            <button 
                on:click={updateLastName}
                disabled={!isFormValid}
                class:disabled={!isFormValid}
                class="{!isFormValid ? 'brand-button-disabled' : 'brand-button'}"
            >
                Update
            </button>
        </div>
    {/if}
</Modal>





