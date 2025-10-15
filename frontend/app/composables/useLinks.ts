// useLinks.ts
interface LinksData {
    origin_link: string
    code?: string
}

interface ShortLinkResponse {
    shortLink: string
    message: string
}

export const useLinks = () => {
    const linksDataForBody = ref<LinksData | null>(null)
    const config = useRuntimeConfig()
    const apiUrl = `${config.public.apiBase}myapp/short-links`

    const { data, status, error, execute } = useFetch<ShortLinkResponse>(apiUrl, {
        method: 'POST',
        body: linksDataForBody,
        immediate: false,
        watch: false,
        credentials: 'include'
    })

    const setLinksData = async (newLinksData: LinksData) => {
        console.log(newLinksData)
        linksDataForBody.value = newLinksData
        await execute()
    }

    return {
        setLinksData,
        data,
        status,
        error
    }
}