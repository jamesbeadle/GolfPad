<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { UpdateUsername } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    
    let showModal = false;
    let isLoading = true;
    
    let username = '';
    let isFormValid = false;
    let errors = {
        username: ''
    };
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }
                username = user.username;
                isLoading = false;
            });
        } catch (err) {
            toasts.addToast({ type: 'error', message: 'Error fetching golfer username.' })
        }
    });

    async function updateUsername(){
        isLoading = true;
        try{
            let dto: UpdateUsername = {
                username,
                principalId: $authStore.identity?.getPrincipal().toString()!
            };
            await userStore.updateUsername(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error updating username.' })
        } finally {
            isLoading = false;
            showModal = false;
        }
    }

    function validateUsername(value: string) {
        if (!value) {
            return 'Username is required';
        }
        if (value.length < 5) {
            return 'Username must be at least 6 characters long';
        }
        return '';
    }

    function handleInput() {
        errors.username = validateUsername(username);
        isFormValid = !errors.username && username.length > 0;
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
            <label for="username" class="input-title">USERNAME</label>
            <input 
                id="username"
                placeholder="Enter your username"
                type="text" 
                class="text-input" 
                bind:value={username}
                on:input={handleInput}
            />
            {#if errors.username}
                <p class="error-text">{errors.username}</p>
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
                onclick={updateUsername}
                disabled={!isFormValid}
                class:disabled={!isFormValid}
                class="{!isFormValid ? 'brand-button-disabled' : 'brand-button'}"
            >
                Update
            </button>
        </div>
    {/if}
</Modal>





