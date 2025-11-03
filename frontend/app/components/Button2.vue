<!-- Button2.vue -->
<script setup lang="ts">
interface Prop {
    btnContent: string
    btnType: "button" | "submit"
    btnStatus?: 'error' | 'default'
    isDisabled?: boolean
}

const { btnContent, btnStatus = 'default', isDisabled = false } = defineProps<Prop>()

const btnStyle = computed(() => {
    if (btnStatus === 'error') {
        return 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
    }
    return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
})

const emit = defineEmits<{
    btn2Click: []
}>()
</script>

<template>
    <button 
        :type="btnType" 
        @click="emit('btn2Click')" 
        :disabled="isDisabled"
        :class="[btnStyle, isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105']"
        class="relative w-full px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden group disabled:hover:scale-100 disabled:hover:shadow-none"
    >
        <!-- 光泽效果 -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <span class="relative z-10">{{ btnContent }}</span>
    </button>
</template>