<template>
    <v-file-input outlined type="file" v-model="image" name="filename" accept="image/*" @change="onFilePicked" />
    <v-img class="child-img" v-bind:src="image" :style="{ backgroundImage: 'url(' + previewFiles + ')'}"></v-img>
</template>
<script setup lang="ts">
async function onFilePicked(e: any){
    const file = e;
    if(!file) return;
    const readData = (f) => {
        new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () =>
        })
    }

}

</script>