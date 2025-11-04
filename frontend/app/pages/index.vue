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

// 功能特性配置
const features = [
    {
        icon: 'Lightning',
        title: 'Lightning Fast',
        description: 'Generate short links in milliseconds',
        gradient: 'purple-pink' as const
    },
    {
        icon: 'Lock',
        title: 'Secure',
        description: 'Your links are safe and secure',
        gradient: 'blue-cyan' as const
    },
    {
        icon: 'Customize',
        title: 'Customizable',
        description: 'Create custom short codes',
        gradient: 'pink-rose' as const
    }
]

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

            <!-- 链接输入表单 -->
            <LinkInputGroup v-model:links-data="linksData" :status="status" :display-error="displayError"
                :show-success="showSuccess" :btn-content="btnContent" :data="data || null" @submit="handleGetShortLink"
                @clear="clearInputs" @copy="copyToClipboard" />
        </div>

        <!-- 功能特性 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <FeatureCard v-for="feature in features" :key="feature.title" :icon="feature.icon" :title="feature.title"
                :description="feature.description" :gradient="feature.gradient" />
        </div>
    </div>
</template>