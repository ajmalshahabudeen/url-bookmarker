<template>
  <div>
    <p>Sign-In Options:</p>
    <UButton @click="signIn('google', { callbackUrl: '/dashboard' })"
      >Google</UButton
    >
    <UButton
      @click="
        signIn('credentials', demoCredentials, { callbackUrl: '/dashboard' })
      "
    >
      Login
    </UButton>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/dashboard" },
});
const { signIn } = useAuth();

/*
 * NOTE: Here we hard-coded username and password
 * On your own page this should probably be connected to two inputs
 */
const demoCredentials = { email: "test@gmail.com", password: "hunter2" };
</script>

<style></style>
