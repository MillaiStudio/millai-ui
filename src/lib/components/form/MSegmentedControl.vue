<script setup lang="ts">
import { useId } from 'vue';
import type { ChoiceOption } from './types';

const selected = defineModel<string | number>({ required: true });

withDefaults(
    defineProps<{
        options: ChoiceOption[];
        label?: string;
        disabled?: boolean;
    }>(),
    { label: undefined, disabled: false },
);

defineSlots<{
    option?(props: { option: ChoiceOption; selected: boolean }): unknown;
}>();

const name = useId();
</script>

<template>
    <div class="m-segmented" role="radiogroup" :aria-label="label">
        <label v-for="option in options" :key="option.value" class="m-segmented__option"
            :class="{ 'm-segmented__option--disabled': disabled || option.disabled }">
            <input v-model="selected" type="radio" class="m-segmented__input" :name="name" :value="option.value"
                :disabled="disabled || option.disabled" />
            <span class="m-segmented__label">
                <slot name="option" :option="option" :selected="selected === option.value">
                    {{ option.label }}
                </slot>
            </span>
        </label>
    </div>
</template>

<style scoped>
.m-segmented {
    display: inline-flex;
    gap: 2px;
    padding: 2px;
    border-radius: var(--border-radius-medium);
    background: var(--semantic-colour-tertiary-bg);
}

.m-segmented__option {
    position: relative;
    display: inline-flex;
    flex: 1 1 auto;
    cursor: pointer;
}

.m-segmented__option--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.m-segmented__input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    appearance: none;
    cursor: inherit;
}

.m-segmented__label {
    display: inline-flex;
    flex: 1 1 auto;
    gap: var(--spacing-x-small);
    align-items: center;
    justify-content: center;
    min-height: 1.75rem;
    padding: 0 var(--spacing-medium);
    border-radius: calc(var(--border-radius-medium) - 2px);
    color: var(--semantic-colour-label);
    font-size: var(--typography-subheading-size);
    line-height: var(--typography-subheading-leading);
    transition:
        background-color 160ms ease,
        box-shadow 160ms ease;
}

.m-segmented__input:checked+.m-segmented__label {
    background: var(--semantic-colour-surface);
    box-shadow: var(--elevation-low);
    font-weight: var(--typography-subheading-emphasis);
}

.m-segmented__input:focus-visible+.m-segmented__label {
    outline: 2px solid var(--theme-colour);
    outline-offset: 2px;
}
</style>
