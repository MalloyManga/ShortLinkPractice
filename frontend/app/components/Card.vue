<!-- comp/Card.vue -->
<script setup lang="ts">

</script>

<template>
    <div class="border-2 border-[#ADFF2F] p-12 rounded-lg grid grid-rows-3 gap-12 items-center justify-items-center">
        <slot name="ipt"></slot>
        <slot name="btn"></slot>
        <slot name="footer"></slot>
    </div>
</template>