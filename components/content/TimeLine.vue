<template>
    <div class="my-4">
        <hr class="my-4 border-slate-900" />
        <div ref="time" class="flex flex-row items-center justify-around">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
        <hr class="my-4 border-slate-900" />
    </div>
</template>
<script lang="ts">
export default {
    mounted() {
        const div: any = this.$refs['time']
        const divs: any = div.getElementsByTagName('div');
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].nextSibling) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                svg.setAttribute('width', '100%')
                svg.setAttribute('height', '10px')
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                line.setAttributeNS(null, 'x1', Math.round(svg.getBoundingClientRect().left).toString())
                line.setAttributeNS(null, 'y1', Math.round(svg.getBoundingClientRect().top).toString())
                line.setAttributeNS(null, 'x2', Math.round(svg.getBoundingClientRect().right).toString())
                line.setAttributeNS(null, 'y2', Math.round(svg.getBoundingClientRect().bottom).toString())
                line.setAttributeNS(null, 'stroke', 'red')
                svg.appendChild(line)
                div.insertBefore(svg, divs[i].nextSibling)
            }
        }
    }
}
</script>