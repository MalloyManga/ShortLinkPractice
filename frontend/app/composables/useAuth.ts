// useAuth.ts
export const useAuth = () => {
    const isLoggedIn = useState<boolean>('isLoggedIn', () => false)
    const setLoggedIn = () => {
        isLoggedIn.value = true
    }
    const setLoggedOut = () => {
        isLoggedIn.value = false
    }
    return {
        isLoggedIn,
        setLoggedIn,
        setLoggedOut
    }
}
