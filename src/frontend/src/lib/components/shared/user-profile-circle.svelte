<script lang="ts">
    export let src: string;
    export let selected: boolean;
</script>

<div class={`${selected ? 'profile-circle-selected' : 'profile-circle' } w-12 rounded-full`}>
    <img alt="Profile" {src} class="w-full rounded-full" /> 
</div>