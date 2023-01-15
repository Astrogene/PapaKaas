<template>
    <div>
        <img :src="imgSrc()" :alt="alt || 'failed to load image'" class="article-image" />
    </div>
</template>
<script lang="ts">

export default {
    props:{
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
        }
    },
    methods: {
        imgSrc() {
            return `/posts/${this.src}`
        }
    }
}
</script>
