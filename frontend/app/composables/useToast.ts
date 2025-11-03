// useToast.ts
interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration: number
}

export const useToast = () => {
    const toasts = useState<Toast[]>('toasts', () => [])
    let nextId = 0

    const addToast = (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
        const id = nextId++
        const toast: Toast = { id, message, type, duration }

        toasts.value.push(toast)

        // 自动移除
        setTimeout(() => {
            removeToast(id)
        }, duration)

        return id
    }

    const removeToast = (id: number) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    const success = (message: string, duration?: number) => {
        return addToast(message, 'success', duration)
    }

    const error = (message: string, duration?: number) => {
        return addToast(message, 'error', duration)
    }

    const info = (message: string, duration?: number) => {
        return addToast(message, 'info', duration)
    }

    const warning = (message: string, duration?: number) => {
        return addToast(message, 'warning', duration)
    }

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        info,
        warning
    }
}
