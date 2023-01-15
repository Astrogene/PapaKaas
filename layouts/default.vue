<template>
    <div class="flex flex-col h-full">
        <header class="flex flex-row items-center justify-between py-4 bg-green-500 max-h-20 header">
            <nav class="w-full h-full">
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
                    <li v-else>
                        {{ user.name }}
                    </li>
                </ul>
            </nav>
        </header>
        <main class="main bg-slate-600" >
            <slot>
            </slot>
        </main>
        <footer class="footer">
            <p>
                The footer
            </p>
        </footer>   
    </div>
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
.header {
    flex: 0 1 auto;
}
.main {
    flex: 1 1 auto;
}
.footer {
    flex: 0 1 40px;
}
.main .link {
    color: rgb(0, 172, 0);
    text-decoration-line: none;
    transition: all 200ms ease-in-out;
}
.main .link:hover {
    text-decoration-line: underline;
    color: rgb(0, 97, 0);
}
</style>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~~/stores/auth';

const { user } = storeToRefs(useAuthStore())
</script>