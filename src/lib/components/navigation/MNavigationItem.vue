<script setup lang="ts">
import { computed, inject } from 'vue';
import { navigationContextKey } from './context';

const props = withDefaults(
    defineProps<{
        id: string;
        label: string;
        active?: boolean;
    }>(),
    { active: undefined },
);

const emit = defineEmits<{ select: [id: string] }>();
const context = inject(navigationContextKey, undefined);

const selected = computed((): boolean => {
    if (props.active !== undefined) {
        return props.active;
    }

    return context ? context.selected.value === props.id : false;
});

const select = (): void => {
    context?.select(props.id);
    emit('select', props.id);
};
</script>

<template>
    <button type="button" class="m-navigation-item" :class="{ 'm-navigation-item--selected': selected }"
        :aria-current="selected ? 'page' : undefined" @click="select">
        <span class="m-navigation-item__icon">
            <slot name="icon" :active="selected" />
        </span>
        <span class="m-navigation-item__label">{{ label }}</span>
    </button>
</template>

<style scoped>
.m-navigation-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-x-small);
    border: 0;
    border-radius: var(--border-radius-medium);
    color: var(--semantic-colour-label2);
    background: transparent;
    cursor: pointer;
    flex: 1;
    flex-direction: column;
    min-height: 3.5rem;
    padding: var(--spacing-x-small) var(--spacing-small);
}

.m-navigation-item__icon {
    display: inline-flex;
    line-height: 0;
}

.m-navigation-item__label {
    font-size: var(--typography-caption2-size);
    line-height: var(--typography-caption2-leading);
}

.m-navigation-item--selected {
    color: var(--semantic-colour-selected-fg);
    background: var(--semantic-colour-selected-bg);
}

.m-navigation-item--selected .m-navigation-item__label {
    color: inherit;
}
</style>
