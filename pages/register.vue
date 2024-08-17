<template>
  <div class="flex flex-col gap-5 items-center justify-center min-h-[90vh]">
    <div
      class="flex flex-col gap-5 border-b-8 border border-t-8 px-5 py-10 border-primary rounded-xl shadow-2xl"
    >
      <form class="flex flex-col gap-5" @submit.prevent="handleRegister">
        <div>
          <p class="text-xl font-medium">Full Name</p>
          <UInput
            padded
            color="primary"
            variant="none"
            size="xl"
            placeholder="John Doe"
            type="text"
            icon="ic:baseline-mail-outline"
            class="hover:border-primary border-b border-transparent transition-all duration-300 ease-in focus-within:border-primary"
            v-model="userName"
            required
          />
        </div>
        <div>
          <p class="text-xl font-medium">Email</p>
          <UInput
            padded
            color="primary"
            variant="none"
            size="xl"
            placeholder="useremail@mail.com"
            type="email"
            icon="ic:baseline-mail-outline"
            class="hover:border-primary border-b border-transparent transition-all duration-300 ease-in focus-within:border-primary"
            v-model="userEmail"
            required
          />
        </div>
        <div>
          <p class="text-xl font-medium">Password</p>
          <UInput
            padded
            color="primary"
            variant="none"
            placeholder="********"
            type="password"
            size="xl"
            icon="material-symbols:vpn-key-outline-rounded"
            class="hover:border-primary border-b border-transparent transition-all duration-300 ease-in focus-within:border-primary"
            v-model="userPassword"
            required
          />
        </div>
        <p
          v-if="error"
          class="text-red-500 text-sm animate__animated animate__shakeX px-5"
        >
          {{ errorMessage }}
        </p>
        <p
          v-if="success"
          class="text-green-500 text-sm px-5"
        >
          {{ successMessage }}
        </p>
        <UButton
          label="Register"
          size="xl"
          variant="outline"
          icon="ic:baseline-arrow-forward-ios"
          type="submit"
          :loading="loading"
          :disabled="loading"
        />
      </form>
      <UDivider label="OR" />
      <UButton
        icon="logos:google-icon"
        label="Sign up with Google"
        @click="signIn('google', { callbackUrl: '/dashboard' })"
        size="xl"
        variant="outline"
      />
      <UButton label="Login" size="xl" variant="link" to="/login" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/dashboard" },
});
type Res = {
  type: string;
  message: string;
}
const { signIn } = useAuth();
const userName = ref("");
const userEmail = ref("");
const userPassword = ref("");
const error = ref(false);
const errorMessage = ref("");
const success = ref(false);
const successMessage = ref("");
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  const response: Res = await $fetch("/api/newUser", {
    method: "POST",
    body: {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    },
  })
  if (response.type === "error") {
    error.value = true;
    errorMessage.value = response.message;
    loading.value = false;
    const interval = setInterval(() => {
      error.value = false;
      clearInterval(interval);
    }, 3000);
  } else {
    success.value = true;
    successMessage.value = response.message;
    loading.value = false;
    const interval = setInterval(() => {
      navigateTo("/login");
      clearInterval(interval);
    }, 3000);
  }
};
</script>

<style></style>
