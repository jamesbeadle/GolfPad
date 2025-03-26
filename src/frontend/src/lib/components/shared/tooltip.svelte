<script lang="ts">
    export let text: string;
    export let href: string;
    let isHovered = false;
    
</script>

<div class="relative inline-block cursor-pointer" 
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    role="tooltip"
>
    <a href={href} target="_blank" rel="noopener noreferrer" class="block">
        <slot {isHovered} />
    </a>
    
    {#if isHovered}
        <div 
            class="absolute z-10 w-64 p-4 mb-2 -translate-x-1/2 bg-white rounded-lg shadow-lg cursor-default left-1/2 bottom-full"
            on:mouseenter={() => isHovered = true}
            on:mouseleave={() => isHovered = false}
            role="tooltip"
        >
            <div class="flex gap-4">
                <img 
                    class="w-16 h-16 rounded-full" 
                    src="/default-profile-picture.jpg" 
                    alt="profile" 
                />
                <div class="flex flex-col gap-1">
                    <p class="text-base text-left text-BrandGray">{text}</p>
                    <div class="flex flex-row gap-1">
                        <p class="text-2xl text-black condensed">Kai Thorne</p>
                        <p class="text-2xl condensed text-BrandGray">(11)</p>
                    </div>
                </div>
            </div>
            <div class="w-full mt-2">
                <a 
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full py-2 text-sm text-center text-black rounded cursor-pointer bg-BrandMediumGray hover:bg-BrandMediumGray/150"
                >
                    View Player
                </a>
            </div>
        </div>
    {/if}
</div>

<style>
  div[class*="absolute"]::before {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
      border-width: 0 8px 8px 8px;
      border-style: solid;
      border-color: transparent transparent white transparent;
  }
</style>