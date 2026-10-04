<script setup lang="ts">
withDefaults(defineProps<{ value: number; max?: number }>(), { max: 100 });
</script>

<template>
    <progress class="m-progress" :value="value" :max="max" />
</template>

<style scoped>
.m-progress {
    width: 100%;
    height: 0.375rem;
    border: 0;
    border-radius: 999px;
    appearance: none;
    overflow: hidden;
    background: var(--semantic-colour-tertiary-bg);
}

.m-progress::-webkit-progress-bar {
    background: var(--semantic-colour-tertiary-bg);
}

.m-progress::-webkit-progress-value {
    border-radius: 999px;
    background: var(--theme-colour);
    transition: width 200ms ease;
}

.m-progress::-moz-progress-bar {
    border-radius: 999px;
    background: var(--theme-colour);
}
</style>
