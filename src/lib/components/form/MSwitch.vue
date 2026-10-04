<script setup lang="ts">
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const checked = defineModel<boolean>({ default: false });
withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });

const { rootAttributes, controlAttributes } = useFormControl();
</script>

<template>
    <label class="m-choice" :class="{ 'm-choice--disabled': disabled }" v-bind="rootAttributes()">
        <input
            v-model="checked"
            type="checkbox"
            role="switch"
            class="m-switch"
            v-bind="controlAttributes()"
            :disabled="disabled"
        />
        <span v-if="$slots.default" class="m-choice__label"><slot /></span>
    </label>
</template>

<style scoped>
.m-switch {
    --m-switch-width: 3.1875rem;
    --m-switch-height: 1.9375rem;
    --m-switch-inset: 0.125rem;
    --m-switch-knob: calc(var(--m-switch-height) - var(--m-switch-inset) * 2);

    position: relative;
    flex: none;
    appearance: none;
    width: var(--m-switch-width);
    height: var(--m-switch-height);
    margin: 0;
    border-radius: 999px;
    background: var(--semantic-colour-tertiary-bg);
    cursor: inherit;
    transition: background-color 200ms ease;
}

.m-switch::before {
    position: absolute;
    top: var(--m-switch-inset);
    left: var(--m-switch-inset);
    width: var(--m-switch-knob);
    height: var(--m-switch-knob);
    border-radius: 50%;
    background: #fff;
    box-shadow: var(--elevation-medium);
    content: '';
    transition: transform 200ms ease;
}

.m-switch:checked {
    background: var(--semantic-colour-success);
}

.m-switch:checked::before {
    transform: translateX(calc(var(--m-switch-width) - var(--m-switch-height)));
}
</style>
