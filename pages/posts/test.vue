<template>
    <ContentDoc path="/posts/detest" v-slot="{ doc }">
        {{ doc.title }}
        <template name="#not-found">
            Error loading page (not found)
        </template>
    </ContentDoc>
</template>