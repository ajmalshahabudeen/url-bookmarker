<template>
  <div>
    <UContainer
      class="inline-flex gap-4 max-w-full overflow-x-auto no-scrollbar my-5"
    >
      <UButton
        variant="outline"
        icon="material-symbols:filter-alt-outline-sharp"
        label="Filter"
      />
      <UButton
        variant="outline"
        icon="material-symbols:refresh-rounded"
        label="Refresh"
      />
      <UButton
        variant="outline"
        icon="mdi:plus-circle-outline"
        label="Add Bookmark"
      />
      <UButton
        variant="outline"
        icon="mdi:plus-circle-outline"
        label="Add Category"
      />
    </UContainer>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
