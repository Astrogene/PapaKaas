<template>
    <header class="flex flex-row items-center justify-between py-4 bg-green-500 max-h-20 header">
            <nav class="hidden w-full h-full sm:block">
                <ul class="h-12 navbar-nav">
                    <li class="self-start h-12">
                        <NuxtLink to="/">
                            <img src="~/assets/images/logo.svg" class="h-full ml-4 cursor-pointer hover:scale-110" alt="PapaKaas" />
                        </NuxtLink>
                    </li>
                    <li class="px-4 py-2 ml-auto bg-green-600 hover:scale-110 hover:bg-green-700">
                        <NuxtLink to="/galery">Galerij</NuxtLink>
                    </li>
                    <li class="px-4 py-2 mx-4 bg-green-600 sm:mx-16 hover:scale-110 hover:bg-green-700">
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </li>
                    <li class="px-4 py-2 mr-auto bg-green-600 hover:scale-110 hover:bg-green-700">
                        <NuxtLink to="/about">Over</NuxtLink>
                    </li>
                    <li v-if="!user.loggedIn" class="px-4 py-2 mr-4 bg-green-600 hover:scale-110 hover:bg-green-700">
                        <NuxtLink to="/auth/login">Login</NuxtLink>
                    </li>
                    <li class="mr-4 text-green-900" v-else>
                        {{ user.name }}
                    </li>
                </ul>
            </nav>
            <nav class="block w-full h-full sm:hidden">
                <ul class="h-12 navbar-nav">
                    <li class="self-start h-12">
                        <NuxtLink to="/">
                            <img src="~/assets/images/logo.svg" class="h-full ml-4 cursor-pointer hover:scale-110" alt="PapaKaas" />
                        </NuxtLink>
                    </li>
                    <button class="block ml-auto mr-4 text-2xl sm:hidden" @click="show=!show">
                        |||
                    </button>
                </ul>
            </nav>
            <nav v-show="show" class="relative block sm:hidden">
                <div class="fixed top-0 left-0 z-40 flex flex-col items-center w-full h-full bg-green-600">
                    <button class="self-start py-4 ml-auto mr-4 text-2xl" @click="show=!show">
                        |||
                    </button>
                    <Transition name="fade">
                        <ul class="flex flex-col w-full text-2xl text-center top-16">
                            <NuxtLink class="px-4 py-8 mx-8 my-2 bg-green-600 border-y-2 hover:scale-110 hover:bg-green-700" @click="show = false" to="/galery">Galerij</NuxtLink>
                            <NuxtLink class="px-4 py-8 mx-8 my-2 bg-green-600 border-y-2 hover:scale-110 hover:bg-green-700" @click="show = false" to="/contact">Contact</NuxtLink>
                            <NuxtLink class="px-4 py-8 mx-8 my-2 bg-green-600 border-y-2 hover:scale-110 hover:bg-green-700" @click="show = false"
                                to="/about">Over</NuxtLink>
                            <NuxtLink  v-if="!user.loggedIn" class="px-4 py-8 mx-8 my-2 bg-green-600 border-y-2 hover:scale-110 hover:bg-green-700" @click="show = false"
                                        to="/auth/login">Login</NuxtLink>
                            <li class="my-2 text-green-900 " v-else>
                                {{ user.name }}
                            </li>
                        </ul>
                    </Transition>
                </div>
                
            </nav>
    </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~~/stores/auth';

const { user } = storeToRefs(useAuthStore())
let show = ref(false)
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>