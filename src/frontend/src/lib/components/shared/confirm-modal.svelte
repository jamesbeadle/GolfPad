<script lang="ts">
    export let message: string;
    export let onConfirm: () => void;
    export let onCancel: () => void;
</script>

<div class="flex flex-col">
    <p>{message}</p>
    <div class="flex-row flex">
        <button on:click={onCancel} class="brand-button-cancel w-1/2">Cancel</button>
        <button on:click={onConfirm} class="brand-button w-1/2">Confirm</button>
    </div>
</div>