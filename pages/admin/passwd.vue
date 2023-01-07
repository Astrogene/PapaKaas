<template>
    <div class="flex w-full h-full flex-column">
        <h1>
            {{ users }}
        </h1>
    </div>
</template>
<script setup lang="ts">
import { useAuthFetch } from '~~/composable/authfetch';
let users = ref();
const fetch = useAuthFetch("/api/user/get-all-users")
if (fetch?.data){
    users = fetch?.data
}
</script>