<template>
  <nuxt-img
    :src="imgSrc()"
    :alt="alt || 'failed to load image'"
    :onerror="alt ? alt : `this.style.display='none'`"
    class="article-image"
  />
</template>
<script lang="ts">
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
  },
  methods: {
    imgSrc() {
      return `/posts-data/${this.src}`;
    },
  },
};
</script>
