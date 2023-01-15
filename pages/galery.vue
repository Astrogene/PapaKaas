<template>
    <div class="mx-4 mt-8 mb-8">
        <ul class="grid grid-rows-5 gap-8 list-none md:grid-cols-3 grid-flow-cols-dense ">
            <li v-for="document in data" class="grid h-64 overflow-hidden border-4 bg-slate-500 article">
                <div class="flex flex-col max-h-full thumb">
                    <h1 class="text-2xl text-center">{{ document.title }}</h1>
                    <ArticleImage class="object-contain w-full h-full" :src="document.title.toLowerCase() + '/' + document.thumbnail" alt=" "></ArticleImage>
                </div>
                <p class="text-center p-auto desc">
                    {{ document.description }}
                </p>
            </li>
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
</style>