<script setup lang="ts">
import { useAuthStore } from "../store/auth";


interface registerForm {
    username: string;
    password: string;
}

let registerForm: registerForm = {
    username: "",
    password: "",
};

/**
 * If success: redirect to home page
 * Else display alert error
 */
function register() {
    if (process.server) {
        return
    }
    const authStore = useAuthStore();
    const router = useRouter();
    authStore
        .register(registerForm)
        .then((_response) => router.push("/"))
        .catch((error) => console.log("API error", error));
    console.log("Registered")
}
</script>

<template>
    <div class="flex w-full h-full flex-column">
        <form class="w-full h-full mx-auto my-4" @submit.prevent="register">
            <div class="my-4 username">
                <label>Username</label>
                <input v-model="registerForm.username" required type="username" />
            </div>
            <div class="my-4 password">
                <label>Password</label>
                <input v-model="registerForm.password" required type="password" />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>
