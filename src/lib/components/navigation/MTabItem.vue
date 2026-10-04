<script setup lang="ts">
import MNavigationItem from './MNavigationItem.vue';
defineProps<{ id: string; label: string }>();
defineEmits<{ select: [id: string] }>();
</script>
<template>
    <MNavigationItem :id="id" :label="label" @select="$emit('select', $event)"><template #icon="slotProps">
            <slot name="icon" v-bind="slotProps" />
        </template></MNavigationItem>
</template>
