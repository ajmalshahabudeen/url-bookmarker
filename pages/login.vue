<template>
  <div class="flex flex-col gap-5 items-center justify-center min-h-[90vh] mx-5">
    <div
      class="flex flex-col gap-5 border-b-8 border border-t-8 px-5 py-10 border-primary rounded-xl shadow-2xl"
    >
      <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
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
          Incorrect email or password
        </p>
        <UButton
          label="Login"
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
        label="Sign in with Google"
        @click="signIn('google', { callbackUrl: '/dashboard' })"
        size="xl"
        variant="outline"
      />
      <UButton label="Register" size="xl" variant="link" to="/register" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/dashboard" },
});
const { signIn } = useAuth();
const userEmail = ref("");
const userPassword = ref("");
const error = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  // console.log(userEmail.value, userPassword.value);
  const response = await signIn(
    "credentials",
    {
      email: userEmail.value,
      password: userPassword.value,
      redirect: false,
    },
    { callbackUrl: "/dashboard" }
  );
  // console.log(response);
  if (response?.error) {
    loading.value = false;
    error.value = true;
    const interval = setInterval(() => {
      error.value = false;
      clearInterval(interval);
    }, 3000);
  } else {
    loading.value = false;
    navigateTo("/dashboard");
  }
};
</script>

<style></style>
