<script setup lang="ts">
interface Props {
    modelValue: boolean
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref({
    currentPassword: '',
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
})

const errors = ref({
    currentPassword: '',
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
})

const submitError = ref('')
const isSubmitting = ref(false)

const { updateProfile, data, status, error } = useUpdateProfile()
const { success } = useToast()

const close = () => {
    emit('update:modelValue', false)
    resetForm()
}

const resetForm = () => {
    formData.value = {
        currentPassword: '',
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    }
    errors.value = {
        currentPassword: '',
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    }
    submitError.value = ''
}

const validateForm = (): boolean => {
    // 重置错误
    errors.value = {
        currentPassword: '',
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    }
    submitError.value = ''

    console.log('[EditProfile] Validating form data:', {
        currentPassword: formData.value.currentPassword,
        name: formData.value.name,
        email: formData.value.email,
        newPassword: formData.value.newPassword,
        confirmPassword: formData.value.confirmPassword
    })

    let isValid = true

    // 当前密码必填
    if (!formData.value.currentPassword.trim()) {
        errors.value.currentPassword = 'Current password is required'
        isValid = false
    }

    // 至少填写一个更新字段
    if (!formData.value.name.trim() && !formData.value.email.trim() && !formData.value.newPassword.trim()) {
        submitError.value = 'At least one field (name, email, or password) must be provided'
        isValid = false
    }

    // 验证邮箱格式
    if (formData.value.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.value.email)) {
            errors.value.email = 'Invalid email format'
            isValid = false
        }
    }

    // 验证新密码长度
    if (formData.value.newPassword && formData.value.newPassword.length < 6) {
        errors.value.newPassword = 'New password must be at least 6 characters'
        isValid = false
    }

    // 验证密码确认
    if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match'
        isValid = false
    }

    console.log('[EditProfile] Validation result:', isValid)
    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        // 构建更新数据
        const updateData: any = {
            currentPassword: formData.value.currentPassword
        }

        if (formData.value.name.trim()) {
            updateData.name = formData.value.name.trim()
        }

        if (formData.value.email.trim()) {
            updateData.email = formData.value.email.trim()
        }

        if (formData.value.newPassword.trim()) {
            updateData.newPassword = formData.value.newPassword
        }

        console.log('[EditProfile] Sending update data:', {
            hasCurrentPassword: !!updateData.currentPassword,
            hasName: !!updateData.name,
            hasEmail: !!updateData.email,
            hasNewPassword: !!updateData.newPassword,
            currentPasswordLength: updateData.currentPassword?.length,
            newPasswordLength: updateData.newPassword?.length
        })

        await updateProfile(updateData)

        // 检查响应状态
        if (status.value === 'success' && data.value) {
            console.log('[EditProfile] Update successful')
            success('Profile updated successfully!')
            emit('success')
            close()
        } else if (status.value === 'error') {
            // 处理错误 - 改进错误信息提取
            console.log('[EditProfile] Error object:', error.value)
            const errorMessage = error.value?.data?.message || error.value?.message || 'Failed to update profile'
            submitError.value = errorMessage
        }
    } catch (err: any) {
        console.log('[EditProfile] Catch error:', err)
        submitError.value = err.message || 'An unexpected error occurred'
    } finally {
        isSubmitting.value = false
    }
}

// 监听状态变化
watch(status, (newStatus) => {
    if (newStatus === 'error' && error.value) {
        console.log('Watch - Error object:', error.value)
        const errorMessage = error.value?.data?.message || error.value?.message || 'Failed to update profile'
        submitError.value = errorMessage
    }
})
</script>

<template>
    <Transition name="modal">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            @click.self="close">
            <div
                class="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
                <!-- 关闭按钮 -->
                <button @click="close" class="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- 标题 -->
                <h2 class="text-2xl font-bold text-white mb-6">Edit Profile</h2>

                <!-- 表单 -->
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- 当前密码 (必填) -->
                    <div>
                        <label class="block text-sm font-medium text-white/80 mb-2">Current Password *</label>
                        <Input2 v-model="formData.currentPassword" ipt-type="password"
                            ipt-pholder="Enter current password" />
                        <p v-if="errors.currentPassword" class="text-red-400 text-sm mt-1">{{ errors.currentPassword }}
                        </p>
                    </div>

                    <!-- 新用户名 (可选) -->
                    <div>
                        <label class="block text-sm font-medium text-white/80 mb-2">New Name</label>
                        <Input2 v-model="formData.name" ipt-type="text" ipt-pholder="Enter new name (optional)" />
                        <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                    </div>

                    <!-- 新邮箱 (可选) -->
                    <div>
                        <label class="block text-sm font-medium text-white/80 mb-2">New Email</label>
                        <Input2 v-model="formData.email" ipt-type="text" ipt-pholder="Enter new email (optional)" />
                        <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                    </div>

                    <!-- 新密码 (可选) -->
                    <div>
                        <label class="block text-sm font-medium text-white/80 mb-2">New Password</label>
                        <Input2 v-model="formData.newPassword" ipt-type="password"
                            ipt-pholder="Enter new password (optional)" />
                        <p v-if="errors.newPassword" class="text-red-400 text-sm mt-1">{{ errors.newPassword }}</p>
                    </div>

                    <!-- 确认新密码 (可选) -->
                    <div v-if="formData.newPassword">
                        <label class="block text-sm font-medium text-white/80 mb-2">Confirm New Password</label>
                        <Input2 v-model="formData.confirmPassword" ipt-type="password"
                            ipt-pholder="Confirm new password" />
                        <p v-if="errors.confirmPassword" class="text-red-400 text-sm mt-1">{{ errors.confirmPassword }}
                        </p>
                    </div>

                    <!-- 错误提示 -->
                    <ErrorBar v-if="submitError" :error-message="submitError" />

                    <!-- 按钮组 -->
                    <div class="flex gap-3 pt-4">
                        <Button2 btn-type="button" btn-content="Cancel" @btn2-click="close"
                            class="flex-1 bg-white/10 hover:bg-white/20" />
                        <Button2 btn-type="submit" :btn-content="isSubmitting ? 'Updating...' : 'Update Profile'"
                            :is-disabled="isSubmitting"
                            class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" />
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.9);
}
</style>


<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.9);
}
</style>
