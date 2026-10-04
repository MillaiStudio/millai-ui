<script setup lang="ts">
import { ChevronsUpDownIcon } from '@lucide/vue';
import type { ChoiceOption } from './types';
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const value = defineModel<string | number>({ default: '' });

withDefaults(
    defineProps<{
        options: ChoiceOption[];
        placeholder?: string;
        disabled?: boolean;
    }>(),
    { placeholder: undefined, disabled: false },
);

const { rootAttributes, controlAttributes } = useFormControl();
</script>

<template>
    <span class="m-select" v-bind="rootAttributes()">
        <select
            v-model="value"
            v-bind="controlAttributes()"
            :disabled="disabled"
            class="m-field m-select__control"
        >
            <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>
        <ChevronsUpDownIcon aria-hidden="true" :size="16" class="m-select__icon" />
    </span>
</template>

<style scoped>
.m-select {
    position: relative;
    display: inline-flex;
    min-width: 0;
}

.m-select__control {
    appearance: none;
    padding-right: calc(var(--spacing-small) * 4);
    cursor: pointer;
}

.m-select__icon {
    position: absolute;
    top: 50%;
    right: var(--spacing-small);
    transform: translateY(-50%);
    color: var(--semantic-colour-label2);
    pointer-events: none;
}
</style>
