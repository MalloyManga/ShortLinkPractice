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
    const { data, status, error, execute } = useFetch<ShortLinkResponse>(`${useRuntimeConfig().public.apiBase}/myapp/short-links`, {
        method: 'POST',
        immediate: false,
        watch: false,
        body: linksDataForBody
    })
    const setLinksData = async (linksData: LinksData) => {
        linksDataForBody.value = linksData
        await execute()
    }
    return {
        setLinksData,
        data,
        status,
        error
    }
}