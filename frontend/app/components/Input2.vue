<!-- Input2.vue -->
<script setup lang="ts">
const iptValue = defineModel<string>({ required: true })

type IptType = 'text' | 'email' | 'password' | 'textarea'

interface Props {
    iptPholder: string
    iptType: IptType
}
const { iptPholder = '', iptType = 'text' } = defineProps<Props>()

const isFocused = ref(false)
</script>

<template>
    <div class="relative w-full max-w-sm">
        <input 
            :type="iptType" 
            :placeholder="iptPholder" 
            v-model="iptValue"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 rounded-xl outline-none text-white placeholder-gray-400 transition-all duration-300"
            :class="isFocused ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-white/10' : 'border-white/10 hover:border-white/20'"
        >
        <!-- 底部渐变条 -->
        <div 
            class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            :class="isFocused ? 'w-full' : 'w-0'"
        ></div>
    </div>
</template>