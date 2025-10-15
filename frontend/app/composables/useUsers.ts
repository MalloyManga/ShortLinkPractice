// useUsers.ts
interface SignUpData {
    name: string
    email: string
    password: string
}

interface SignInData {
    emailOrName: string
    password: string
}

interface SignInResponse {
    message: string
    userName: string
    userEmail: string
}

export const useSignUp = () => {
    const signUpDataForBody = ref<SignUpData | null>(null)
    const { data, status, error, execute } = useFetch('http://localhost:3000/users/signup', {
        method: 'POST',
        immediate: false,
        watch: false,
        body: signUpDataForBody
    })
    const signUp = async (signUpData: SignUpData) => {
        signUpDataForBody.value = signUpData
        await execute()
    }
    return {
        signUp,
        data,
        status,
        error
    }
}

export const useSignIn = () => {
    const signInDataForBody = ref<SignInData | null>(null)
    const { data, status, error, execute } = useFetch<SignInResponse>('http://localhost:3000/users/signin', {
        method: 'POST',
        immediate: false,
        watch: false,
        body: signInDataForBody,
        credentials: 'include' // 声明前端在跨域请求的时间需要处理凭证问题
    })
    const signIn = async (signInData: SignInData) => {
        signInDataForBody.value = signInData
        await execute()
    }
    return {
        signIn,
        data,
        status,
        error
    }
}