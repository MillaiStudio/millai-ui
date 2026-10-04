<script setup lang="ts">
import { BellIcon, FileTextIcon, MusicIcon, SettingsIcon } from '@lucide/vue';
import { computed, ref } from 'vue';
import {
    MBadge,
    MCard,
    MCheckbox,
    MDivider,
    MFormField,
    MHeading,
    MHStack,
    MList,
    MListItem,
    MProgress,
    MRadio,
    MSegmentedControl,
    MSelect,
    MSlider,
    MSpinner,
    MSwitch,
    MText,
    MTextArea,
    MTextInput,
    MVStack,
} from '../lib';

const email = ref('');
const notes = ref('');
const region = ref('');
const volume = ref(60);
const notifications = ref(true);
const topics = ref<Array<string | number>>(['music']);
const plan = ref<string | number | null>('standard');
const range = ref<string | number>('week');

const regionOptions = [
    { value: 'jp', label: 'Japan' },
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe', disabled: true },
];

const topicOptions = [
    { value: 'music', label: 'Music' },
    { value: 'audio', label: 'Live audio' },
    { value: 'code', label: 'Code' },
];

const rangeOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
];

const emailError = computed((): string | undefined => {
    if (email.value === '' || email.value.includes('@')) {
        return undefined;
    }

    return 'Enter an email address that contains “@”.';
});

const optionValue = (option: { value: string | number }): string | number => option.value;

const areAllTopicsPicked = (): boolean => topics.value.length === topicOptions.length;

const setAllTopics = (next: boolean): void => {
    topics.value = next ? topicOptions.map(optionValue) : [];
};

const allTopics = computed({ get: areAllTopicsPicked, set: setAllTopics });
const someTopics = computed(() => topics.value.length > 0 && !areAllTopicsPicked());
</script>

<template>
    <MVStack alignment="stretch" gap="large" class="gallery">
        <MCard as="section" padding="large" aria-label="Text entry">
            <MVStack alignment="stretch" gap="medium">
                <MHeading :level="2">Text entry</MHeading>
                <MFormField
                    label="Email"
                    description="We only use it to send a sign-in link."
                    :error="emailError"
                    required
                >
                    <MTextInput v-model="email" type="email" placeholder="you@example.com" />
                </MFormField>
                <MFormField label="Notes" description="Optional.">
                    <MTextArea v-model="notes" placeholder="Anything we should know?" />
                </MFormField>
                <MFormField label="Region">
                    <MSelect
                        v-model="region"
                        :options="regionOptions"
                        placeholder="Choose a region"
                    />
                </MFormField>
                <MFormField label="Disabled">
                    <MTextInput model-value="Read only for now" disabled />
                </MFormField>
            </MVStack>
        </MCard>

        <MCard as="section" padding="large" aria-label="Choices">
            <MVStack alignment="stretch" gap="medium">
                <MHeading :level="2">Choices</MHeading>
                <MHStack gap="medium">
                    <MSwitch v-model="notifications">Notifications</MSwitch>
                    <MSwitch :model-value="false" disabled>Unavailable</MSwitch>
                </MHStack>
                <MDivider />
                <MVStack alignment="start" gap="small">
                    <MCheckbox v-model="allTopics" :indeterminate="someTopics"
                        >All topics</MCheckbox
                    >
                    <MCheckbox
                        v-for="topic in topicOptions"
                        :key="topic.value"
                        v-model="topics"
                        :value="topic.value"
                    >
                        {{ topic.label }}
                    </MCheckbox>
                </MVStack>
                <MDivider />
                <MHStack gap="medium" wrap>
                    <MRadio v-model="plan" value="free">Free</MRadio>
                    <MRadio v-model="plan" value="standard">Standard</MRadio>
                    <MRadio v-model="plan" value="studio" disabled>Studio</MRadio>
                </MHStack>
                <MSegmentedControl v-model="range" :options="rangeOptions" label="Range" />
                <MText variant="footnote"
                    >Plan: {{ plan }} · Range: {{ range }} · Topics:
                    {{ topics.join(', ') || 'none' }}</MText
                >
            </MVStack>
        </MCard>

        <MCard as="section" padding="large" aria-label="Values and progress">
            <MVStack alignment="stretch" gap="medium">
                <MHeading :level="2">Values and progress</MHeading>
                <MFormField :label="`Volume: ${volume}`">
                    <MSlider v-model="volume" />
                </MFormField>
                <MProgress :value="volume" aria-label="Volume level" />
                <MHStack gap="small">
                    <MSpinner />
                    <MText variant="footnote">Syncing…</MText>
                </MHStack>
            </MVStack>
        </MCard>

        <MCard as="section" padding="large" aria-label="Lists and badges">
            <MVStack alignment="stretch" gap="medium">
                <MHeading :level="2">Lists and badges</MHeading>
                <MHStack gap="small" wrap>
                    <MBadge>Neutral</MBadge>
                    <MBadge tone="accent">Accent</MBadge>
                    <MBadge tone="success">Live</MBadge>
                    <MBadge tone="warning">Draft</MBadge>
                    <MBadge tone="danger">Offline</MBadge>
                </MHStack>
                <MList>
                    <MListItem interactive chevron>
                        <template #leading><SettingsIcon :size="20" aria-hidden="true" /></template>
                        Settings
                        <template #description>Account and preferences</template>
                    </MListItem>
                    <MListItem interactive chevron>
                        <template #leading><MusicIcon :size="20" aria-hidden="true" /></template>
                        Sound library
                        <template #trailing><MBadge tone="accent">12</MBadge></template>
                    </MListItem>
                    <MListItem>
                        <template #leading><BellIcon :size="20" aria-hidden="true" /></template>
                        Notifications
                        <template #trailing
                            ><MSwitch :model-value="true" aria-label="Notifications"
                        /></template>
                    </MListItem>
                    <MListItem interactive disabled>
                        <template #leading><FileTextIcon :size="20" aria-hidden="true" /></template>
                        Export (unavailable)
                    </MListItem>
                </MList>
            </MVStack>
        </MCard>
    </MVStack>
</template>

<style scoped>
.gallery {
    max-width: 44rem;
}
</style>
