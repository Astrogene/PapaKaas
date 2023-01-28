<template>
    <div class="my-4">
        <hr class="my-4 border-slate-900" />
        <div class="flex flex-row items-center justify-around">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
        <hr class="my-4 border-slate-900" />
    </div>
</template>
<script setup lang="ts">
</script>