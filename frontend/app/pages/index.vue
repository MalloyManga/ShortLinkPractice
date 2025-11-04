<!-- pages/index.vue -->
<script setup lang="ts">
const linksData = reactive({
    origin_link: '',
    code: ''
})
const btnContent = ref('Generate Short Link')
const displayError = ref<string | null>(null)
const showSuccess = ref(false)

const { setLinksData, data, status, error: linksError } = useLinks()
const { isLoggedIn } = useAuth()
const { success: successToast } = useToast()

async function handleGetShortLink() {
    // 检查是否登录
    if (!isLoggedIn.value) {
        displayError.value = 'Please sign in to create short links'
        return
    }

    displayError.value = null
    showSuccess.value = false
    btnContent.value = 'Generating...'

    await setLinksData(toRaw(linksData))

    if (linksError.value) {
        displayError.value = linksError.value.data?.message || 'An unknown error occurred.'
        btnContent.value = 'Try Again'
        setTimeout(() => {
            btnContent.value = 'Generate Short Link'
        }, 3000)
    } else if (data.value) {
        try {
            await navigator.clipboard.writeText(data.value.shortLink)
            btnContent.value = 'Copied to Clipboard! ✓'
            showSuccess.value = true
            setTimeout(() => {
                btnContent.value = 'Generate Short Link'
            }, 3000)
        } catch (e) {
            btnContent.value = 'Copy Failed'
            displayError.value = 'Could not copy link to clipboard.'
        }
    }
}

// 清除输入
const clearInputs = () => {
    linksData.origin_link = ''
    linksData.code = ''
    displayError.value = null
    showSuccess.value = false
}

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
        successToast('Copied to clipboard!')
    } catch (e) {
        console.error('Failed to copy:', e)
    }
}
</script>

<template>
    <div class="w-full max-w-2xl mx-auto px-4">
        <!-- 标题区域 -->
        <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                <span class="gradient-text">Short</span>Link
            </h1>
            <p class="text-gray-400 text-lg">
                Transform your long URLs into short, shareable links
            </p>
        </div>

        <!-- 主卡片 -->
        <div class="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
            <!-- 未登录提示 -->
            <div v-if="!isLoggedIn"
                class="mb-6 p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/20 backdrop-blur-sm">
                <div class="flex items-start gap-3">
                    <IconInfo class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div class="flex-1">
                        <p class="text-blue-400 text-sm">Please sign in to create and manage your short links. Click the
                            "Sign In" button in the top right corner.</p>
                    </div>
                </div>
            </div>

            <form @submit.prevent="handleGetShortLink" class="space-y-6">
                <!-- 原始链接输入 -->
                <div class="space-y-2">
                    <label for="origin_link" class="block text-sm font-medium text-gray-300">
                        Original URL
                    </label>
                    <div class="relative">
                        <input id="origin_link" type="url" v-model="linksData.origin_link"
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
                        <input id="code" type="text" v-model="linksData.code" placeholder="my-custom-code"
                            class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl outline-none text-white placeholder-gray-500 transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 focus:bg-white/10" />
                        <div class="absolute right-3 top-1/2 -translate-y-1/2">
                            <IconEdit class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <!-- 按钮组 -->
                <div class="flex gap-3 pt-4">
                    <button type="submit" :disabled="status === 'pending' || !linksData.origin_link"
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

                    <button v-if="linksData.origin_link || linksData.code" type="button" @click="clearInputs"
                        class="px-6 py-4 rounded-xl font-semibold text-gray-300 bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                        Clear
                    </button>
                </div>
            </form>

            <!-- 错误提示 -->
            <Transition name="slide">
                <div v-if="displayError"
                    class="mt-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/20 backdrop-blur-sm">
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
                                <button @click="() => { if (data) copyToClipboard(data.shortLink) }"
                                    class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                    title="Copy again">
                                    <IconCopy class="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- 功能特性 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div class="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div
                    class="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <IconLightning class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-white font-semibold mb-2">Lightning Fast</h3>
                <p class="text-gray-400 text-sm">Generate short links in milliseconds</p>
            </div>

            <div class="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div
                    class="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <IconLock class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-white font-semibold mb-2">Secure</h3>
                <p class="text-gray-400 text-sm">Your links are safe and secure</p>
            </div>

            <div class="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div
                    class="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <IconCustomize class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-white font-semibold mb-2">Customizable</h3>
                <p class="text-gray-400 text-sm">Create custom short codes</p>
            </div>
        </div>
    </div>
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