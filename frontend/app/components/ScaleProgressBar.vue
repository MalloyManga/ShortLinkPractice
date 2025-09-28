<!-- ScaleProgressBar.vue -->
<script setup lang="ts">
interface Prop {
    prgBgi?: string
    prgWidth?: string
    prgBgc?: string
    prgDura?: string
    prgScale: string
    prgOri?: string
    prgHt?: string
    prgPos?: string
}

const { prgBgi, prgWidth, prgBgc = 'bg-sky-300', prgDura = 'duration-300', prgScale, prgHt = 'h-1', prgOri, prgPos = 'left-0 bottom-0' } = defineProps<Prop>()

</script>

<template>
    <span class="absolute transition-all" :class="[prgDura, prgWidth, prgScale, prgOri, prgBgc, prgHt, prgPos]"
        :style="prgBgi"></span>


</template>