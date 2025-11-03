<!-- Switch.vue -->
<script setup lang="ts">
const isChecked = ref(false)

const props = defineProps({
    labels: {
        type: Object,
        required: false,
    }
})

const emit = defineEmits(['swt2Check'])

watch(isChecked, () => {
    emit('swt2Check', isChecked.value)
})
</script>

<template>
    <div class="flex items-center space-x-4">
        <button v-if="labels" @click="isChecked = false"
            :class="!isChecked ? 'text-white font-semibold' : 'text-gray-400'"
            class="text-sm transition-all duration-300 hover:text-white">
            {{ labels.false }}
        </button>

        <label class="relative inline-flex cursor-pointer">
            <input type="checkbox" v-model="isChecked" class="sr-only peer">
            <!-- 背景轨道 -->
            <div
                class="relative w-14 h-7 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 border-2 border-white/20 overflow-hidden">
                <!-- 渐变背景层 - 从左到右滑入 -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                    :class="isChecked ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'"></div>
            </div>
            <!-- 滑块 -->
            <div class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg z-10"
                :class="isChecked ? 'translate-x-7' : 'translate-x-0'"></div>
        </label>

        <button v-if="labels" @click="isChecked = true"
            :class="isChecked ? 'text-white font-semibold' : 'text-gray-400'"
            class="text-sm transition-all duration-300 hover:text-white">
            {{ labels.true }}
        </button>
    </div>
</template>