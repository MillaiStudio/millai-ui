<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue';
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const checked = defineModel<boolean | Array<string | number>>({ default: false });

const props = withDefaults(
    defineProps<{
        value?: string | number;
        indeterminate?: boolean;
        disabled?: boolean;
    }>(),
    { value: undefined, indeterminate: false, disabled: false },
);

const { rootAttributes, controlAttributes } = useFormControl();
const input = useTemplateRef<HTMLInputElement>('input');

const syncIndeterminate = (): void => {
    if (input.value) {
        input.value.indeterminate = props.indeterminate;
    }
};

watchEffect(syncIndeterminate, { flush: 'post' });
</script>

<template>
    <label class="m-choice" :class="{ 'm-choice--disabled': disabled }" v-bind="rootAttributes()">
        <input ref="input" v-model="checked" type="checkbox" class="m-checkbox" v-bind="controlAttributes()"
            :value="value" :disabled="disabled" />
        <span v-if="$slots.default" class="m-choice__label">
            <slot />
        </span>
    </label>
</template>

<style scoped>
.m-checkbox {
    flex: none;
    appearance: none;
    width: 1.375rem;
    height: 1.375rem;
    margin: 0;
    border: 1.5px solid var(--semantic-colour-input-border);
    border-radius: var(--border-radius-medium);
    background: var(--semantic-colour-input-bg) center / 75% no-repeat;
    cursor: inherit;
    transition:
        background-color 120ms ease,
        border-color 120ms ease;
}

.m-checkbox:checked,
.m-checkbox:indeterminate {
    border-color: var(--theme-colour);
    background-color: var(--theme-colour);
}

.m-checkbox:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6.5'/%3E%3C/svg%3E");
}

.m-checkbox:indeterminate {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M4 8h8'/%3E%3C/svg%3E");
}
</style>
