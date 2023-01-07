<template>
    <header class="flex flex-row items-center justify-between py-4 bg-green-300 header">
        <NuxtLink class="h-full" to="/">
            <img src="~/assets/images/logo.svg" class="self-start max-w-full max-h-full ml-4 cursor-pointer hover:scale-110" alt="PapaKaas" />
        </NuxtLink>
        <nav class="w-full h-full">
            <ul class="navbar-nav">
                <li class="px-4 py-2 ml-auto bg-green-400 hover:scale-110 hover:bg-green-500">
                    <NuxtLink  to="/current">Huidig</NuxtLink>
                </li>
                <li class="px-4 py-2 mx-4 bg-green-400 sm:mx-16 hover:scale-110 hover:bg-green-500">
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </li>
                <li class="px-4 py-2 mr-auto bg-green-400 hover:scale-110 hover:bg-green-500">
                    <NuxtLink  to="/about">Over</NuxtLink>
                </li>
                <li v-if="!authStore.isLoggedIn" class="px-4 py-2 mr-4 bg-green-400 hover:scale-110 hover:bg-green-500">
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
                <li v-else>
                    {{ authStore.user_name }}
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <slot>
        </slot>
    </main>
    <footer>

    </footer>
</template>
<style>
.navbar-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.navbar-nav li {
    display: inline;
    list-style: none;
    border-radius: 0.25rem;
}
.header{
    height: 10vh;
}
</style>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
const authStore = useAuthStore();
</script>