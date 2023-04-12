<template>
    <ul class="grid grid-rows-5 gap-8 list-none md:grid-cols-3 lg:grid-cols-4 grid-flow-cols-dense ">
        <li v-if="Presses != undefined" v-for="press in (Presses as any)">
            <NuxtLink :to="'/admin/press-'+ press.press_data.id">
                        <li class="grid overflow-hidden border-4 h-80 border-slate-800 bg-slate-600">
                            <div class="flex flex-col max-h-80">
                                <h1 class="text-2xl text-center">"Press {{ press.press_data.id }}"</h1>
                                <p class="text-center text-md">
                                    {{ press.press_data.weights[press.press_data.t] }} {{ press.press_data.corrections[press.press_data.t] }}
                                    {{ press.press_data.t }}
                                </p>
                            </div>
                        </li>
            </NuxtLink>
        </li>
    </ul>
    <button @click="refresh()">Refresh!</button>
</template>
<script setup lang="ts">
const { pending, data: Presses, refresh } = await useAuthFetch('/api/admin/press-list')
definePageMeta({
    middleware: "require-admin"
})

</script>