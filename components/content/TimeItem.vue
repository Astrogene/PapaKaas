<template>
    <div class="p-4">
        <li class="grid overflow-hidden md:w-28 md:h-28 lg:w-32 lg:h-32 item">
            <span class="items-center justify-center hidden w-full h-full rounded-full lg:flex circle circle-lg bg-slate-500">
                {{ new Date(date).toLocaleDateString() }}
            </span>
            <div class="items-center justify-center hidden text-large lg:flex text">
                <slot />
            </div>

            <span @click="show" :id="id+'circle'" class="flex items-center justify-center w-full h-full p-2 rounded-full lg:hidden circle bg-slate-500">
                    {{ new Date(date).toLocaleDateString() }}
            </span>
            <p @click="show" :id="id+'text'" class='flex items-center justify-center lg:hidden text'>
                <slot />
            </p>
        </li>
    </div>
</template>
<script lang="ts">
import uniqueId from 'lodash.uniqueid'
export default {
    props: {
        date: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            showing: false,
            id: ''
        }
    },
    methods: {
        show() {
            if (this.showing && document.getElementById(this.id + 'text') && document.getElementById(this.id + 'circle')){
                const p: any = document.getElementById(this.id + 'text')
                p.style.transform = "translate(100%)"
                const span: any = document.getElementById(this.id + 'circle')
                span.style.transform = "translate(0)"
            }
            else if (!this.showing && document.getElementById(this.id + 'text') && document.getElementById(this.id + 'circle')) {
                const p: any = document.getElementById(this.id + 'text')
                p.style.transform = "translate(0)"
                const span: any = document.getElementById(this.id + 'circle')
                span.style.transform = "translate(-100%)"
            }
            this.showing = !this.showing
        }
    },
    mounted() {
        this.id = uniqueId()
    }
}
</script>
<style>
.item .text {
    grid-column: 1;
    grid-row: 1;
    transform: translate(100%, 0);
    transition: all 0.2s ease-in-out;
}

.item .circle {
    grid-column: 1;
    grid-row: 1;
    transform: translate(0);
    transition: all 0.2s ease-in-out;
}

.item:hover .circle-lg {
    transform: translate(-100%, 0);
}

.item:hover .text-large {
    transform: translate(0);
}

.item:hover {
    transform: scale(1.1);
}

</style>