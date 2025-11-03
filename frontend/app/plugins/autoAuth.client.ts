// autoAuth.client.ts
export default defineNuxtPlugin(async () => {
    const { setUserAutoAuth, data, error } = useAutoAuth()
    const { setLoggedIn, setLoggedOut } = useAuth()
    const { setUserInfo } = useUserInfo()

    await setUserAutoAuth()

    if (data.value && !error.value) {
        setLoggedIn()
        setUserInfo(data.value)
    } else {
        // 如果验证失败或没有 token，确保登出状态
        setLoggedOut()
    }
})