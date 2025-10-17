// autoAuth.client.ts
export default defineNuxtPlugin(async () => {
    const { setUserAutoAuth, data } = useAutoAuth()
    const { setLoggedIn } = useAuth()
    const { setUserInfo } = useUserInfo()
    await setUserAutoAuth()
    if (data.value) {
        setLoggedIn()
        setUserInfo(data.value)
    }
})