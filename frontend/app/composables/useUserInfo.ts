// useUserInfo.ts
interface UserInfo {
    name: string
    email: string
    stats?: {
        totalLinks: number
        totalClicks: number
    }
}
export const useUserInfo = () => {
    const userInfo = useState<UserInfo>('userInfo', () => {
        return {
            name: '',
            email: '',
            stats: {
                totalLinks: 0,
                totalClicks: 0
            }
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