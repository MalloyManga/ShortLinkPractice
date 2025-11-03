<!-- Form.vue -->
<script setup lang="ts">
const options = ref({ false: 'Sign in', true: 'Sign up' })
const formTp = ref(false)
const signUpData = reactive({
    name: '',
    email: '',
    password: ''
})
const signInData = reactive({
    emailOrName: '',
    password: ''
})
const { setLoggedIn } = useAuth()
const { setUserInfo } = useUserInfo()
const { signUp, data: useSignUpData, status: useSignUpStatus, error: useSignUpError } = useSignUp()
const { signIn, data: useSignInData, status: useSignInStatus, error: useSignInError } = useSignIn()

const emit = defineEmits<{
    logined: []
}>()

const formTpChange = (isSwt2Checked: boolean) => {
    formTp.value = isSwt2Checked
}

async function handleSignUp() {
    await signUp(signUpData)
    if (!useSignUpError.value) {
        alert('Registration successful! Please sign in.')
        formTp.value = false
    }
}

async function handleSignIn() {
    await signIn(signInData)
    if (!useSignInError.value) {
        if (useSignInData.value) {
            setUserInfo({
                name: useSignInData.value.userName,
                email: useSignInData.value.userEmail
            })
        }
        setLoggedIn()
        emit('logined')
    }
}
</script>

<template>
    <div class="w-full max-w-md">
        <div class="glass-effect rounded-2xl p-8 shadow-2xl">
            <!-- 顶部切换 -->
            <div class="flex justify-center mb-8">
                <Switch :labels="options" @swt2-check="formTpChange" />
            </div>

            <Transition name="turn" mode="out-in">
                <!-- 登录表单 -->
                <div v-if="!formTp" key="signin">
                    <form @submit.prevent="handleSignIn" class="space-y-6">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p class="text-gray-400 text-sm">Sign in to continue</p>
                        </div>

                        <ErrorBar 
                            v-if="useSignInError"
                            :error-message="useSignInError.data?.message || 'An unknown error occurred.'" 
                        />

                        <div class="space-y-4">
                            <Input2 
                                ipt-type="email" 
                                ipt-pholder="Email or Username" 
                                v-model="signInData.emailOrName" 
                            />
                            <Input2 
                                ipt-type="password" 
                                ipt-pholder="Password" 
                                v-model="signInData.password" 
                            />
                        </div>

                        <Button2 
                            btn-type="submit" 
                            btn-content="Sign In" 
                            btn-status="default"
                            :is-disabled="useSignInStatus === 'pending'" 
                        />
                    </form>
                </div>

                <!-- 注册表单 -->
                <div v-else key="signup">
                    <form @submit.prevent="handleSignUp" class="space-y-6">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
                            <p class="text-gray-400 text-sm">Sign up to get started</p>
                        </div>

                        <ErrorBar 
                            v-if="useSignUpError"
                            :error-message="useSignUpError.data?.message || 'An unknown error occurred.'" 
                        />

                        <div class="space-y-4">
                            <Input2 
                                ipt-type="text" 
                                ipt-pholder="Username" 
                                v-model="signUpData.name" 
                            />
                            <Input2 
                                ipt-type="email" 
                                ipt-pholder="Email" 
                                v-model="signUpData.email" 
                            />
                            <Input2 
                                ipt-type="password" 
                                ipt-pholder="Password" 
                                v-model="signUpData.password" 
                            />
                        </div>

                        <Button2 
                            btn-type="submit" 
                            btn-content="Create Account" 
                            btn-status="default"
                            :is-disabled="useSignUpStatus === 'pending'" 
                        />
                    </form>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.turn-enter-active,
.turn-leave-active {
    transition: all 300ms ease;
}

.turn-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.turn-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

.turn-enter-to,
.turn-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>