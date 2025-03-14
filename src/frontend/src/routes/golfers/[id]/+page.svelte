<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../Layout.svelte";
    import { page } from "$app/state";
    import { golferStore } from "$lib/stores/golfer-store";
    import type { GetGolfer, Golfer } from "../../../../../declarations/backend/backend.did";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { getImageURL } from "$lib/utils/helpers";

    let isLoading = true;
    let principalId: string;
    let golfer: Golfer | null = null;

    onMount(async () => {
        principalId = page.params.id;
        let dto: GetGolfer = { principalId };
        golfer = await golferStore.getGolfer(dto);
        isLoading = false;
    });

</script>

<Layout>
    {#if isLoading}
        <LocalSpinner />
    {:else}
        <div class="flex flex-row">
            <div class="w-1/2">
                <img class="w-full" src={getImageURL(golfer?.golferPicture)} alt='profile' />
            </div>
            <div class="w-1/2 flex flex-col">
                <p>USERNAME</p>
                <p>{golfer?.username}</p>
                <p>NAME</p>
                <p>{golfer?.firstName} {golfer?.lastName}</p>
                <p>HANDICAP</p>
                <p>{golfer?.handicap}</p>
                <div class="w-full">
                    <a class="w-full flex flex-row" href={`/golf-courses/${golfer?.homeCourseId}`}>
                    <div class="w-1/5">
                        <img class="w-full" src={getImageURL(golfer?.homeCourseImage)} alt='home-course' />
                    </div>
                    <div class="w-4/5 flex flex-col">
                        <p>HOME COURSE</p>
                        <p>{golfer?.homeCourse}</p>
                    </div>
                </a>
                </div>
            </div>
        </div>
    {/if}
</Layout>