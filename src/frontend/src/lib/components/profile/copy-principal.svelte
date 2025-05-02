<script lang="ts">
    import CopyIcon from "$lib/icons/copy-icon.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { toasts } from "$lib/stores/toasts-store";

    async function copyTextAndShowToast(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            toasts.addToast({type: 'success', message: 'Copied to clipboard', duration: 5000});
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }
</script>

<div class="flex items-center justify-between px-4 py-2 border rounded-lg">
    <p class="font-mono text-sm truncate text-BrandDarkGray">
        {$authStore.identity?.getPrincipal().toString() ?? "Not available"}
    </p>
    <button 
        onclick={() => { copyTextAndShowToast($authStore.identity?.getPrincipal().toString() ?? "") }}
        class="p-2 ml-2 text-black transition-colors duration-200 rounded-lg hover:bg-BrandLightGray"
    >
        <CopyIcon className="w-5 h-5" fill='#FFFFFF' />
    </button>
</div>