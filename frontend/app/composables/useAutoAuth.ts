// useAutoAuth.ts
interface UserInfo {
    name: string
    email: string
}

export const useAutoAuth = () => {
    const config = useRuntimeConfig()
    const apiUrl = `${config.public.apiBase}auto-auth`
    const { data, status, error, execute } = useFetch<UserInfo>(apiUrl, {
        immediate: false,
        watch: false,
        credentials: 'include'
    })
    const setUserAutoAuth = async () => {
        await execute()
    }
    return {
        setUserAutoAuth,
        data,
        status,
        error
    }
}