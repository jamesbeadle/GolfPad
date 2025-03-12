<script lang="ts">
    export let title: string;
    export let buttonTitle: string;
    export let buttonCallback: () => void;
</script>


<div class="rounded-lg p-4 max-h-[80vh] overflow-y-auto">
    <header class="bg-white">
        <div class="flex flex-col md:flex-row justify-between items-center py-4">
            <h1 class="title">{title}</h1>
            <button on:click={buttonCallback} class="brand-button">{buttonTitle}</button>
        </div>
    </header>
    <slot></slot>
</div>