<!-- Input2.vue -->
<script setup lang="ts">
const iptValue = defineModel<string>()

type IptType = 'text' | 'email' | 'password' | 'textarea'

interface Props {
    iptPholder: string
    iptType: IptType
}
const { iptPholder = '', iptType = 'text' } = defineProps<Props>()
</script>

<template>
    <div>
        <input :type="iptType" :placeholder="iptPholder" v-model="iptValue"
            class="outline-none bg-white w-[250px] h-10 font-bold px-[10px] rounded-sm border-2 border-[#323232] shadow-[3px_3px_#323232] transition-all duration-300 focus:border-[#ADFF2F] focus:shadow-none focus:translate-[3px]">
    </div>
</template>