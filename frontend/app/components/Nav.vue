<!-- Nav.vue -->
<script setup lang="ts">
const isModalOpen = ref(false)
const { isLoggedIn } = useAuth()

const userStatus = computed(() => {
    const userStatusMap = {
        default: 'text-gray-400',
        logIned: 'text-[#ADFF2F]'
    }
    return isLoggedIn.value ? userStatusMap.logIned : userStatusMap.default
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

    <Transition name="fade">
        <div v-if="isModalOpen"
            class="fixed top-0 left-0 z-1 w-screen h-screen bg-black/70 flex justify-center items-center"
            @click="modalClose">
            <Transition name="scale-card" appear>
                <div class="relative z-2" @click.stop>
                    <Form @logined="modalClose" v-if="!isLoggedIn" />
                    <UserInforCard v-else />
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
/* modal fade in and out */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 300ms;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* card scale enter and leave */
.scale-card-enter-active,
.scale-card-leave-active {
    transition: transform 300ms;
}

.scale-card-enter-from,
.scale-card-leave-to {
    transform: scale(0);
}

.scale-card-enter-to,
.scale-card-leave-from {
    transform: scale(1);
}
</style>