<script lang="ts">
    import Layout from "../Layout.svelte";
    import LocalSpinner from "$lib/components/shared/local-spinner.svelte";
    import { writable } from "svelte/store";
    import ProfileSocial from "$lib/components/profile/profile-social.svelte";
    import BrandTabContainer from "$lib/components/shared/brand-tab-container.svelte";
    import ProfileDetails from "$lib/components/profile/profile-details.svelte";

    let isLoading = writable(true);

    let activeTab: string = 'DETAILS';
    let tabs: string[] = ['DETAILS', 'SOCIAL'];
</script>

<Layout>
    {#if $isLoading}
        <LocalSpinner />
    {:else}
        <BrandTabContainer title='PROFILE' {activeTab} {tabs}>
            {#if activeTab === 'DETAILS'}
                <ProfileDetails />
            {/if}
            {#if activeTab === 'SOCIAL'}
                <ProfileSocial />
            {/if}
        </BrandTabContainer>
    {/if}
</Layout>