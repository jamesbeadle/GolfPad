<script lang="ts">
    export let title: string;
    export let subTitle: string;
</script>


<div class="rounded-lg p-4 max-h-[80vh] overflow-y-auto">
    <header class="bg-white">
        <div class="flex flex-col md:flex-row justify-between items-center py-4">
            <h1 class="title">{title}</h1>
            <h2 class="text-BrandDarkGray text-sm md:text-base">{subTitle}</h2>
        </div>
    </header>
    <slot></slot>
</div>