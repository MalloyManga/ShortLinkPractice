<!-- Nav.vue -->
<script setup lang="ts">
const isModalOpen = ref(false)
const { isLoggedIn } = useAuth()

const userStatus = computed(() => {
    const userStatusMap = {
        default: 'text-gray-400',
        logIned: 'text-[#ADFF2F]'
    }
    return isLoggedIn ? userStatusMap.default : userStatusMap.logIned
})
function modalOpen() {
    isModalOpen.value = true
}

function modalClose() {
    isModalOpen.value = false
}
</script>

<template>
    <div class="w-screen p-8 inline-flex justify-end items-center gap-2">
        <button type="button" class="mr-4 cursor-pointer" @click="modalOpen">
            <IconUser :class="userStatus" class="size-10" />
        </button>
    </div>

    <div v-if="isModalOpen"
        class="fixed top-0 left-0 z-1 w-screen h-screen bg-black/70 flex justify-center items-center"
        @click="modalClose">
        <div class="relative z-2" @click.stop>
            <Form @logined="modalClose" />
        </div>
    </div>
</template>
