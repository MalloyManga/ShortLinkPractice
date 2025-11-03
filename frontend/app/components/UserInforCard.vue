<!-- UserInforCard.vue -->
<script setup lang="ts">
const { userInfo } = useUserInfo()
const { setLoggedOut } = useAuth()
const { signOut } = useSignOut()
const { success } = useToast()

const emit = defineEmits<{
    close: []
}>()

const handleLogout = async () => {
    await signOut()
    setLoggedOut()
    success('Successfully logged out!')
    emit('close')
}
</script>

<template>
    <div class="w-full max-w-md">
        <div class="glass-effect rounded-2xl p-8 shadow-2xl">
            <!-- 头部 -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-white font-semibold text-lg">My Account</h3>
                        <p class="text-gray-400 text-sm">Manage your profile</p>
                    </div>
                </div>
                <button @click="emit('close')" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- 用户信息 -->
            <div class="space-y-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Username</label>
                    <div class="px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white">
                        {{ userInfo.name }}
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <div
                        class="px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white break-all">
                        {{ userInfo.email }}
                    </div>
                </div>
            </div>

            <!-- 统计信息 (可扩展) -->
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-white/10">
                    <div class="text-2xl font-bold text-white mb-1">0</div>
                    <div class="text-sm text-gray-400">Total Links</div>
                </div>
                <div class="p-4 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-white/10">
                    <div class="text-2xl font-bold text-white mb-1">0</div>
                    <div class="text-sm text-gray-400">Total Clicks</div>
                </div>
            </div>

            <!-- 操作按钮 -->
            <button @click="handleLogout"
                class="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">
                Sign Out
            </button>
        </div>
    </div>
</template>