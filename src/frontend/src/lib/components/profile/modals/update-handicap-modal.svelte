<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import type { UpdateHandicap } from "../../../../../../declarations/backend/backend.did";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    
    let showModal = false;
    let isLoading = true;
    
    let handicap: string | undefined = undefined;
    let isFormValid = false;
    let errors = {
        handicap: ''
    };
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }

                let handicapResult = user.handicap[0];
                if (handicapResult !== undefined) {
                    handicap = (handicapResult / 10).toFixed(1);
                }

            });
        } catch (err) {
            toasts.addToast({ type: 'error', message: 'Error fetching golfer handicap.' })
        }
    });

    async function updateHandicap(){
        isLoading = true;
        try{
            let handicapForDTO: [] | [number] = [];

            if (handicap !== undefined && handicap.trim() !== "") {
                const parsedHandicap = parseFloat(handicap);
                if (!isNaN(parsedHandicap)) {
                    handicapForDTO = [Math.round(parsedHandicap * 10)];
                } else {
                    throw new Error("Invalid handicap value");
                }
            }
            
            let dto: UpdateHandicap = {
                handicap: handicapForDTO,
                principalId: $authStore.identity?.getPrincipal().toString()!
            };
            await userStore.updateHandicap(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error updating handicap.' })
        } finally {
            isLoading = false;
            showModal = false;
        }
    }

    function validateHandicap(value: string | undefined): string {
        if (!value || value.trim() === "") {
            return "";
        }

        const regex = /^-?\d+(\.\d)?$/;
        if (!regex.test(value)) {
            return "Handicap must be a number with exactly 1 decimal place (e.g., 5.4)";
        }

        const numValue = parseFloat(value);
        if (numValue < -54 || numValue > 54) {
            return "Handicap must be between -54.0 and 54.0";
        }

        return "";
    }

    function handleInput() {
        errors.handicap = validateHandicap(handicap);
        isFormValid = !errors.handicap;
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
            <label for="handicap" class="input-title">HANDICAP</label>
            <input 
                id="handicap"
                placeholder="Enter your handicap"
                type="text" 
                class="text-input" 
                bind:value={handicap}
                oninput={handleInput}
            />
            {#if errors.handicap}
                <p class="error-text">{errors.handicap}</p>
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
                onclick={updateHandicap}
                disabled={!isFormValid}
                class:disabled={!isFormValid}
                class="{!isFormValid ? 'brand-button-disabled' : 'brand-button'}"
            >
                Update
            </button>
        </div>
    {/if}
</Modal>





