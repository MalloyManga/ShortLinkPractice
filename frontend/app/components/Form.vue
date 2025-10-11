<!-- Form.vue -->
<script setup lang="ts">
const options = ref({ false: 'Sign in', true: 'Sign up' })
const formTp = ref(false)

const formTpChange = (isSwt2Checked: boolean) => {
    formTp.value = isSwt2Checked
}

</script>

<template>
    <div>
        <div class="flex flex-col items-center">
            <Switch :labels="options" @swt2-check="formTpChange" class="mb-4" />
            <Transition name="turn" mode="out-in">
                <div v-if="!formTp">
                    <form action="#"
                        class="flex flex-col justify-between gap-5 p-5 rounded-sm bg-[#D3D3D3] border-2 border-[#323232]">
                        <div class="font-bold text-[25px] text-center text-[#323232] my-5 ">
                            {{ options.false }}
                        </div>
                        <div class="flex flex-col gap-5 items-center">
                            <Input2 ipt-type="email" ipt-pholder="Email" />
                            <Input2 ipt-type="password" ipt-pholder="Password" />
                            <Button5 btn5-content="Let's go!" class="my-5" />
                        </div>
                    </form>
                </div>
                <div v-else>
                    <form action="#"
                        class="flex flex-col justify-between gap-5 p-5 rounded-sm bg-[#D3D3D3] border-2 border-[#323232]">
                        <div class="font-bold text-[25px] text-center text-[#323232] my-5 ">
                            {{ options.true }}
                        </div>
                        <div class="flex flex-col gap-5 items-center">
                            <Input2 ipt-type="text" ipt-pholder="Name" />
                            <Input2 ipt-type="email" ipt-pholder="Email" />
                            <Input2 ipt-type="password" ipt-pholder="Password" />
                            <Button5 btn5-content="Confirm!" class="my-5" />
                        </div>
                    </form>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.turn-enter-active,
.turn-leave-active {
    transition: all 200ms;
}

.turn-enter-from,
.turn-leave-to {
    scale: 0 1;
}

.turn-enter-to,
.turn-leave-from {
    scale: 1 1;
}
</style>