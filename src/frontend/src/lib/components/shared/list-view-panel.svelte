<script lang="ts">
  import { type Snippet } from "svelte"; 
    interface Props {
        title: string;
        buttonTitle: string;
        buttonCallback: () => void;
        children: Snippet
    }

    let { title, buttonTitle, buttonCallback, children } : Props = $props();

</script>


<div class="rounded-lg p-4 max-h-[80vh] overflow-y-auto">
    <header class="bg-white">
        <div class="flex flex-col items-center justify-between py-4 md:flex-row">
            <h1 class="title">{title}</h1>
            <button onclick={buttonCallback} class="brand-button-yellow">{buttonTitle}</button>
        </div>
    </header>
    {@render children()}
</div>