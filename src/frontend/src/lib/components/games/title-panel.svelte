<script lang="ts">
    import type { GameType } from '../../types.ts';
    import { onMount } from 'svelte';

    export let gameType: string;
    export let teeOffTime: bigint;
    export let courseId: bigint;

    onMount(async () => {
        //TODO: get course name from courseId
    })
</script>

<div class="flex flex-col items-start justify-center w-full ml-8 mt-2.5">
    <span class="mb-0 text-sm font-medium text-gray-500">GAMETYPE</span>
    <h1 class="font-black leading-none text-7xl font-condensed">
        {gameType}
    </h1>
    <div class="flex flex-col mt-2.5">
        <span class="mb-0 text-sm font-medium text-gray-500 mt-2.5">DATE</span>
        <h3 class="mb-4 text-4xl font-bold text-center font-condensed">{teeOffTime}</h3>
    </div>
    <div class="flex items-center justify-start mt-2.5">
        <img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"/>
        <div class="flex flex-col">
            <span class="mb-0 text-sm font-medium text-gray-500">COURSE</span>
            <div>
                <p class="text-3xl font-bold text-center font-condensed">{courseId}</p>
            </div>
        </div>
    </div>
</div>