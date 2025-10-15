<!-- pages/index.vue -->
<script setup lang="ts">
const linksData = reactive({
    origin_link: '',
    code: ''
})
const btnContent = ref('Get shortlink!')

// 1. 从 useLinks() 中解构出 error，并重命名为 linksError 以避免命名冲突
const { setLinksData, data, status, error: linksError } = useLinks()

// 2. 创建一个新的 ref 来专门存储要显示给用户的错误信息
const displayError = ref<string | null>(null)

async function handleGetShortLink() {
    // 3. 在每次点击时，先清空上一次的错误信息
    displayError.value = null
    btnContent.value = 'Generating...' // 可以给一个加载中的状态

    await setLinksData(toRaw(linksData))

    // 4. 检查 linksError.value 是否有值
    if (linksError.value) {
        // 如果有错误，从 error.data 中提取后端返回的 message
        // 使用可选链 ?. 和空值合并 ?? 来安全地处理各种可能的错误结构
        displayError.value = linksError.value.data?.message || 'An unknown error occurred.'
        btnContent.value = 'Failed! Try again.' // 更新按钮状态
    } else if (data.value) {
        // 只有在没有错误时，才执行成功的逻辑
        try {
            await navigator.clipboard.writeText(data.value.shortLink)
            btnContent.value = 'Short link copied!'
            setTimeout(() => {
                btnContent.value = 'Get shortlink!' // 注意这里是 shortlink，保持一致
            }, 3000)
        } catch (e) {
            btnContent.value = 'Copy failed!'
            displayError.value = 'Could not copy link to clipboard.'
        }
    }
}
</script>

<template>
    <div>
        <Card>
            <template #ipt>
                <Input ipt-label="Origin Link" ipt-name="origin_link" ipt-width="w-96" ipt-id="origin_link"
                    :is-ipt-required="true" v-model:ipt-value="linksData.origin_link" />
                <Input ipt-label="Code" ipt-name="short_link" ipt-width="w-96" ipt-id="code" :is-ipt-required="false"
                    v-model:ipt-value="linksData.code" />
            </template>
            <template #btn>
                <Button :btn-content="btnContent" @btn-click="handleGetShortLink" />
            </template>
            <!-- 5. 在卡片下方或合适的位置，显示错误信息 -->
            <template #footer>
                <div v-if="displayError" class="mt-4 p-3 text-center text-red-400 bg-red-900/30 rounded-md">
                    {{ displayError }}
                </div>
                <div v-if="data && !linksError" class="mt-4 p-3 text-center text-green-400 bg-green-900/30 rounded-md">
                    Short Link: {{ data.shortLink }}
                </div>
            </template>
        </Card>
    </div>
</template>