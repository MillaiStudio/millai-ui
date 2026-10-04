<script setup lang="ts">
import { computed } from 'vue';
import { resolveSpace, type Space } from '../../util/spacing';

const props = withDefaults(
    defineProps<{
        as?: 'div' | 'section' | 'article' | 'aside';
        padding?: Space;
        elevated?: boolean;
    }>(),
    { as: 'div', padding: 'medium', elevated: false },
);

const paddingStyle = computed((): string | undefined => {
    return resolveSpace(props.padding);
});
</script>

<template>
    <component
        :is="as"
        class="m-card"
        :class="{ 'm-card--elevated': elevated }"
        :style="{ padding: paddingStyle }"
    >
        <slot />
    </component>
</template>

<style scoped>
.m-card {
    min-width: 0;
    border: 1px solid var(--semantic-colour-separator);
    border-radius: var(--border-radius-large);
    color: var(--semantic-colour-card-fg);
    background: var(--semantic-colour-card-bg);
}

.m-card--elevated {
    border-color: transparent;
    box-shadow: var(--elevation-medium);
}
</style>
