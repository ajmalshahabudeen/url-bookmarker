<script setup lang="ts">
const { signOut, status, data } = useAuth();
const show = ref(false);
// const userData = computed(() => data.value?.user);
const userEmail = ref("");

const items:any = [
  [
    {
      label: userEmail || "User",
      slot: "account",
      disabled: true,
      class: "no-scrollbar w-full overflow-x-auto",
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/settings",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
      click: () => {
        navigateTo("https://github.com/ajmalshahabudeen/url-bookmarker", {
          external: true,
          open: { target: "_blank" },
        });
      }
    },
    {
      label: "Auther",
      icon: "i-heroicons-megaphone",
      click: () =>
        navigateTo("https://ajmalshahabudeen.vercel.app", {
          external: true,
          open: { target: "_blank" },
        }),
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
      to: "/status",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => signOut(),
    },
  ],
];

watch(status, () => {
  if (status.value === "unauthenticated") {
    show.value = false;
  } else {
    show.value = true;
    userEmail.value = data.value?.user?.email as string
  }
});

onMounted(() => {
  if (status.value === "unauthenticated") {
    show.value = false;
  } else {
    show.value = true;
    userEmail.value = data.value?.user?.email as string
  }
});
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
    v-if="show"
  >
    <Icon name="fluent:person-circle-24-regular" size="1.8rem" />
    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>