<template>
    <form ref="data">
        <h1>Title</h1>
        <input type="text" name="title" outlined @change="updateState"/>
        <h1>Markdown</h1>
        <textarea spellcheck="false" class="w-full h-96" name="text" value="---
thumbnail: Naam van het plaatje.png
---
De eerste paar paragrafen die worden getoond op galerij

<!--more-->
Dit is pas zichtbaar als je op de pagina bent
::article-image
---
src: Dit is de titel/plaatje.png
---
::
"></textarea>>
        <h1 class="mt-4">Images</h1>
        <input multiple outlined type="file" name="images" ref="files" accept="image/*" @change="previewFile" />
    </form>
    <ul v-for="image in images">
        <img class="child-img" v-bind:src="image" />
    </ul>
    <button @click="uploaded ? upload() : null" >Upload</button>
</template>
<script>/*
definePageMeta({
    middleware: "require-admin"
})*/
export default {
    data: () => ({
        images: [],
        formData: null,
        uploaded: false,
    }),
    methods: {
        updateState(){
            this.formData = new FormData(this.$refs.data)
            if (this.formData.get("title") && this.formData.get("text")) {
                this.uploaded = true
            }
            else {
                this.uploaded = false
            }
        },
        previewFile() {
            this.formData = new FormData(this.$refs.data)
            this.images = []
            Array.from(this.$refs.files.files).forEach( (value) => {
                this.images.push(URL.createObjectURL(value))
            })
            this.updateState()
        },
        async upload() {
            this.updateState()
            await useAuthFetch('/api/admin/store-new-post', {
                method: "POST",
                body: this.formData
            })
            await navigateTo("/")
        }
    }
}

//https://dev.to/michellebuchiokonicha/how-to-handle-file-uploadimages-documents-etc-in-nuxtjs-and-vuejs-with-vuex-and-axios-api-57ci
</script>