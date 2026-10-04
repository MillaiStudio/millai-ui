<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

withDefaults(
    defineProps<{
        variant?: 'primary' | 'plain' | 'secondary' | 'ghost';
        compact?: boolean;
        type?: ButtonHTMLAttributes['type'];
    }>(),
    {
        variant: 'primary',
        compact: false,
        type: 'button',
    },
);
</script>

<template>
    <button :class="['m-button', `m-button--${variant}`, { 'm-button--compact': compact }]" :type="type">
        <slot />
    </button>
</template>

<style scoped>
.m-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-small);
    min-height: 2.25rem;
    padding: var(--spacing-small) var(--spacing-medium);
    border: 0;
    border-radius: var(--border-radius-medium);
    color: var(--semantic-colour-primary-fg);
    background: var(--semantic-colour-primary-bg);
    font-size: var(--typography-content-size);
    font-weight: var(--typography-content-emphasis);
    line-height: var(--typography-content-leading);
    cursor: pointer;
    user-select: none;
    transition:
        filter 160ms ease,
        opacity 160ms ease,
        background-color 160ms ease;
}

.m-button:hover:not(:disabled) {
    filter: brightness(0.94);
}

.m-button:active:not(:disabled) {
    filter: brightness(0.86);
}

.m-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.m-button--plain {
    color: var(--semantic-colour-label);
    background: transparent;
}

.m-button--secondary {
    color: var(--semantic-colour-secondary-fg);
    background: var(--semantic-colour-secondary-bg);
}

.m-button--ghost {
    color: inherit;
    background: transparent;
}

.m-button--compact {
    min-height: auto;
    padding: 0;
    border-radius: var(--border-radius-small);
}
</style>
