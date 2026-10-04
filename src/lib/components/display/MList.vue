<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'grouped' | 'plain' }>(), { variant: 'grouped' });
</script>

<template>
    <ul class="m-list" :class="`m-list--${variant}`" role="list">
        <slot />
    </ul>
</template>

<style scoped>
.m-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.m-list--grouped {
    overflow: hidden;
    border-radius: var(--border-radius-large);
    background: var(--semantic-colour-surface);
}
</style>
