<script lang="ts">
    interface Props {
        coursePar: number;
        totalYardage: number;
    }

    let { coursePar = $bindable(0), totalYardage = $bindable(0) }: Props = $props();
</script>

<div class="p-4 rounded-md bg-gray-50">
    <h3 class="text-lg font-semibold text-gray-900">Course Summary</h3>
    <dl class="mt-2 space-y-2">
        <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Total Par</dt>
            <dd class="text-sm font-medium">{coursePar}</dd>
        </div>
        <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Total Yardage</dt>
            <dd class="text-sm font-medium">{totalYardage} yards</dd>
        </div>
        <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Number of Holes</dt>
            <dd class="text-sm font-medium">18</dd>
        </div>
    </dl>
</div>