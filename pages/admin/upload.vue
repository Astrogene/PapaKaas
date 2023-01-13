<template>
    <ul v-for="image in images">
        <img class="child-img" v-bind:src="image" />
    </ul>
    <input multiple outlined type="file" ref="file" accept="image/*" @change="previewFile" />
    <button class="border-4" @click="uploaded ? upload() : null" :disabled="uploaded">Upload</button>
</template>
<script>
export default {
    data: () => ({
        images: [],
        uploaded: false
    }),
    methods: {
        previewFile() {
            const images_d = this.$refs.file.files
            Array.from(images_d).forEach((item) => {
               this.images.push(URL.createObjectURL(item))
            })
            uploaded = true
        },
        async upload() {
            alert("uploading")
        }
    }
}

//https://dev.to/michellebuchiokonicha/how-to-handle-file-uploadimages-documents-etc-in-nuxtjs-and-vuejs-with-vuex-and-axios-api-57ci
</script>