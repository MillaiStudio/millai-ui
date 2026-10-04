<script setup lang="ts">
import { useFormControl } from './useFormControl';

defineOptions({ inheritAttrs: false });

const value = defineModel<string>({ default: '' });

withDefaults(defineProps<{ disabled?: boolean; readonly?: boolean }>(), {
    disabled: false,
    readonly: false,
});

const { rootAttributes, controlAttributes } = useFormControl();
</script>

<template>
    <span class="m-text-area" v-bind="rootAttributes()">
        <textarea
            v-model="value"
            rows="3"
            v-bind="controlAttributes()"
            :disabled="disabled"
            :readonly="readonly"
            class="m-field m-text-area__field"
        />
    </span>
</template>

<style scoped>
.m-text-area {
    display: inline-flex;
    min-width: 0;
}

.m-text-area__field {
    resize: vertical;
}
</style>
