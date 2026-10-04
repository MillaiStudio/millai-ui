<script setup lang="ts">
defineProps<{ vertical?: boolean }>();
</script>

<template>
    <hr
        class="m-divider"
        :class="{ 'm-divider--vertical': vertical }"
        :aria-orientation="vertical ? 'vertical' : undefined"
    />
</template>

<style scoped>
.m-divider {
    width: 100%;
    height: 1px;
    margin: 0;
    border: 0;
    background: var(--semantic-colour-separator);
}

.m-divider--vertical {
    align-self: stretch;
    width: 1px;
    height: auto;
}
</style>
