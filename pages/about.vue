<template>
    <ContentDoc v-slot="{ doc }">
        <ContentRenderer class="mx-8 my-16 doc lg:mx-64 md:mx-32 sm:mx-16" :value="doc" />
    </ContentDoc>
</template>