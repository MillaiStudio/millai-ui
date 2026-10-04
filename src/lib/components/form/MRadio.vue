<script setup lang="ts">
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const selected = defineModel<string | number | null>({ default: null });

withDefaults(defineProps<{ value: string | number; disabled?: boolean }>(), { disabled: false });

const { rootAttributes, controlAttributes } = useFormControl();
</script>

<template>
    <label class="m-choice" :class="{ 'm-choice--disabled': disabled }" v-bind="rootAttributes()">
        <input v-model="selected" type="radio" class="m-radio" v-bind="controlAttributes()" :value="value"
            :disabled="disabled" />
        <span v-if="$slots.default" class="m-choice__label">
            <slot />
        </span>
    </label>
</template>

<style scoped>
.m-radio {
    flex: none;
    appearance: none;
    width: 1.375rem;
    height: 1.375rem;
    margin: 0;
    border: 1.5px solid var(--semantic-colour-input-border);
    border-radius: 50%;
    background: var(--semantic-colour-input-bg);
    cursor: inherit;
    transition:
        background-color 120ms ease,
        border-color 120ms ease;
}

.m-radio:checked {
    border-color: var(--theme-colour);
    background: radial-gradient(circle, #fff 0 30%, transparent 34%), var(--theme-colour);
}
</style>
