<script setup lang="ts">
import { useAuthStore } from "../store/auth";


interface loginForm {
    username: string;
    password: string;
}

let loginForm: loginForm = {
    username: "",
    password: "",
};

/**
 * If success: redirect to home page
 * Else display alert error
 */
function login() {
    if (process.server){
        return
    }
    const authStore = useAuthStore();
    const router = useRouter();
    authStore
        .login(loginForm)
        .then((_response) => router.push("/"))
        .catch((error) => console.log("API error", error));
}
</script>

<template>
    <div class="flex w-full h-full flex-column">
        <form class="w-full h-full mx-auto my-4" @submit.prevent="login">
            <div class="my-4 username">
                <label>Username</label>
                <input v-model="loginForm.username" required type="username" />
            </div>
            <div class="my-4 password">
                <label>Password</label>
                <input v-model="loginForm.password" required type="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
