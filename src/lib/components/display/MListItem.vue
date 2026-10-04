<script setup lang="ts">
import { ChevronRightIcon } from '@lucide/vue';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        href?: string;
        interactive?: boolean;
        chevron?: boolean;
        disabled?: boolean;
    }>(),
    { href: undefined, interactive: false, chevron: false, disabled: false },
);

defineSlots<{
    leading?(): unknown;
    default?(): unknown;
    description?(): unknown;
    trailing?(): unknown;
}>();

const tag = computed((): 'a' | 'button' | 'div' => {
    if (props.href && !props.disabled) {
        return 'a';
    }

    return props.interactive ? 'button' : 'div';
});
</script>

<template>
    <li class="m-list-item">
        <component :is="tag" class="m-list-item__row" :class="{
            'm-list-item__row--interactive': tag !== 'div',
            'm-list-item__row--disabled': disabled,
        }" :href="tag === 'a' ? href : undefined" :type="tag === 'button' ? 'button' : undefined"
            :disabled="tag === 'button' ? disabled : undefined"
            :aria-disabled="tag !== 'button' && disabled && interactive ? 'true' : undefined">
            <span v-if="$slots.leading" class="m-list-item__leading">
                <slot name="leading" />
            </span>
            <span class="m-list-item__content">
                <span class="m-list-item__title">
                    <slot />
                </span>
                <span v-if="$slots.description" class="m-list-item__description">
                    <slot name="description" />
                </span>
            </span>
            <span v-if="$slots.trailing" class="m-list-item__trailing">
                <slot name="trailing" />
            </span>
            <ChevronRightIcon v-if="chevron" aria-hidden="true" :size="16" class="m-list-item__chevron" />
        </component>
    </li>
</template>

<style scoped>
.m-list-item+.m-list-item {
    border-top: 1px solid var(--semantic-colour-separator);
}

.m-list-item__row {
    display: flex;
    gap: var(--spacing-small);
    align-items: center;
    width: 100%;
    min-height: 2.75rem;
    padding: var(--spacing-small) var(--spacing-medium);
    border: 0;
    color: var(--semantic-colour-label);
    background: transparent;
    font-size: var(--typography-content-size);
    line-height: var(--typography-content-leading);
    text-align: left;
    text-decoration: none;
}

.m-list-item__row--interactive {
    cursor: pointer;
    transition: background-color 120ms ease;
}

.m-list-item__row--interactive:hover:not(.m-list-item__row--disabled) {
    background: var(--semantic-colour-surface-tertiary);
}

.m-list-item__row--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.m-list-item__leading {
    display: inline-flex;
    flex: none;
    color: var(--semantic-colour-accent);
}

.m-list-item__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
}

.m-list-item__description {
    color: var(--semantic-colour-label2);
    font-size: var(--typography-footnote-size);
    line-height: var(--typography-footnote-leading);
}

.m-list-item__trailing {
    display: inline-flex;
    flex: none;
    gap: var(--spacing-small);
    align-items: center;
    color: var(--semantic-colour-label2);
}

.m-list-item__chevron {
    flex: none;
    color: var(--semantic-colour-label3);
}
</style>
