<script setup lang="ts">
import { XIcon } from '@lucide/vue';
import { computed, useTemplateRef } from 'vue';
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const value = defineModel<string>({ default: '' });

const props = withDefaults(
    defineProps<{
        type?: string;
        clearable?: boolean;
        clearLabel?: string;
        disabled?: boolean;
        readonly?: boolean;
    }>(),
    { type: 'text', clearable: true, clearLabel: 'Clear input', disabled: false, readonly: false },
);

const { rootAttributes, controlAttributes } = useFormControl();
const input = useTemplateRef<HTMLInputElement>('input');

const canClear = computed((): boolean => {
    return props.clearable && value.value.length > 0 && !props.disabled && !props.readonly;
});

const clear = (): void => {
    value.value = '';
    input.value?.focus();
};
</script>

<template>
    <span class="m-text-input" v-bind="rootAttributes()">
        <input
            ref="input"
            v-model="value"
            v-bind="controlAttributes()"
            :type="type"
            :disabled="disabled"
            :readonly="readonly"
            class="m-field m-text-input__field"
        />
        <button
            v-if="canClear"
            type="button"
            class="m-text-input__clear"
            :aria-label="clearLabel"
            @click="clear"
        >
            <XIcon aria-hidden="true" :size="14" />
        </button>
    </span>
</template>

<style scoped>
.m-text-input {
    position: relative;
    display: inline-flex;
    min-width: 0;
}

.m-text-input__field {
    padding-right: calc(var(--spacing-small) * 4);
}

.m-text-input__clear {
    position: absolute;
    top: 50%;
    right: var(--spacing-small);
    display: inline-grid;
    place-items: center;
    width: 1.4rem;
    height: 1.4rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    transform: translateY(-50%);
    color: var(--semantic-colour-primary-fg);
    background: var(--system-colour-gray);
    cursor: pointer;
}
</style>
