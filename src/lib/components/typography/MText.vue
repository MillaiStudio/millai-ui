<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        variant?: 'content' | 'callout' | 'footnote' | 'small';
        as?: 'p' | 'span' | 'small';
    }>(),
    { variant: 'content' },
);

const tag = computed((): 'p' | 'span' | 'small' => {
    return props.as ?? (props.variant === 'small' ? 'small' : 'p');
});
</script>
<template>
    <component :is="tag" class="m-text" :class="`m-text--${variant}`">
        <slot />
    </component>
</template>
<style scoped>
.m-text {
    margin: 0;
    color: var(--semantic-colour-label);
    font-size: var(--m-text-size);
    line-height: var(--m-text-leading);
    font-weight: var(--m-text-weight);
}

.m-text--content {
    --m-text-size: var(--typography-content-size);
    --m-text-leading: var(--typography-content-leading);
    --m-text-weight: var(--typography-content-weight);
}

.m-text--callout {
    --m-text-size: var(--typography-callout-size);
    --m-text-leading: var(--typography-callout-leading);
    --m-text-weight: var(--typography-callout-weight);
}

.m-text--footnote {
    --m-text-size: var(--typography-footnote-size);
    --m-text-leading: var(--typography-footnote-leading);
    --m-text-weight: var(--typography-footnote-weight);
}

.m-text--small {
    --m-text-size: var(--typography-caption1-size);
    --m-text-leading: var(--typography-caption1-leading);
    --m-text-weight: var(--typography-caption1-weight);
}
</style>
