<template>
    <h1 class="text-lg">Choose Cheese</h1>
    <form @submit.prevent="StartCheesePress">
        <div class="block mx-auto">
            <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
            v-model="CheeseForm.name" type="text" placeholder="Naam van de kaas" />
            <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
            v-model="CheeseForm.factor" required type="number" min="1" max="25" />
        </div>
        <div class="block mx-auto">
                <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
                v-model="CheeseForm.hours" required type="number" min="1" max="72" placeholder="Aantal UUR persen" />
        </div>
        <button type="submit" class="px-16 py-4 text-center transition duration-200 border-4 border-green-300 rounded-xl hover:bg-green-400 hover:scale-110">Create</button>
    </form>
</template>
<script setup lang="ts">
const props = defineProps(['id_press'])
interface CheeseForm {
    name: string;
    factor: number;
    hours: number;
    id: string;
}

let CheeseForm: CheeseForm = {
    name: 'Nieuwe Kaas',
    factor: 0,
    hours: 0,
    id: props.id_press
};
async function StartCheesePress() {
    if (process.server) {
        return;
    }
    await useAuthFetch('/api/admin/start-press', {
        params: CheeseForm
    })
}   
</script>