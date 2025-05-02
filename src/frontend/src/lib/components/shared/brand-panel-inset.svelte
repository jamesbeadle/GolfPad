<script lang="ts">

    interface Props {
        title: string;
        subTitle: string;
    }
    
    let { title, subTitle } : Props = $props();
    
</script>


<div class="p-4 overflow-y-auto rounded-lg bg-BrandLightGray">
    <header class="max-h-[80vh]">
        <div class="flex flex-col items-center py-3 md:flex-row md:items-baseline md:justify-between">
            <h1 class="title">{title}</h1>
            <h2 class="text-sm text-BrandDarkGray">{subTitle}</h2>
        </div>
    </header>
    <slot></slot>
</div>