<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import {
    LightTheme,
    MButton,
    MDivider,
    MHeading,
    MHStack,
    MNavigationView,
    MSpacer,
    MSidePanel,
    MSidePanelItem,
    MTabItem,
    MTabView,
    MText,
    MTextInput,
    MVStack,
    setTheme,
    type Theme,
    useTheme,
} from './lib/index.ts';
import {
    BoxesIcon,
    CheckIcon,
    HouseIcon,
    PaletteIcon,
    RotateCcwIcon,
    SlidersHorizontalIcon,
    SparklesIcon,
} from '@lucide/vue';
import ComponentGallery from './demo/ComponentGallery.vue';

const cloneTheme = (theme: Theme): Theme => {
    return structuredClone(theme);
};

const editableTheme = reactive<Theme>(cloneTheme(LightTheme));
const selectedView = ref<'playground' | 'components' | 'tokens'>('playground');
const sidePanelOpen = ref(true);
const exampleName = ref('Millai');
const { theme } = useTheme();

const semanticControls = [
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'label', label: 'Text' },
    { key: 'primaryBg', label: 'Primary' },
    { key: 'accent', label: 'Accent' },
] as const satisfies ReadonlyArray<{ key: keyof Theme['semanticColour']; label: string }>;

const applyEditedTheme = (nextTheme: Theme): void => {
    setTheme(nextTheme);
};

watch(editableTheme, applyEditedTheme, { deep: true, immediate: true });

const updateSemanticColour = (key: keyof Theme['semanticColour'], value: string): void => {
    editableTheme.semanticColour[key] = value as Theme['semanticColour'][typeof key];
};

const updateThemeColour = (value: string): void => {
    editableTheme.themeColour = value as Theme['themeColour'];
};

const resetTheme = (): void => {
    Object.assign(editableTheme, cloneTheme(LightTheme));
};

const viewTitles = {
    playground: {
        eyebrow: 'V1 COMPONENT LIBRARY',
        title: 'Live theme editor',
        summary: 'Change a token and inspect its effect across real library components.',
    },
    components: {
        eyebrow: 'V1 COMPONENT LIBRARY',
        title: 'Components',
        summary: 'Form controls, lists and feedback in their normal, invalid and disabled states.',
    },
    tokens: {
        eyebrow: 'V1 COMPONENT LIBRARY',
        title: 'Token inspector',
        summary: 'The reactive theme that every component reads.',
    },
} as const;

const greeting = computed((): string => {
    return exampleName.value.trim() || 'there';
});
</script>

<template>
    <MNavigationView>
        <template #sidepanel>
            <MSidePanel v-model="sidePanelOpen" title="Millai UI" label="Playground navigation">
                <MVStack alignment="start" gap="small">
                    <MText variant="footnote">DESIGN SYSTEM</MText>
                    <MSidePanelItem id="playground" label="Theme playground" :active="selectedView === 'playground'"
                        @select="selectedView = 'playground'">
                        <template #icon>
                            <PaletteIcon :size="18" aria-hidden="true" />
                        </template>
                    </MSidePanelItem>
                    <MSidePanelItem id="components" label="Components" :active="selectedView === 'components'"
                        @select="selectedView = 'components'">
                        <template #icon>
                            <BoxesIcon :size="18" aria-hidden="true" />
                        </template>
                    </MSidePanelItem>
                    <MSidePanelItem id="tokens" label="Token inspector" :active="selectedView === 'tokens'"
                        @select="selectedView = 'tokens'">
                        <template #icon>
                            <SlidersHorizontalIcon :size="18" aria-hidden="true" />
                        </template>
                    </MSidePanelItem>
                    <MDivider />
                    <MText variant="footnote">EDITING THEME</MText>
                    <MText as="span" variant="small">Every control writes CSS variables on the document root
                        immediately.</MText>
                </MVStack>
            </MSidePanel>
        </template>

        <template #tab>
            <MTabView v-model="selectedView" label="Playground sections">
                <MTabItem id="playground" label="Playground"><template #icon>
                        <PaletteIcon :size="20" aria-hidden="true" />
                    </template></MTabItem>
                <MTabItem id="components" label="Components"><template #icon>
                        <BoxesIcon :size="20" aria-hidden="true" />
                    </template>
                </MTabItem>
                <MTabItem id="tokens" label="Tokens"><template #icon>
                        <SlidersHorizontalIcon :size="20" aria-hidden="true" />
                    </template>
                </MTabItem>
            </MTabView>
        </template>

        <MVStack alignment="stretch" gap="large" class="page">
            <header class="page-header">
                <MVStack alignment="start" gap="xSmall">
                    <MText variant="footnote">{{ viewTitles[selectedView].eyebrow }}</MText>
                    <MHeading :level="1">{{ viewTitles[selectedView].title }}</MHeading>
                    <MText variant="callout">{{ viewTitles[selectedView].summary }}</MText>
                </MVStack>
                <MButton variant="secondary" @click="resetTheme">
                    <RotateCcwIcon :size="16" aria-hidden="true" /> Reset theme
                </MButton>
            </header>

            <template v-if="selectedView === 'playground'">
                <section class="workspace" aria-label="Theme editor and component preview">
                    <aside class="editor-panel">
                        <MVStack alignment="stretch" gap="medium">
                            <MHStack gap="small">
                                <PaletteIcon :size="20" aria-hidden="true" />
                                <MHeading :level="3">Colour tokens</MHeading>
                            </MHStack>
                            <label class="field-label">Theme colour
                                <MTextInput :model-value="editableTheme.themeColour" aria-label="Theme colour"
                                    @update:model-value="updateThemeColour" />
                            </label>
                            <label v-for="control in semanticControls" :key="control.key" class="field-label">{{
                                control.label }}
                                <MTextInput :model-value="editableTheme.semanticColour[control.key]"
                                    :aria-label="`${control.label} colour`"
                                    @update:model-value="updateSemanticColour(control.key, $event)" />
                            </label>
                            <MDivider />
                            <MHeading :level="3">Shape and type</MHeading>
                            <label class="range-label">Large radius
                                <output>{{ editableTheme.borderRadius.large }}px</output>
                                <input v-model.number="editableTheme.borderRadius.large" type="range" min="0"
                                    max="32" />
                            </label>
                            <label class="range-label">Content size
                                <output>{{ editableTheme.typography.content.size }}px</output>
                                <input v-model.number="editableTheme.typography.content.size" type="range" min="13"
                                    max="22" />
                            </label>
                            <label class="range-label">Backdrop blur <output>{{ editableTheme.blur }}px</output>
                                <input v-model.number="editableTheme.blur" type="range" min="0" max="32" />
                            </label>
                        </MVStack>
                    </aside>

                    <section class="preview-panel" aria-label="Component preview">
                        <MVStack alignment="stretch" gap="large">
                            <MHStack gap="small">
                                <SparklesIcon :size="20" aria-hidden="true" />
                                <MHeading :level="2">Component preview</MHeading>
                                <MSpacer /><span class="live-dot">Live</span>
                            </MHStack>
                            <article class="preview-card">
                                <MVStack alignment="stretch" gap="medium">
                                    <MVStack alignment="start" gap="xSmall">
                                        <MText variant="footnote">WELCOME BACK</MText>
                                        <MHeading :level="2">Hello, {{ greeting }}</MHeading>
                                        <MText>Try changing the background, surface, type scale and
                                            corner radius. This card only uses design tokens.</MText>
                                    </MVStack>
                                    <MTextInput v-model="exampleName" aria-label="Preview name"
                                        placeholder="Your name" />
                                    <MHStack gap="small" wrap>
                                        <MButton>
                                            <CheckIcon :size="17" aria-hidden="true" />
                                            Continue
                                        </MButton>
                                        <MButton variant="secondary">Secondary action</MButton>
                                        <MButton variant="plain">Plain action</MButton>
                                    </MHStack>
                                </MVStack>
                            </article>
                            <div class="token-strip">
                                <span>themeColour</span><code>{{ theme.themeColour }}</code>
                                <span>radius.large</span><code>{{ theme.borderRadius.large }}px</code>
                                <span>content.size</span><code>{{ theme.typography.content.size }}px</code>
                            </div>
                        </MVStack>
                    </section>
                </section>
            </template>

            <ComponentGallery v-else-if="selectedView === 'components'" />

            <section v-else class="inspector" aria-label="Token inspector">
                <MVStack alignment="stretch" gap="medium">
                    <MHStack gap="small">
                        <HouseIcon :size="20" aria-hidden="true" />
                        <MHeading :level="2">Current token values</MHeading>
                    </MHStack>
                    <MText>These values are the same reactive theme consumed by the preview and
                        written as CSS custom properties.</MText>
                    <dl class="token-list">
                        <div>
                            <dt>Theme colour</dt>
                            <dd>{{ theme.themeColour }}</dd>
                        </div>
                        <div>
                            <dt>Semantic background</dt>
                            <dd>{{ theme.semanticColour.background }}</dd>
                        </div>
                        <div>
                            <dt>Surface</dt>
                            <dd>{{ theme.semanticColour.surface }}</dd>
                        </div>
                        <div>
                            <dt>Content typography</dt>
                            <dd>
                                {{ theme.typography.content.size }}px /
                                {{ theme.typography.content.leading }}px /
                                {{ theme.typography.content.weight }}
                            </dd>
                        </div>
                        <div>
                            <dt>Spacing medium</dt>
                            <dd>{{ theme.spacing.medium }}px</dd>
                        </div>
                    </dl>
                </MVStack>
            </section>
        </MVStack>
    </MNavigationView>
</template>

<style scoped>
.page {
    width: min(100%, 76rem);
    margin: 0 auto;
}

.page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-medium);
}

.workspace {
    display: grid;
    grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr);
    gap: var(--spacing-large);
    align-items: start;
}

.editor-panel,
.preview-panel,
.inspector {
    padding: var(--spacing-large);
    border: 1px solid var(--semantic-colour-separator);
    border-radius: var(--border-radius-large);
    background: var(--semantic-colour-surface);
    box-shadow: var(--elevation-low);
}

.field-label,
.range-label {
    display: grid;
    gap: var(--spacing-x-small);
    color: var(--semantic-colour-label2);
    font-size: var(--typography-footnote-size);
    line-height: var(--typography-footnote-leading);
}

.field-label :deep(.m-text-input),
.field-label :deep(input) {
    width: 100%;
}

.range-label output {
    color: var(--semantic-colour-label);
    font-variant-numeric: tabular-nums;
}

.range-label input {
    width: 100%;
    accent-color: var(--theme-colour);
}

.preview-panel {
    min-height: 31rem;
    background: var(--semantic-colour-grouped-background);
}

.preview-card {
    padding: clamp(var(--spacing-medium), 5vw, var(--spacing-x-large));
    border-radius: var(--border-radius-large);
    color: var(--semantic-colour-card-fg);
    background: var(--semantic-colour-card-bg);
    box-shadow: var(--elevation-medium);
}

.live-dot {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-x-small);
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    color: var(--semantic-colour-success);
    background: color-mix(in srgb, var(--semantic-colour-success) 12%, transparent);
    font-size: var(--typography-caption1-size);
}

.live-dot::before {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: currentcolor;
    content: '';
}

.token-strip {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small) var(--spacing-medium);
    padding: var(--spacing-medium);
    border-radius: var(--border-radius-medium);
    color: var(--semantic-colour-label2);
    background: var(--semantic-colour-surface-tertiary);
    font-size: var(--typography-footnote-size);
}

.token-strip code {
    color: var(--semantic-colour-label);
}

.token-list {
    display: grid;
    gap: 1px;
    margin: 0;
    overflow: hidden;
    border: 1px solid var(--semantic-colour-separator);
    border-radius: var(--border-radius-medium);
    background: var(--semantic-colour-separator);
}

.token-list div {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-medium);
    padding: var(--spacing-medium);
    background: var(--semantic-colour-surface);
}

.token-list dt {
    color: var(--semantic-colour-label2);
}

.token-list dd {
    margin: 0;
    color: var(--semantic-colour-label);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

@media (max-width: 44rem) {
    .page-header {
        flex-direction: column;
    }

    .workspace {
        grid-template-columns: 1fr;
    }

    .editor-panel,
    .preview-panel,
    .inspector {
        padding: var(--spacing-medium);
    }

    .preview-panel {
        min-height: auto;
    }
}
</style>
