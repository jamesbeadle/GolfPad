<script lang="ts">
  import { type Snippet } from "svelte"; 

    interface Props {
        title: string;
        subTitle: string;
        children: Snippet;
    }
    
    let { title, subTitle, children } : Props = $props();
    
</script>


<div class="p-4 overflow-y-auto rounded-lg bg-BrandLightGray">
    <header class="max-h-[80vh]">
        <div class="flex flex-col items-center py-3 md:flex-row md:items-baseline md:justify-between">
            <h1 class="title">{title}</h1>
            <h2 class="text-sm text-BrandDarkGray">{subTitle}</h2>
        </div>
    </header>
    {@render children()}
</div>