<script lang="ts">
    function predict(){
        
    }
</script>

<div class="flex flex-row">
    <div class="w-2/5">
        <p>Categories</p>
    </div>
    <div class="w-3/5">
        <CategoryIndicator {currentCategory} />
    </div>
</div>
<div class="flex flex-row">
    <HoleCalendarSelect {predictionNumber} {predictionTitle} {predict} />
</div>