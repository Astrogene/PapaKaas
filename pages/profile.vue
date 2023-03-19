<template>
    <h1 class="py-4 text-5xl text-center">Hi! {{ user.name }}</h1>
    <p class="text-xl text-center">Role: {{ user.role }}</p>
</template>
<script setup lang="ts">
const { user }= useAuth()
if (!user.loggedIn) navigateTo('/auth/login')
</script>