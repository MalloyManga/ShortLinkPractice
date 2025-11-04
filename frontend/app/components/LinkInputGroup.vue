<!-- LinkInputGroup.vue -->
<script setup lang="ts">
interface LinksData {
    origin_link: string
    code: string
}

interface Props {
    linksData: LinksData
    status: string
    displayError: string | null
    showSuccess: boolean
    btnContent: string
    data: { shortLink: string } | null
}

interface Emits {
    (e: 'submit'): void
    (e: 'clear'): void
    (e: 'copy', text: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const linksDataModel = defineModel<LinksData>('linksData', { required: true })
</script>

<template>
    <form @submit.prevent="emit('submit')" class="space-y-6">
        <!-- 原始链接输入 -->
        <div class="space-y-2">
            <label for="origin_link" class="block text-sm font-medium text-gray-300">
                Original URL
            </label>
            <div class="relative">
                <input id="origin_link" type="url" v-model="linksDataModel.origin_link"
                    placeholder="https://example.com/very-long-url" required
                    class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 focus:bg-white/10" />
                <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <IconLink class="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </div>

        <!-- 自定义代码输入 (可选) -->
        <div class="space-y-2">
            <label for="code" class="block text-sm font-medium text-gray-300">
                Custom Code <span class="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div class="relative">
                <input id="code" type="text" v-model="linksDataModel.code" placeholder="my-custom-code"
                    class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 focus:bg-white/10" />
                <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <IconEdit class="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </div>

        <!-- 按钮组 -->
        <div class="flex gap-3 pt-4">
            <button type="submit" :disabled="status === 'pending' || !linksDataModel.origin_link"
                class="flex-1 relative px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <!-- 光泽效果 -->
                <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                </div>
                <span class="relative z-10 flex items-center justify-center gap-2">
                    <IconSpinner v-if="status === 'pending'" class="w-5 h-5" />
                    {{ btnContent }}
                </span>
            </button>

            <button v-if="linksDataModel.origin_link || linksDataModel.code" type="button" @click="emit('clear')"
                class="px-6 py-4 rounded-xl font-semibold text-gray-300 bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                Clear
            </button>
        </div>
    </form>

    <!-- 错误提示 -->
    <Transition name="slide">
        <div v-if="displayError" class="mt-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/20 backdrop-blur-sm">
            <div class="flex items-center gap-3">
                <IconError class="w-5 h-5 text-red-400 flex-shrink-0" />
                <p class="text-red-400 text-sm">{{ displayError }}</p>
            </div>
        </div>
    </Transition>

    <!-- 成功提示 -->
    <Transition name="slide">
        <div v-if="showSuccess && data"
            class="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 backdrop-blur-sm">
            <div class="flex items-start gap-3">
                <IconCheckCircle class="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div class="flex-1">
                    <p class="text-purple-400 font-medium mb-2">Short link created successfully!</p>
                    <div class="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                        <code class="flex-1 text-white text-sm break-all">{{ data.shortLink }}</code>
                        <button @click="emit('copy', data.shortLink)"
                            class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                            title="Copy again">
                            <IconCopy class="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 300ms ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

/* 自定义输入框滚动条 */
input::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

input::-webkit-scrollbar-track {
    background: transparent;
}

input::-webkit-scrollbar-thumb {
    background: rgba(147, 51, 234, 0.3);
    border-radius: 10px;
    transition: background 0.3s ease;
}

input::-webkit-scrollbar-thumb:hover {
    background: rgba(147, 51, 234, 0.5);
}

/* Firefox */
input {
    scrollbar-width: thin;
    scrollbar-color: rgba(147, 51, 234, 0.3) transparent;
}
</style>
