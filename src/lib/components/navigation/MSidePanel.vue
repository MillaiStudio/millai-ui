<script setup lang="ts">
import { CircleEllipsis, PanelLeft } from '@lucide/vue';
import { computed } from 'vue';
import MButton from '../control/MButton.vue';
import MSpacer from '../layout/MSpacer.vue';
import MVStack from '../layout/MVStack.vue';

const visible = defineModel<boolean>({ default: true });
const props = withDefaults(
    defineProps<{ title?: string; collapsible?: boolean; showOptions?: boolean; label?: string }>(),
    { title: undefined, collapsible: true, showOptions: false, label: 'Side panel' },
);
defineEmits<{ options: [] }>();

const toggleLabel = computed(() => (visible.value ? 'Hide side panel' : 'Show side panel'));
</script>

<template>
    <div class="m-side-panel" :class="{ 'm-side-panel--closed': !visible }">
        <div class="m-side-panel__clip">
            <aside class="m-side-panel__body" :aria-label="props.label" :inert="!visible">
                <header class="m-side-panel__header">
                    <MSpacer />
                    <MButton v-if="showOptions" variant="ghost" aria-label="Panel options" @click="$emit('options')">
                        <CircleEllipsis aria-hidden="true" />
                    </MButton>
                </header>
                <MVStack alignment="stretch" gap="small">
                    <h2 v-if="title" class="m-side-panel__title">{{ title }}</h2>
                    <slot />
                </MVStack>
            </aside>
        </div>
        <!-- One button in one fixed place for both states, so it never moves when toggled. -->
        <div v-if="collapsible" class="m-side-panel__toggle">
            <MButton variant="ghost" :aria-label="toggleLabel" :aria-expanded="visible" @click="visible = !visible">
                <PanelLeft aria-hidden="true" />
            </MButton>
        </div>
    </div>
</template>

<style scoped>
.m-side-panel {
    --m-side-panel-open-width: var(--m-side-panel-width, 20rem);
    --m-side-panel-closed-width: 3.25rem;

    position: sticky;
    top: 0;
    z-index: 1;
    flex: 0 0 var(--m-side-panel-open-width);
    align-self: flex-start;
    width: var(--m-side-panel-open-width);
    height: 100dvh;
    transition:
        width 220ms ease,
        flex-basis 220ms ease;
}

.m-side-panel--closed {
    flex-basis: var(--m-side-panel-closed-width);
    width: var(--m-side-panel-closed-width);
}

.m-side-panel__clip {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.m-side-panel__body {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--m-side-panel-open-width);
    overflow-y: auto;
    padding: var(--spacing-medium);
    border-right: 1px solid var(--semantic-colour-separator);
    background: var(--semantic-colour-surface-secondary);
    transition: transform 220ms ease;
}

.m-side-panel--closed .m-side-panel__body {
    transform: translateX(-100%);
}

.m-side-panel__header {
    display: flex;
    align-items: center;
    min-height: 2.25rem;
    margin-bottom: var(--spacing-small);
}

.m-side-panel__title {
    margin: 0;
    color: var(--semantic-colour-label);
    font-size: var(--typography-title2-size);
    line-height: var(--typography-title2-leading);
}

.m-side-panel__toggle {
    position: absolute;
    top: var(--spacing-medium);
    left: var(--spacing-medium);
    display: flex;
    align-items: center;
    height: 2.25rem;
}
</style>
