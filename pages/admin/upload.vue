<template>
    <ul v-for="image in images">
        <img class="child-img" v-bind:src="image" />
    </ul>
    <form ref="form">
        <input multiple outlined type="file" ref="file" accept="image/*" @change="previewFile" />
    </form>
    <button class="border-4" @click="uploaded ? upload() : null" :disabled="uploaded">Upload</button>
</template>
<script>
export default {
    data: () => ({
        images: [],
        formData: null,
        uploaded: false
    }),
    methods: {
        previewFile() {
            const images_d = this.$refs.file.files
            this.formData = new FormData(this.$refs.form)
            this.images = []
            Array.from(images_d).forEach((item, index) => {
               this.images.push(URL.createObjectURL(item))
               this.formData.append(`file[${index}]`, item)
            })
            uploaded = true
        },
        async upload() {
            await useAuthFetch('/api/admin/store-new-images', {
                method: "POST",
                body: this.formData
            })
        }
    }
}

//https://dev.to/michellebuchiokonicha/how-to-handle-file-uploadimages-documents-etc-in-nuxtjs-and-vuejs-with-vuex-and-axios-api-57ci
</script>