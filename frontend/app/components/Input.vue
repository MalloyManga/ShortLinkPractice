<!-- comp/Input.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import ScaleProgressBar from './ScaleProgressBar.vue'

interface Props {
    iptName: string
    iptLabel: string
    iptWidth?: string
}
const { iptName = 'ipt', iptLabel = 'Name', iptWidth = 'w-46' } = defineProps<Props>()
const iptValue = defineModel<string>('iptValue')
const isFocused = ref(false)

const handleFocused = () => {
    isFocused.value = true
}
const handleBlur = () => {
    isFocused.value = false
}

const iptPrgBarSCale = computed(() => {
    return isFocused.value ? 'scale-x-100' : 'scale-x-0'
})
const chars = computed(() => {
    return [...iptLabel]
})
const isActive = computed(() => {
    return isFocused.value || (iptValue.value && iptValue.value.trim() != '')
})

</script>

<template>
    <div>
        <div class="relative inline-block">
            <label for="ipt" class="absolute left-2 text-gray-400 cursor-text">
                <span v-for="(char, index) in chars" :key="index"
                    :class="isActive ? 'text-[#ADFF2F] -translate-y-[21px] scale-90' : ''"
                    class="inline-block select-none transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
                    :style="`transition-delay: ${(index + 1) * 50}ms`">
                    {{ char }}
                </span>
            </label>
            <input type="text" id="ipt" :name="iptName" @focus="handleFocused" @blur="handleBlur" v-model="iptValue"
                class="outline-none text-gray-400 bg-transparent pl-2 border-b-[1px] border-gray-400" :class="iptWidth">
            <ScaleProgressBar prg-bgi="background-color: #ADFF2F;" :prg-scale="iptPrgBarSCale" :prg-width="iptWidth" />
        </div>
    </div>
</template>