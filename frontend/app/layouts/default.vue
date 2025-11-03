<!-- default.vue -->
<script setup lang="ts">

</script>

<template>
    <div
        class="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
        <!-- 装饰性背景圆 -->
        <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl">
        </div>

        <header class="absolute top-0 left-0 right-0 z-50">
            <Nav />
        </header>

        <main class="min-h-screen flex justify-center items-center px-4 py-20">
            <NuxtPage />
        </main>

        <!-- Toast 通知 -->
        <Toast />
    </div>
</template>