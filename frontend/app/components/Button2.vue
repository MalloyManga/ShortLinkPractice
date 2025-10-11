<!-- Button2.vue -->
<script setup lang="ts">
interface Prop {
    btnContent: string
}

const { btnContent } = defineProps<Prop>()

const emit = defineEmits<{
    btn2Click: []
}>()

</script>

<template>
    <div>
        <button type="button" @click="emit('btn2Click')"
            class="bg-white outline-none px-4 py-2 rounded-sm border-2 border-[#323232] font-bold text-[#323232] cursor-pointer shadow-[3px_3px] active:shadow-[0px_0px] active:translate-[3px]">
            {{ btnContent }}
        </button>
    </div>
</template>