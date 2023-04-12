<template>
    <button class="block" @click="show = !show">Show/Hide weights and corrections</button>
    <p v-if="show">
        {{ (Press as any).press_data.weights }}
        {{ (Press as any).press_data.corrections }}
    </p>
    <StartPress v-if="!(Press as any).started" :id_press="useRoute().params.id"></StartPress>
    <button class="block my-4" @click="refresh()">Refresh</button>
</template>
<script setup lang="ts">
let show = ref(false)
const { data: Press, refresh } = await useAuthFetch('/api/admin/get-press', {
    params: {
        id: useRoute().params.id
    }
})
definePageMeta({
    middleware: "require-admin"
})

</script>