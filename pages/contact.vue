<template>
    <ContentDoc class="doc" v-slot="{ doc }">
        <ContentRenderer class="mx-8 my-16 doc lg:mx-64 md:mx-32 sm:mx-16" :value="doc" />
    </ContentDoc>
</template>
<style>
.doc h1 {
    margin-top: 4rem;
    font-size: 4em;
}
.doc h2 {
    margin-top: 2rem;
    font-size: 2em;
}
.doc h3 {
    margin-top: 1rem;
    font-size: 1em;
}
.doc {
    text-align: justify;
    margin-top: 2rem;
}
</style>