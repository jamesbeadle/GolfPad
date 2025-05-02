<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { UpdateFirstName } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    
    let showModal = false;
    let isLoading = true;
    
    let firstName = '';
    let isFormValid = false;
    let errors = {
        firstName: ''
    };
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }
                firstName = user.firstName;
                isLoading = false;
            });
        } catch (err) {
            toasts.addToast({ type: 'error', message: 'Error fetching golfer first name.' })
        }
    });

    async function updateFirstName(){
        isLoading = true;
        try{
            let dto: UpdateFirstName = {
                firstName,
                principalId: $authStore.identity?.getPrincipal().toString()!
            };
            await userStore.updateFirstName(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error updating first name.' })
        } finally {
            isLoading = false;
            showModal = false;
        }
    }

    function validateFirstName(value: string) {
        if (value.length < 3) {
            return 'First name must be at least 3 characters long';
        }
        return '';
    }

    function handleInput() {
        errors.firstName = validateFirstName(firstName);
        isFormValid = !errors.firstName && firstName.length > 0;
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
            <label for="firstName" class="input-title">FIRST NAME</label>
            <input 
                id="firstName"
                placeholder="Enter your first name"
                type="text" 
                class="text-input" 
                bind:value={firstName}
                oninput={handleInput}
            />
            {#if errors.firstName}
                <p class="error-text">{errors.firstName}</p>
            {/if}
        </div>
        <div class="flex w-full flex-col">
            <button 
                onclick={closeModal}
                class="brand-cancel-button"
            >
                Cancel
            </button>
            <button 
                onclick={updateFirstName}
                disabled={!isFormValid}
                class:disabled={!isFormValid}
                class="{!isFormValid ? 'brand-button-disabled' : 'brand-button'}"
            >
                Update
            </button>
        </div>
    {/if}
</Modal>





