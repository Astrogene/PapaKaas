<template>
    <div class="my-4">
        <div ref="time" class="flex flex-row items-center justify-start overflow-x-scroll border-slate-900 border-y-2">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
    </div>
</template>
<script lang="ts">
export default {
    mounted() {
        const div: any = this.$refs['time']
        const divs: any = div.getElementsByTagName('div');
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].nextSibling.tagName == "DIV") {
                const span = document.createElement('object')
                span.setAttribute('width', '100%')
                span.setAttribute('height', '10px')
                span.setAttribute('class', 'bg-slate-800 lg:mx-8 md:mx-3 mx-2')
                span.style.minWidth = '4rem'
                div.insertBefore(span, divs[i].nextSibling)
            }
        }
    }
}
</script>