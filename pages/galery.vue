<template>
    <div class="mx-4 mt-8 mb-8">
        <ul class="grid grid-rows-5 gap-8 list-none md:grid-cols-3 lg:grid-cols-4 grid-flow-cols-dense ">
            <div v-for="document in data">
                <NuxtLink :to="'/posts/' + document.title.toLowerCase().replaceAll(' ', '-') + '/' + document.title.toLowerCase().replaceAll(' ', '-')">
                    <li class="grid h-64 overflow-hidden border-4 bg-slate-500 article">
                        <div class="flex flex-col max-h-64 thumb">
                            <h1 class="text-2xl text-center">{{ document.title }}</h1>
                            <ArticleImage class="object-contain w-full h-full"
                                :src="document.title.toLowerCase().replaceAll(' ', '-') + '/'  + document.thumbnail" alt=" "></ArticleImage>
                        </div>
                        <div class="flex items-center justify-center desc">
                            <p class="px-8 align-middle">
                                {{ document.description }}
                            </p>
                        </div>
                    </li>
                </NuxtLink>
            </div>
        </ul>
    </div>
</template>
<script setup>
    const { data } = await useAsyncData(async () => await queryContent('/posts').find())
</script>
<style>
.article .desc {
    grid-column: 1;
    grid-row: 1;
    transform: translate(100%, 0);
    transition: all 0.500s cubic-bezier(.47, 1.64, .41, .8);;
}
.article .thumb {
    grid-column: 1;
    grid-row: 1;
    transform: translate(0);
    transition: all 0.500s cubic-bezier(.47, 1.64, .41, .8);;
}

.article:hover .thumb {
    transform: translate(-100%, 0);
}
.article:hover .desc{
    transform: translate(0);
}
.article:hover {
    transform: scale(1.1);
}
</style>