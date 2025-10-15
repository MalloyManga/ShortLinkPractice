<!-- pages/index.vue -->
<script setup lang="ts">
const linksData = reactive({
    origin_link: '',
    code: ''
})
const btnContent = ref('Get shortlink!')
const displayError = ref<string | null>(null)

const { setLinksData, data, status, error: linksError } = useLinks()

async function handleGetShortLink() {
    displayError.value = null
    btnContent.value = 'Generating...'

    await setLinksData(toRaw(linksData))

    if (linksError.value) {
        displayError.value = linksError.value.data?.message || 'An unknown error occurred.'
        btnContent.value = 'Failed! Try again.'
    } else if (data.value) {
        try {
            await navigator.clipboard.writeText(data.value.shortLink)
            btnContent.value = 'Short link copied!'
            setTimeout(() => {
                btnContent.value = 'Get shortlink!'
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