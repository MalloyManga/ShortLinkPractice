<!-- UserInforCard.vue -->
<script setup lang="ts">
const { userInfo } = useUserInfo()
</script>

<template>
    <div class="flex flex-col gap-4 p-6 border-2 border-[#ADFF2F] bg-[#212121] text-[#f5f5f5] rounded-xl">
        <div>
            <span class="mr-2 font-semibold drop-shadow-[1px_1px_#ADFF2F]">
                Name:
            </span>
            <input type="text" readonly :value="userInfo.name"
                class="outline-none border-1 border-[#ADFF2F]/40 py-1 px-2 rounded-sm">
        </div>
        <div>
            <span class="mr-3 font-semibold drop-shadow-[1px_1px_#ADFF2F]">
                Email:
            </span>
            <input type="text" readonly :value="userInfo.email"
                class="outline-none border-1 border-[#ADFF2F]/40 py-1 px-2 rounded-sm"></input>
        </div>
        <!-- -------- -->
        <!-- <div>
            <span class="mr-4 font-semibold drop-shadow-[1px_1px_#ADFF2F]">
                Links:
            </span>
            <div class="inline-flex flex-col gap-3">
                <div>
                    <input type="text" readonly value="bilibili.com"
                        class="outline-none border-1 border-[#ADFF2F]/40 py-1 px-2 mr-4 rounded-sm"></input>
                    <input type="text" readonly value="Bzhan"
                        class="outline-none border-1 border-[#ADFF2F]/40 py-1 px-2 rounded-sm"></input>
                </div>
            </div>
        </div> -->
    </div>
</template>