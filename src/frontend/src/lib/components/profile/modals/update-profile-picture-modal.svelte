<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { getImageURL } from "$lib/utils/helpers";
    import Modal from "$lib/components/shared/global/modal.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import PictureIcon from "$lib/icons/picture-icon.svelte";
    import type { UpdateProfilePicture } from "../../../../../../declarations/backend/backend.did";

    let isLoading = false;
    let hasFile = false;
    let selectedFile: File | null = null;
    let previewUrl: string | null = null;
    let fileInputRef: HTMLInputElement;
    let currentProfilePic: string | null = null;

    onMount(async () => {
        try {
            isLoading = true;
            await userStore.sync();
            const user = $userStore;
            if(user){
                currentProfilePic = getImageURL(user.golferPicture);
            }
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error loading profile data" });
        } finally {
            isLoading = false;
        }
    });

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            hasFile = true;
            selectedFile = input.files[0];
            previewUrl = URL.createObjectURL(input.files[0]);
        }
    }

    async function handleSave() {
        if (!selectedFile) return;

        isLoading = true;
        try {
            const principalId = $authStore.identity?.getPrincipal().toString() ?? "";
            await userStore.updateProfilePicture(principalId, selectedFile);
            toasts.addToast({ type: "success", message: "Profile picture updated successfully" });
            currentProfilePic = previewUrl;
            closeModal();
        } catch (err) {
            toasts.addToast({ type: "error", message: "Error updating profile picture" });
        } finally {
            isLoading = false;
        }
    }

    function triggerFileInput() {
        fileInputRef?.click();
    }

    function closeModal() {
        showModal = false;
        hasFile = false;
        selectedFile = null;
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
    }
</script>

<Modal {showModal} onClose={closeModal}>
    {#if isLoading}
        <div class="flex justify-center items-center h-64">
            <LocalSpinner />
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            <div class="flex flex-col">
                <label for='profile-picture' class="input-title">UPDATE PROFILE PICTURE</label>
                <div class="flex flex-col items-center gap-4">
                    {#if previewUrl}
                        <img
                            src={previewUrl}
                            alt="Preview"
                            class="w-24 h-24 object-cover rounded"
                        />
                    {:else if currentProfilePic}
                        <img
                            src={currentProfilePic}
                            alt="Current profile"
                            class="w-24 h-24 object-cover rounded"
                        />
                    {:else}
                        <div class="flex items-center justify-center w-24 h-24 rounded bg-BrandLightGray">
                            <PictureIcon className="w-12 h-12 fill-BrandDarkGray" />
                        </div>
                    {/if}
                    
                    <button
                        class="brand-button"
                        onclick={triggerFileInput}
                    >
                        {previewUrl ? "Change Image" : "Select Image"}
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        bind:this={fileInputRef}
                        onchange={handleFileChange}
                    />
                </div>
            </div>

            <div class="flex w-full justify-end gap-4">
                <button class="brand-cancel-button" onclick={closeModal}>
                    Cancel
                </button>
                <button
                    class="brand-button"
                    disabled={!hasFile}
                    onclick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    {/if}
</Modal>