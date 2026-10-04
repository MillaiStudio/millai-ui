<script setup lang="ts">
import { computed } from 'vue';
import { resolveSpace, type Space } from '../../util/spacing';

const props = withDefaults(
    defineProps<{
        gap?: Space;
        padding?: Space;
        alignment?: 'start' | 'centre' | 'end' | 'stretch';
    }>(),
    { gap: 'small', padding: 'none', alignment: 'centre' },
);

const style = computed(() => {
    return { gap: resolveSpace(props.gap), padding: resolveSpace(props.padding) };
});
</script>
<template>
    <div class="m-v-stack" :class="`m-v-stack--${alignment}`" :style="style"><slot /></div>
</template>
<style scoped>
.m-v-stack {
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.m-v-stack--start {
    align-items: flex-start;
}
.m-v-stack--centre {
    align-items: center;
}
.m-v-stack--end {
    align-items: flex-end;
}
.m-v-stack--stretch {
    align-items: stretch;
}
</style>
