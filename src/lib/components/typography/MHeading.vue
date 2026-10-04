<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ level?: 1 | 2 | 3 }>(), { level: 1 });

const tag = computed((): string => {
    return `h${props.level}`;
});
</script>

<template>
    <component :is="tag" class="m-heading" :class="`m-heading--${level}`">
        <slot />
    </component>
</template>

<style scoped>
.m-heading {
    margin: 0;
    color: var(--semantic-colour-label);
    font-size: var(--m-heading-size);
    font-weight: var(--m-heading-weight);
    line-height: var(--m-heading-leading);
}

.m-heading--1 {
    --m-heading-size: var(--typography-title1-size);
    --m-heading-leading: var(--typography-title1-leading);
    --m-heading-weight: var(--typography-title1-emphasis);
}

.m-heading--2 {
    --m-heading-size: var(--typography-title2-size);
    --m-heading-leading: var(--typography-title2-leading);
    --m-heading-weight: var(--typography-title2-emphasis);
}

.m-heading--3 {
    --m-heading-size: var(--typography-title3-size);
    --m-heading-leading: var(--typography-title3-leading);
    --m-heading-weight: var(--typography-title3-emphasis);
}
</style>
