<script lang="ts">

    interface Props {
        src: string;
        selected: boolean;
    }

    let { src, selected } : Props = $props();
    
</script>

<div class={`${selected ? 'profile-circle-selected' : 'profile-circle' } w-12 rounded-full`}>
    <img alt="Profile" {src} class="w-full rounded-full" /> 
</div>