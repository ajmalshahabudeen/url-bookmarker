<template>
    <div>
        <UCard
            class="border border-primary min-w-[15vw] max-h-[75vh] overflow-y-auto custom-scrollbar">
            <!-- <p v-for="path in Path.filePaths">
              {{ path.categoryName }}
            </p> -->

            <ULink
               to="/dashboard"
                class="flex flex-col gap-2">
                <p
                    class="flex items-center group hover:bg-primary hover:text-black px-3 rounded-3xl max-w-[15vw] overflow-x-auto custom-scrollbar">
                    Home
                    <UIcon
                        class="ml-auto hidden group-hover:block"
                        name="material-symbols:play-arrow-outline" />
                </p>
            </ULink>
            <ULink
                v-for="path in Path.filePaths"
                :to="`${cleanUrl(path.categoryName as string, path.categoryPath as string)}`"
                class="flex flex-col gap-2">
                <p
                    class="flex items-center group hover:bg-primary hover:text-black px-3 rounded-3xl max-w-[15vw] overflow-x-auto custom-scrollbar">
                    {{ path.categoryName }}
                    <UIcon
                        class="ml-auto hidden group-hover:block"
                        name="material-symbols:play-arrow-outline" />
                </p>
            </ULink>
        </UCard>
    </div>
    <!-- <pre>
      {{ Path.filePaths }}
    </pre> -->
</template>

<script lang="ts" setup>
const Path = useFilePathStore();

onMounted(() => {
    Path.getAllPaths();
});

const cleanUrl = (name: string, url: string) => {

  if (url.startsWith("dashboard")) {
    return url;
  } else {
    return url + "/" + name
    
  }

};
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.custom-scrollbar::-webkit-scrollbar {
    @media screen and (min-width: 768px) {
        background-color: transparent;
        border-radius: 10px;
    }
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #73de81;
    border-radius: 10px;
    border: 4px solid transparent;
    background-clip: content-box;
}
</style>
