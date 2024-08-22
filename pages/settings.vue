<template>
  <div
    class="flex flex-col gap-5 items-start justify-start p-5 md:px-24 min-h-[90vh]"
  >
    <h1 class="text-2xl font-light pl-5">Settings</h1>
    <UDivider />
    <UButton label="Password Options" size="xl" variant="outline" @click="CheckPass()" :loading="loading" />
    <UButton label="Set Password" size="xl" variant="soft" v-if="!passExists" @click="addPassword = true" />
    <UButton label="Reset Password" size="xl" variant="soft" v-if="resetPass" @click="resetPassword = true" />
    <div class="flex flex-col gap-5" v-if="addPassword">
      <UInput label="Password" size="xl" type="password" v-model="userPassword" required />
      <UButton label="Add Password" size="xl" variant="soft" @click="SetPass()" :loading="setPassLoading" />
    </div>
    <div class="flex flex-col gap-5" v-if="resetPassword">
      <UInput label="Password" size="xl" type="password" v-model="userPassword" required />
      <UButton label="Reset Password" size="xl" variant="soft" @click="SetPass()" :loading="setPassLoading" />
    </div>
    <UButton
      @click="signOut()"
      label="Sign Out"
      size="xl"
      variant="ghost"
      color="red"
    />
    <!-- {{ passExists }} -->
  </div>
</template>

<script lang="ts" setup>
const { signOut } = useAuth();
const passExists = ref(true);
const resetPass = ref(false);
const userPassword = ref("");
const addPassword = ref(false);
const resetPassword = ref(false);
const loading = ref(false);
const setPassLoading = ref(false);
const CheckPass = async () => {
  loading.value = true;
  const PassExists = await checkPassword();
  if (PassExists) {
    loading.value = false;
    passExists.value = true;
    resetPass.value = true;
  } else {
    loading.value = false;
    passExists.value = false;
  }
};

const SetPass = async () => {
  setPassLoading.value = true;
  if (userPassword.value === "") {
    return;
  }
  const response = await setPassword(userPassword.value);
  if (response) {
    setPassLoading.value = false;
    passExists.value = true;
    resetPass.value = false;
    addPassword.value = false;
    resetPassword.value = false;
  }
}
</script>

<style></style>
