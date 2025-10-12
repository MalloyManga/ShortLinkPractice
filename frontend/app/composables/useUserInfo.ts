// useUserInfo.ts
interface UserInfo {
    name: string
    email: string
}
export const useUserInfo = () => {
    const userInfo = useState<UserInfo>('userInfo', () => {
        return {
            name: '',
            email: ''
        }
    })
    const setUserInfo = (newUserInfo: UserInfo) => {
        userInfo.value = newUserInfo
    }
    return {
        userInfo,
        setUserInfo
    }
}