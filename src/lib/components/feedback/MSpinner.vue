<script setup lang="ts">
withDefaults(
    defineProps<{
        size?: number;
        label?: string;
    }>(),
    { size: 20, label: 'Loading' },
);
</script>

<template>
    <span class="m-spinner" role="progressbar" :aria-label="label" :style="{ '--m-spinner-size': `${size}px` }" />
</template>

<style scoped>
.m-spinner {
    display: inline-block;
    flex: none;
    width: var(--m-spinner-size);
    height: var(--m-spinner-size);
    border: calc(var(--m-spinner-size) / 8) solid var(--semantic-colour-separator);
    border-top-color: var(--theme-colour);
    border-radius: 50%;
    animation: m-spinner-rotate 800ms linear infinite;
}

@keyframes m-spinner-rotate {
    to {
        transform: rotate(360deg);
    }
}

@keyframes m-spinner-pulse {
    50% {
        opacity: 0.35;
    }
}

@media (prefers-reduced-motion: reduce) {
    .m-spinner {
        animation: m-spinner-pulse 1.6s ease-in-out infinite !important;
        animation-duration: 1.6s !important;
        animation-iteration-count: infinite !important;
    }
}
</style>
