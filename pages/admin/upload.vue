<template>
    <form ref="data">
        <h1>Title</h1>
        <input type="text" name="title" class="bg-slate-800" outlined @change="updateState" />
        <h1>Markdown</h1>
        <textarea spellcheck="false" class="w-full h-96 bg-slate-800" name="text" value="---
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

# Dit is een h1
## Dit is een h2
### Dit is een h3
enz.



"></textarea>
        <h1 class="my-4 text-2xl">Images</h1>
        <input class="bg-slate-800" multiple outlined type="file" name="images" ref="files" accept="image/*"
            @change="previewFile" />
    </form>
    <ul class="grid grid-cols-4 mx-8">
        <li class="relative h-64 p-2 m-2 border-4 border-slate-900" v-for="image in images">
            <button class="absolute top-0 left-0 w-full h-full bg-no-repeat bg-contain hover:blur-lg peer"
                v-bind:style="{ backgroundImage: 'url(' + image[0] + ')' }" @click="copy">
            </button>
            <div class="absolute hidden -translate-x-1/2 -translate-y-1/2 select-none top-1/2 left-1/2 child peer-hover:block">
                <p>
                    Click to copy the image name
                </p>
                <p ref="nameimage">
                    {{ this.formData.get("title") + '/' + image[1] }}
                </p>
            </div>
        </li>
    </ul>
    <button class="block p-2 m-auto my-4 rounded-xl bg-slate-800"
        @click="uploaded ? upload() : alert('Not enough data')">Upload</button>
</template>
<script>
definePageMeta({
    middleware: "require-admin"
})
export default {
    data: () => ({
        images: [],
        formData: null,
        uploaded: false,
    }),
    methods: {
        updateState() {
            this.previewFile()
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
            Array.from(this.$refs.files.files).forEach((value) => {
                this.images.push(new Array(URL.createObjectURL(value), value.name))
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
        },
        copy(){
            console.log(this.$refs.nameimage[0])
            navigator.clipboard.writeText(this.$refs.nameimage[0].innerText.toString())
        }
    }
}

//https://dev.to/michellebuchiokonicha/how-to-handle-file-uploadimages-documents-etc-in-nuxtjs-and-vuejs-with-vuex-and-axios-api-57ci
</script>