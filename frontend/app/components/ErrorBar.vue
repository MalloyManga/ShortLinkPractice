<!-- ErrorBar.vue -->
<script setup lang="ts">
interface Prop {
    errorMessage?: string
}

const { errorMessage } = defineProps<Prop>()
</script>

<template>
    <div class="p-2 font-bold flex justify-center items-center rounded-lg border-2 border-[#BF092F] text-[#BF092F]">
        {{ errorMessage }}
    </div>
</template>