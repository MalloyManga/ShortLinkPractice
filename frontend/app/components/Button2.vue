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
            class="outline-none px-4 py-2 rounded-sm border-2 border-[#ADFF2F] font-bold text-[#ADFF2F] cursor-pointer shadow-[3px_3px] active:shadow-[0px_0px] active:translate-[3px]">
            {{ btnContent }}
        </button>
    </div>
</template>