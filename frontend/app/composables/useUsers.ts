// useUsers.ts
interface SignUpData {
    name: string
    email: string
    password: string
}

export const useSignUp = () => {
    const signUpDataForBody = ref<SignUpData | null>(null)
    const { data, status, error, execute } = useFetch('https://localhost:3000/users/signup', {
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
