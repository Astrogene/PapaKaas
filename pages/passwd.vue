<template>
    <div class="flex w-full h-full flex-column">
        <h1>
            {{ JSON.stringify(users, null, 2) }}
        </h1>
    </div>
</template>
<script setup lang="ts">
import { Users } from '~/models/database'
const users = await Users.findAll();
</script>