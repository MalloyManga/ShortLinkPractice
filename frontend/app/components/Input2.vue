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
        <input :type="iptType" :placeholder="iptPholder" v-model="iptValue" @focus="isFocused = true"
            @blur="isFocused = false"
            class="custom-input w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 rounded-xl outline-none text-white placeholder-gray-400 transition-all duration-300"
            :class="isFocused ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-white/10' : 'border-white/10 hover:border-white/20'">
    </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
.custom-input::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.custom-input::-webkit-scrollbar-track {
    background: transparent;
}

.custom-input::-webkit-scrollbar-thumb {
    background: rgba(147, 51, 234, 0.3);
    border-radius: 10px;
    transition: background 0.3s ease;
}

.custom-input::-webkit-scrollbar-thumb:hover {
    background: rgba(147, 51, 234, 0.5);
}

/* Firefox */
.custom-input {
    scrollbar-width: thin;
    scrollbar-color: rgba(147, 51, 234, 0.3) transparent;
}
</style>