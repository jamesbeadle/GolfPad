<script lang="ts">
    export let title: string;
    export let subTitle: string;
</script>


<div class="rounded-lg p-4 overflow-y-auto bg-BrandGray">
    <header class="bg-white max-h-[80vh]">
        <div class="flex flex-col md:flex-row justify-between items-center py-4">
            <h1 class="title">{title}</h1>
            <h2 class="text-BrandDarkGray text-sm md:text-base">{subTitle}</h2>
        </div>
    </header>
    <slot></slot>
</div>