<template>
    <div class="mx-8 mt-8 mb-8">
        <ul class="grid grid-rows-5 gap-8 list-none md:grid-cols-3 lg:grid-cols-4 grid-flow-cols-dense ">
            <div v-for="document in data">
                <NuxtLink :to="'/posts/' + document.title.toLowerCase().replaceAll(' ', '-') + '/' + document.title.toLowerCase().replaceAll(' ', '-')">
                    <li class="grid overflow-hidden border-4 h-80 border-slate-800 bg-slate-600 article">
                        <div class="flex flex-col max-h-80 thumb">
                            <h1 class="text-2xl text-center">{{ document.title }}</h1>
                            <p class="text-center text-md">
                            {{ document.readingTime ? document.readingTime.text : "error" }}
                            <p class="text-center text-md">
                              {{ document.createdAt ? "Created " + new Date(document.createdAt).toLocaleDateString() : "error" }}
                              |
                              {{ document.updatedAt ? "Updated " + new Date(document.updatedAt).toLocaleDateString() : "error" }}
                            </p>
                          </p>
                            <ArticleImage class="object-contain w-full h-full"
                                :src="document.title.toLowerCase().replaceAll(' ', '-') + '/'  + document.thumbnail"></ArticleImage>
                        </div>
                        <div class="flex items-center justify-center desc">
                            <p class="px-8 align-middle">
                                <ContentRenderer :excerpt=true :value="document" />
                            </p>
                        </div>
                    </li>
                </NuxtLink>
            </div>
        </ul>
    </div>
</template>
<script setup>
const { data } = await useAsyncData(
  async () => await queryContent('/posts').find()
);
</script>
<style>
.article .desc {
  grid-column: 1;
  grid-row: 1;
  transform: translate(100%, 0);
  transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
}
.article .thumb {
  grid-column: 1;
  grid-row: 1;
  transform: translate(0);
  transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
}

.article:hover .thumb {
  transform: translate(-100%, 0);
}
.article:hover .desc {
  transform: translate(0);
}
.article:hover {
  transform: scale(1.1);
}
</style>
