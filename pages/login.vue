<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

interface loginForm {
  username: string;
  password: string;
}

let loginForm: loginForm = {
  username: '',
  password: '',
};

/**
 * If success: redirect to home page
 * Else display alert error
 */
function login() {
  if (process.server) {
    return;
  }
  const authStore = useAuthStore();
  const router = useRouter();
  authStore
    .login(loginForm)
    .then((_response) => {
      router.push('/');
    })
    .catch((error) => console.log('API error', error));
}
</script>

<template>
  <div class="w-full h-full">
    <form
      class="flex flex-col justify-center items-center my-4 h-min w-full"
      @submit.prevent="login"
    >
      <div class="my-4 username">
        <input
          v-model="loginForm.username"
          required
          type="username"
          class="border-b-4"
          placeholder="username"
        />
      </div>
      <div class="my-4 password">
        <input
          v-model="loginForm.password"
          required
          type="password"
          class="border-b-4"
          placeholder="password"
        />
      </div>
      <button type="submit" class="rounded-xl border-4 py-4 px-16">Login</button>
    </form>
  </div>
</template>
