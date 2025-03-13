<script lang="ts">
    import ProfileYardages from './profile-yardages.svelte';
    import ProfilePicture from './profile-picture.svelte';
    import ProfileDetail from './profile-detail.svelte';
</script>

<div class="w-full h-full px-2 pt-4">
    <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray">
        <div class="w-full mb-6 lg:w-1/3 lg:mb-0">
            <ProfilePicture />
        </div>
        <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0">
            <ProfileDetail />
        </div>
        <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0">
            <ProfileYardages />
        </div>
    </div>
</div>