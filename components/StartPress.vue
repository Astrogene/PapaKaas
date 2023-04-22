<template>
    <h1 class="text-3xl">Choose Cheese</h1>
    <form @submit.prevent="StartCheesePress">
        <h1 class="pb-6 text-lg">
              Name + Factor
        </h1>
        <div class="block mx-auto">
            <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
            v-model="CheeseForm.name" type="text" placeholder="Naam van de kaas" />
            <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
            v-model="CheeseForm.factor" required type="number" min="1" max="25" />
        </div>
        <div class="block mx-auto">
        <h1 class="pb-6 text-lg">
          Hours & minutes
        </h1>
                <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
                v-model="CheeseForm.hours" required type="number" min="0" max="72" placeholder="Aantal UUR persen" />
                <input class="p-2 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500" 
                    v-model="CheeseForm.minutes" required type="number" min="0" max="59" placeholder="Aantal MINUTEN persen" />
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
    minutes: number;
}

let CheeseForm: CheeseForm = {
    name: 'Nieuwe Kaas',
    factor: 0,
    hours: 0,
    id: props.id_press,
    minutes: 30,
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