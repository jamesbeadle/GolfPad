<script lang="ts">
    interface Props {
        title: string;
        buttonTitle: string;
        buttonCallback: () => void;
    }

    let { title, buttonTitle, buttonCallback } : Props = $props();

</script>


<div class="rounded-lg p-4 max-h-[80vh] overflow-y-auto">
    <header class="bg-white">
        <div class="flex flex-col items-center justify-between py-4 md:flex-row">
            <h1 class="title">{title}</h1>
            <button on:click={buttonCallback} class="brand-button-yellow">{buttonTitle}</button>
        </div>
    </header>
    <slot></slot>
</div>