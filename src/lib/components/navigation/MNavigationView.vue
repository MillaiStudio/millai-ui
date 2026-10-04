<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { startEnvironment, useEnvironment } from '../../environment/environment';

const environment = useEnvironment();
let stopEnvironment: (() => void) | undefined;

const sidebarMode = computed((): boolean => {
    return environment.value.size.width !== 'compact';
});

onMounted(() => {
    stopEnvironment = startEnvironment();
});

onUnmounted(() => {
    stopEnvironment?.();
});
</script>

<template>
    <div class="m-navigation-view" :class="{ 'm-navigation-view--compact': !sidebarMode }">
        <template v-if="sidebarMode">
            <slot name="sidepanel" />
            <main class="m-navigation-view__content">
                <slot />
            </main>
        </template>
        <template v-else>
            <main class="m-navigation-view__content">
                <slot />
            </main>
            <slot name="tab" />
        </template>
    </div>
</template>

<style scoped>
.m-navigation-view {
    display: flex;
    min-height: 100dvh;
    background: var(--semantic-colour-background);
}

.m-navigation-view__content {
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--spacing-x-large) var(--spacing-medium);
}

.m-navigation-view--compact {
    flex-direction: column;
}

.m-navigation-view--compact .m-navigation-view__content {
    padding-bottom: var(--spacing-large);
}
</style>
