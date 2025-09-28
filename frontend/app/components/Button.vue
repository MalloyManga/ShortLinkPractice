<!-- comp/Button.vue -->
<script setup lang="ts">
import RightArrow from './icon/RightArrow.vue'

interface Prop {
    btnContent: string
}

const { btnContent = 'Click me' } = defineProps<Prop>()

const emit = defineEmits<{
    btnClick: []
}>()
</script>

<template>
    <div>
        <button type="button" @click="emit('btnClick')"
            class="relative bg-[#212121] overflow-hidden cursor-pointer flex font-bold text-[#ADFF2F] border-4 border-[#212121] shadow-[0_0_0_2px_#ADFF2F] rounded-4xl px-8 py-4.5 transition-all duration-300 group hover:rounded-2xl hover:shadow-[0_0_0_12px_transparent] active:shadow-[0_0_0_4px_#ADFF2F]">
            <div
                class="absolute left-1/2 top-1/2 size-2 -translate-1/2 transition-all duration-500 rounded-full opacity-0 group-hover:size-[200px] group-hover:opacity-100 origin-center bg-[#ADFF2F]">
            </div>
            <RightArrow
                class="absolute text-[#212121] size-6 -translate-x-16 transition-transform duration-300 group-hover:-translate-x-4" />
            <span
                class="transition-all duration-300 -translate-x-2  group-hover:translate-x-4 group-hover:text-[#212121]">
                {{ btnContent }}
            </span>
            <RightArrow
                class="absolute right-2 text-[#ADFF2F] size-6 transition-transform duration-300 group-hover:translate-x-10" />
        </button>
    </div>
</template>