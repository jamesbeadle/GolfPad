<script lang="ts">

    import { onMount } from 'svelte';
    import { userStore } from "$lib/stores/user-store";
    import type { GetGolfCourse, GolfCourseId, Profile } from "../../../../../declarations/backend/backend.did";
    
    import UpdateUsernameModal from './modals/update-username-modal.svelte';
    import UpdateHandicapModal from './modals/update-handicap-modal.svelte';
    import UpdateFirstNameModal from './modals/update-first-name-modal.svelte';
    import UpdateLastNameModal from './modals/update-last-name-modal.svelte';
    import UpdateHomeCourseModal from './modals/update-home-course-modal.svelte';
    import EditIcon from "$lib/icons/edit-icon.svelte";
    import BrandPanel from '../shared/brand-panel.svelte';
    import LocalSpinner from '../shared/local-spinner.svelte';
    import { golfCourseStore } from '$lib/stores/golf-course-store';
    import { toasts } from '$lib/stores/toasts-store';

    let isLoading = true;
    let homeCourseLoading = true;
    let golfer: Profile;
    let homeCourseName = 'NOT SET';
    let showUpdateUsernameModal = false;
    let showUpdateHandicapModal = false;
    let showUpdateFirstNameModal = false;
    let showUpdateLastNameModal = false;
    let showUpdateHomeCourseModal = false;
    
    onMount(async () => {
        try {
            await userStore.sync();
            userStore.subscribe((user) => {
                if(!user){ return }
                golfer = user;
                let homeCourseId = golfer.homeCourseId[0];
                if(homeCourseId){
                    setHomeCourseName(homeCourseId);
                }
                isLoading = false;
            });
        } catch (err) {
            console.error('Creating Golfer Error:', err);
        }
    });

    async function setHomeCourseName(golfCourseId: GolfCourseId){
        try{
            let dto: GetGolfCourse = {
                golfCourseId
            };
            let golfCourse = await golfCourseStore.getGolfCourse(dto);
            if(golfCourse){
                homeCourseName = golfCourse.name;
            }
        } catch {
            toasts.addToast({ type:'error', message:'Error setting golf course name.'})
        } finally {
            homeCourseLoading = false;
        }

    }
</script>

{#if isLoading}
    <LocalSpinner />
{:else}
    <BrandPanel title="DETAILS" subTitle="TELL US ABOUT YOURSELF">
        <div class="relative w-full p-4">
            <div class="text-BrandGray text-sm">USERNAME</div>
            <div class="text-4xl condensed">{golfer.username}</div>
            <button on:click={() => showUpdateUsernameModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
        </div>
        <div class="relative w-full p-4">
            <div class="text-BrandGray text-sm">FIRST NAME</div>
            <div class="text-4xl condensed">{golfer.firstName}</div>
            <button on:click={() => showUpdateFirstNameModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
        </div>
        <div class="relative w-full p-4">
            <div class="text-BrandGray text-sm">LAST NAME</div>
            <div class="text-4xl condensed">{golfer.lastName}</div>
            <button on:click={() => showUpdateLastNameModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
        </div>
        <div class="relative w-full p-4">
            <div class="text-BrandGray text-sm">HANDICAP</div>
            <div class="text-4xl condensed">{golfer.handicap}</div>
            <button on:click={() => showUpdateHandicapModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
        </div>
        <div class="relative w-full p-4">
            <div class="text-BrandGray text-sm">HOME COURSE</div>
            <div class="text-4xl condensed">{homeCourseName}</div>
            <button on:click={() => showUpdateHomeCourseModal = true } class="absolute top-4 right-4">
                <EditIcon className="w-4" />
            </button>
        </div>
    </BrandPanel>

    {#if showUpdateUsernameModal}
        <UpdateUsernameModal />
    {/if}

    {#if showUpdateHandicapModal}
        <UpdateHandicapModal />
    {/if}

    {#if showUpdateFirstNameModal}
        <UpdateFirstNameModal />
    {/if}

    {#if showUpdateLastNameModal}
        <UpdateLastNameModal />
    {/if}

    {#if showUpdateHomeCourseModal}
        <UpdateHomeCourseModal />
    {/if}

{/if}