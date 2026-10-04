<script setup lang="ts">
import { computed, provide, toRef, useId } from 'vue';
import { formFieldKey } from './context';

const props = withDefaults(
    defineProps<{
        label?: string;
        description?: string;
        error?: string;
        required?: boolean;
    }>(),
    { required: false },
);

const baseId = useId();
const controlId = `${baseId}-control`;
const descriptionId = `${baseId}-description`;
const errorId = `${baseId}-error`;

const describedByIds = (): string | undefined => {
    const ids: string[] = [];

    if (props.description) {
        ids.push(descriptionId);
    }

    if (props.error) {
        ids.push(errorId);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
};

provide(formFieldKey, {
    controlId,
    describedBy: computed(describedByIds),
    invalid: computed(() => Boolean(props.error)),
    required: toRef(props, 'required'),
});
</script>

<template>
    <div class="m-form-field">
        <label v-if="label || $slots.label" :for="controlId" class="m-form-field__label">
            <slot name="label">{{ label }}</slot>
            <span v-if="required" aria-hidden="true"> *</span>
        </label>
        <slot />
        <p v-if="description" :id="descriptionId" class="m-form-field__description">
            {{ description }}
        </p>
        <p v-if="error" :id="errorId" class="m-form-field__error">{{ error }}</p>
    </div>
</template>

<style scoped>
.m-form-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-x-small);
    min-width: 0;
}

.m-form-field__label {
    color: var(--semantic-colour-label2);
    font-size: var(--typography-footnote-size);
    line-height: var(--typography-footnote-leading);
}

.m-form-field__description,
.m-form-field__error {
    margin: 0;
    font-size: var(--typography-footnote-size);
    line-height: var(--typography-footnote-leading);
}

.m-form-field__description {
    color: var(--semantic-colour-label2);
}

.m-form-field__error {
    color: var(--semantic-colour-danger);
}
</style>
