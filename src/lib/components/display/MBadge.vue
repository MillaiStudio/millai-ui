<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' }>(), {
    tone: 'neutral',
});
</script>

<template>
    <span class="m-badge" :class="`m-badge--${tone}`"><slot /></span>
</template>

<style scoped>
.m-badge {
    --m-badge-colour: var(--semantic-colour-label2);

    display: inline-flex;
    align-items: center;
    gap: var(--spacing-x-small);
    padding: 0.125rem var(--spacing-small);
    border-radius: 999px;
    color: var(--m-badge-colour);
    background: color-mix(in srgb, var(--m-badge-colour) 14%, transparent);
    font-size: var(--typography-caption1-size);
    font-weight: var(--typography-caption1-emphasis);
    line-height: var(--typography-caption1-leading);
    white-space: nowrap;
}

.m-badge--accent {
    --m-badge-colour: var(--semantic-colour-accent);
}

.m-badge--success {
    --m-badge-colour: var(--semantic-colour-success);
}

.m-badge--warning {
    --m-badge-colour: var(--semantic-colour-warning);
}

.m-badge--danger {
    --m-badge-colour: var(--semantic-colour-danger);
}
</style>
