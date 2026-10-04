<script setup lang="ts">
import { computed } from 'vue';
import { resolveSpace, type Space } from '../../util/spacing';

const props = withDefaults(defineProps<{ gap?: Space; padding?: Space; wrap?: boolean }>(), {
    gap: 'small',
    padding: 'none',
    wrap: false,
});

const style = computed(() => {
    return { gap: resolveSpace(props.gap), padding: resolveSpace(props.padding) };
});
</script>
<template>
    <div class="m-h-stack" :class="{ 'm-h-stack--wrap': wrap }" :style="style"><slot /></div>
</template>
<style scoped>
.m-h-stack {
    display: flex;
    align-items: center;
    min-width: 0;
}
.m-h-stack--wrap {
    flex-wrap: wrap;
}
</style>
