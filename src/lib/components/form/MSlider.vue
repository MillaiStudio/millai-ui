<script setup lang="ts">
import { computed } from 'vue';
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const value = defineModel<number>({ default: 0 });
const props = withDefaults(
    defineProps<{ min?: number; max?: number; step?: number; disabled?: boolean }>(),
    { min: 0, max: 100, step: 1, disabled: false },
);

const { allAttributes } = useFormControl();

const progress = computed((): number => {
    const span = props.max - props.min;

    if (span <= 0) {
        return 0;
    }

    return Math.min(100, Math.max(0, ((value.value - props.min) / span) * 100));
});
</script>

<template>
    <input
        v-model.number="value"
        type="range"
        class="m-slider"
        v-bind="allAttributes()"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :style="{ '--m-slider-progress': `${progress}%` }"
    />
</template>

<style scoped>
.m-slider {
    --m-slider-track: 0.25rem;
    --m-slider-thumb: 1.5rem;

    width: 100%;
    min-width: 0;
    height: 1.75rem;
    margin: 0;
    appearance: none;
    background: transparent;
    cursor: pointer;
}

.m-slider:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.m-slider::-webkit-slider-runnable-track {
    height: var(--m-slider-track);
    border-radius: 999px;
    background: linear-gradient(
        to right,
        var(--theme-colour) var(--m-slider-progress),
        var(--semantic-colour-tertiary-bg) var(--m-slider-progress)
    );
}

.m-slider::-webkit-slider-thumb {
    width: var(--m-slider-thumb);
    height: var(--m-slider-thumb);
    margin-top: calc((var(--m-slider-track) - var(--m-slider-thumb)) / 2);
    border: 0;
    border-radius: 50%;
    appearance: none;
    background: #fff;
    box-shadow: var(--elevation-medium);
}

.m-slider::-moz-range-track {
    height: var(--m-slider-track);
    border-radius: 999px;
    background: var(--semantic-colour-tertiary-bg);
}

.m-slider::-moz-range-progress {
    height: var(--m-slider-track);
    border-radius: 999px;
    background: var(--theme-colour);
}

.m-slider::-moz-range-thumb {
    width: var(--m-slider-thumb);
    height: var(--m-slider-thumb);
    border: 0;
    border-radius: 50%;
    background: #fff;
    box-shadow: var(--elevation-medium);
}
</style>
