<script setup lang="ts">
import { computed, provide } from 'vue';
import { navigationContextKey } from './context';

const selected = defineModel<string>({ default: '' });
withDefaults(defineProps<{ label?: string }>(), { label: 'Primary navigation' });

const select = (id: string): void => {
    selected.value = id;
};

provide(navigationContextKey, { selected: computed(() => selected.value), select });
</script>

<template>
    <nav class="m-tab-view" :aria-label="label">
        <slot />
    </nav>
</template>

<style scoped>
.m-tab-view {
    position: sticky;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: stretch;
    gap: var(--spacing-x-small);
    padding: var(--spacing-x-small) var(--spacing-small) calc(var(--spacing-x-small) + env(safe-area-inset-bottom));
    border-top: 1px solid var(--semantic-colour-separator);
    background: var(--semantic-colour-backdrop);
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
}
</style>
