<script setup lang="ts">
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
    const authStore = useAuth();
    const router = useRouter();
    authStore
        .register(registerForm)
        .then((_response: any) => router.push("/"))
        .catch((error: any) => console.log("API error", error));
    console.log("Registered")
}
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
        <h1 class="pb-6 text-4xl">
            Register
        </h1>
        <form class="flex flex-col items-center justify-center" @submit.prevent="register">
            <div class="my-4 username">
                <input v-model="registerForm.username" required type="text"
                    class="p-4 border-4 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500"
                    placeholder="username" />
            </div>
            <div class="my-4 password">
                <input v-model="registerForm.password" required type="password"
                    class="p-4 border-4 border-green-300 rounded-lg outline-none bg-slate-800 focus:border-green-500"
                    placeholder="password" />
            </div>
            <button type="submit"
                class="px-16 py-4 text-center transition duration-200 border-4 border-green-300 rounded-xl hover:bg-green-400 hover:scale-110">Register</button>
        </form>
        <p class="py-8">
            Already have an account?
            <NuxtLink class="link" to="/auth/login">Login</NuxtLink>
        </p>
    </div>
</template>
