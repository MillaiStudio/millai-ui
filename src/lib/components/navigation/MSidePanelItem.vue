<script setup lang="ts">
import { computed, inject } from 'vue';
import MButton from '../control/MButton.vue';
import { navigationContextKey } from './context.ts';

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
    <MButton variant="plain" class="m-side-panel-item" :class="{ 'm-side-panel-item--selected': selected }"
        :aria-current="selected ? 'page' : undefined" @click="select">
        <span v-if="$slots.icon" class="m-side-panel-item__icon">
            <slot name="icon" :active="selected" />
        </span>
        <span class="m-side-panel-item__label">{{ label }}</span>
    </MButton>
</template>

<style scoped>
.m-side-panel-item.m-side-panel-item {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    color: var(--semantic-colour-label);
    text-align: left;
}

.m-side-panel-item--selected.m-side-panel-item {
    color: var(--semantic-colour-selected-fg);
    background: var(--semantic-colour-selected-bg);
}

.m-side-panel-item__icon {
    display: inline-flex;
    flex: none;
    line-height: 0;
}

.m-side-panel-item__label {
    min-width: 0;
    text-align: left;
}
</style>
