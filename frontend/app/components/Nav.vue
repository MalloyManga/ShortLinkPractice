<!-- Nav.vue -->
<script setup lang="ts">
const isModalOpen = ref(false)
const { isLoggedIn } = useAuth()

const userStatus = computed(() => {
    return isLoggedIn.value ? 'text-purple-400' : 'text-gray-400'
})

function modalOpen() {
    isModalOpen.value = true
}

function modalClose() {
    isModalOpen.value = false
}
</script>

<template>
    <nav class="w-full px-6 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <!-- Logo/标题 -->
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span class="text-white font-bold text-xl">S</span>
                </div>
                <span class="text-white font-bold text-xl hidden sm:block">ShortLink</span>
            </div>

            <!-- 用户按钮 -->
            <button 
                type="button" 
                @click="modalOpen"
                class="glass-effect px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
            >
                <IconUser :class="userStatus" class="w-6 h-6 transition-colors duration-300" />
                <span class="text-white text-sm hidden sm:block">
                    {{ isLoggedIn ? '我的账户' : '登录' }}
                </span>
            </button>
        </div>
    </nav>

    <!-- 模态框 -->
    <Transition name="fade">
        <div 
            v-if="isModalOpen"
            class="fixed inset-0 z-50 flex justify-center items-center px-4 bg-black/60 backdrop-blur-sm"
            @click="modalClose"
        >
            <Transition name="scale-card" appear>
                <div class="relative z-50" @click.stop>
                    <Form @logined="modalClose" v-if="!isLoggedIn" />
                    <UserInforCard v-else @close="modalClose" />
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
/* modal fade in and out */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 300ms ease;
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
    transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-card-enter-from,
.scale-card-leave-to {
    transform: scale(0.8);
    opacity: 0;
}

.scale-card-enter-to,
.scale-card-leave-from {
    transform: scale(1);
    opacity: 1;
}
</style>