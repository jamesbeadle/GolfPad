<script lang="ts">
    export let title: string;
    export let subTitle: string;
</script>


<div class="min-h-screen p-4 overflow-y-auto bg-white rounded-lg scrollbar-visible">
    <header class="bg-white">
        <div class="flex flex-row items-center justify-between py-3 md:items-baseline">
            <h1 class="title">{title}</h1>
            <h2 class="text-sm text-BrandDarkGray">{subTitle}</h2>
        </div>
    </header>
    <slot></slot>
</div>