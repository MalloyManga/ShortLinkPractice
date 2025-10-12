<!-- Button2.vue -->
<script setup lang="ts">
interface Prop {
    btnContent: string
    btnType: "button" | "submit"
    btnStatus: 'error' | 'default'
    isDisabled: boolean
}

const { btnContent, btnStatus = 'default' } = defineProps<Prop>()
const btnStyle = computed(() => {
    const styleMap = {
        default: 'border-[#323232] text-[#323232] ',
        error: 'border-[#BF092F] text-[#BF092F]'
    }
    return styleMap[btnStatus]
})

const emit = defineEmits<{
    btn2Click: []
}>()

</script>

<template>
    <div>
        <button :type="btnType" @click="emit('btn2Click')" :class="btnStyle" :disabled="isDisabled"
            class="bg-white outline-none px-4 py-2 rounded-sm border-2 border-[#323232] font-bold text-[#323232] cursor-pointer shadow-[3px_3px] active:shadow-[0px_0px] active:translate-[3px]">
            {{ btnContent }}
        </button>
    </div>
</template>