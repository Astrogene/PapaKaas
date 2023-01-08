<template>
    <div class="flex w-full h-full flex-column">
        <h1>
            {{ users }}
        </h1>
    </div>
</template>
<script setup lang="ts">
const users = useAuthFetch('/api/user/get-all-users')
definePageMeta({
    middleware: 'require-admin'
})
</script>