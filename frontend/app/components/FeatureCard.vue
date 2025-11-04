<!-- FeatureCard.vue -->
<script setup lang="ts">
import IconLightning from './icon/Lightning.vue'
import IconLock from './icon/Lock.vue'
import IconCustomize from './icon/Customize.vue'

interface Props {
    icon: string
    title: string
    description: string
    gradient: 'purple-pink' | 'blue-cyan' | 'pink-rose'
}

const props = defineProps<Props>()

// 组件映射
const iconMap: Record<string, Component> = {
    Lightning: IconLightning,
    Lock: IconLock,
    Customize: IconCustomize
}

const iconComponent = computed(() => iconMap[props.icon])

// 完整的渐变类名映射（避免动态拼接）
const gradientClasses: Record<string, string> = {
    'purple-pink': 'bg-gradient-to-br from-purple-500 to-pink-500',
    'blue-cyan': 'bg-gradient-to-br from-blue-500 to-cyan-500',
    'pink-rose': 'bg-gradient-to-br from-pink-500 to-rose-500'
}

const gradientClass = computed(() => gradientClasses[props.gradient])
</script>

<template>
    <div class="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" :class="gradientClass">
            <component :is="iconComponent" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-white font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-400 text-sm">{{ description }}</p>
    </div>
</template>
