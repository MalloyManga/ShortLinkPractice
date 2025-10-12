<!-- pages/index.vue -->
<script setup lang="ts">

</script>

<template>
    <div>
        <Card>
            <template #ipt>
                <Input ipt-label="Origin Link" ipt-name="origin_link" ipt-width="w-96" ipt-id="origin_link" />
                <Input ipt-label="Short Link" ipt-name="short_link" ipt-width="w-96" ipt-id="short_link" />
            </template>
            <template #btn>
                <Button btn-content="Get shortlink!" />
            </template>
        </Card>
    </div>
</template>