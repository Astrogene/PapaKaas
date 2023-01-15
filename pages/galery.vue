<template>
    <ul class="grid grid-flow-row-dense gap-4">
        <li v-for="document in data" class="border-4" >
            <ArticleImage :src="document.title + '/' + document.thumbnail" alt=" "></ArticleImage>
            <h1>{{ document.title }}</h1>
            {{ document.description }}
        </li>
    </ul>
</template>
<script setup>
    const { data } = await useAsyncData(async () => await queryContent('/posts').find())
</script>