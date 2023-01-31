<template>
    <ContentDoc v-slot="{ doc }">
        <h1 class="mx-auto mt-8 text-6xl text-center">{{ doc.title }}</h1>
        <p class="mx-auto my-4 text-lg text-center">
            {{ doc.readingTime ? doc.readingTime.text : "error" }}
            |
            {{ doc.createdAt ? "Created - " + new Date(doc.createdAt).toLocaleDateString() : "error" }}
            |
            {{ doc.updatedAt ? "Updated - " + new Date(doc.updatedAt).toLocaleDateString() : "error" }}
        </p>
        
        <ContentRenderer class="sm:mx-10 md:mx-32 lg:mx-48 doc" :value="doc" />
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
* {
    scroll-behavior: smooth;
}
</style>