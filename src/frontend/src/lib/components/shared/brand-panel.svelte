<script lang="ts">
    export let title: string;
    export let subTitle: string;
</script>


<div class="rounded-lg p-0 lg:p-4 max-h-[80vh] overflow-y-auto">
    <header class="bg-white">
        <div class="flex flex-row items-center justify-between py-3 md:items-baseline">
            <h1 class="title">{title}</h1>
            <h2 class="text-sm text-BrandDarkGray">{subTitle}</h2>
        </div>
    </header>
    <slot></slot>
</div>