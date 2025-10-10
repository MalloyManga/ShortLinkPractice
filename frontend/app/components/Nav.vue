<!-- Nav.vue -->
<script setup lang="ts">
const userStatus = ref<'text-[#ADFF2F]'| 'text-gray-400'>('text-gray-400')


</script>

<template>
    <div class="w-screen p-8 inline-flex justify-end items-center gap-2">
        <IconUser :class="userStatus" class="size-10 mr-4 cursor-pointer" />
        <Button2 btn-content="Sign up" class="text-xs" />
        <Button2 btn-content="Sign in" class="text-xs" />
    </div>
</template>
