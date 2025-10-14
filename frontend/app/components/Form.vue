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
        alert('Registration successful! Please sign in.') // test
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
    <div>
        <div class="flex flex-col items-center">
            <Switch :labels="options" @swt2-check="formTpChange" class="mb-4" />
            <Transition name="turn" mode="out-in">
                <div v-if="!formTp">
                    <form @submit.prevent="handleSignIn"
                        class="flex flex-col justify-between gap-5 p-5 rounded-xl bg-[#D3D3D3] border-2 border-[#323232]">
                        <div class="font-bold text-[25px] text-center text-[#323232] my-5 ">
                            {{ options.false }}
                        </div>
                        <ErrorBar v-if="useSignInError"
                            :error-message="useSignInError.data?.message || 'An unknown error occurred.'" />
                        <div class="flex flex-col gap-5 items-center">
                            <Input2 ipt-type="email" ipt-pholder="Email" v-model="signInData.emailOrName" />
                            <Input2 ipt-type="password" ipt-pholder="Password" v-model="signInData.password" />
                            <Button2 btn-type="submit" btn-content="Sign in" class="my-5" btn-status="default"
                                :is-disabled="useSignInStatus === 'pending'" />
                        </div>
                    </form>
                </div>
                <div v-else>
                    <form @submit.prevent="handleSignUp"
                        class="flex flex-col justify-between gap-5 p-5 rounded-xl bg-[#D3D3D3] border-2 border-[#323232]">
                        <div class="font-bold text-[25px] text-center text-[#323232] my-5 ">
                            {{ options.true }}
                        </div>
                        <ErrorBar v-if="useSignUpError"
                            :error-message="useSignUpError.data?.message || 'An unknown error occurred.'" />
                        <div class="flex flex-col gap-5 items-center">
                            <Input2 ipt-type="text" ipt-pholder="Name" v-model="signUpData.name" />
                            <Input2 ipt-type="email" ipt-pholder="Email" v-model="signUpData.email" />
                            <Input2 ipt-type="password" ipt-pholder="Password" v-model="signUpData.password" />
                            <Button2 btn-type="submit" btn-content="Confirm" class="my-5" btn-status="default"
                                :is-disabled="useSignUpStatus === 'pending'" />
                        </div>
                    </form>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.turn-enter-active,
.turn-leave-active {
    transition: all 200ms;
}

.turn-enter-from,
.turn-leave-to {
    scale: 0 1;
}

.turn-enter-to,
.turn-leave-from {
    scale: 1 1;
}
</style>