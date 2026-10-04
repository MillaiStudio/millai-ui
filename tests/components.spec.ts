import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import MButton from '../src/lib/components/control/MButton.vue';
import MNavigationView from '../src/lib/components/navigation/MNavigationView.vue';
import MTextInput from '../src/lib/components/form/MTextInput.vue';
import MSidePanel from '../src/lib/components/navigation/MSidePanel.vue';
import MSidePanelItem from '../src/lib/components/navigation/MSidePanelItem.vue';
import MTabItem from '../src/lib/components/navigation/MTabItem.vue';
import MTabView from '../src/lib/components/navigation/MTabView.vue';

describe('MButton', () => {
    it('uses a non-submitting native button by default and honours disabled', () => {
        const wrapper = mount(MButton, { attrs: { disabled: true }, slots: { default: 'Save' } });
        expect(wrapper.get('button').attributes('type')).toBe('button');
        expect(wrapper.get('button').attributes('disabled')).toBeDefined();
    });
});

describe('MTextInput', () => {
    it('updates its model and clears using a labelled button', async () => {
        const value = ref('hello');

        const wrapper = mount(
            defineComponent({
                components: { MTextInput },
                setup: () => ({ value }),
                template: '<MTextInput v-model="value" aria-label="Name" />',
            }),
        );

        expect(wrapper.get('input').attributes('aria-label')).toBe('Name');
        await wrapper.get('button[aria-label="Clear input"]').trigger('click');
        expect(value.value).toBe('');
        await wrapper.get('input').setValue('Ada');
        expect(value.value).toBe('Ada');
    });
});

describe('navigation', () => {
    it('updates the selected model and selection context', async () => {
        const selected = ref('home');

        const wrapper = mount(
            defineComponent({
                components: { MTabView, MTabItem },
                setup: () => ({ selected }),
                template:
                    '<MTabView v-model="selected"><MTabItem id="home" label="Home" /><MTabItem id="settings" label="Settings" /></MTabView>',
            }),
        );

        expect(wrapper.get('button[aria-current="page"]').text()).toContain('Home');
        await wrapper.findAll('button')[1]?.trigger('click');
        expect(selected.value).toBe('settings');
        expect(wrapper.get('button[aria-current="page"]').text()).toContain('Settings');
    });

    it('does not mutate a false panel model during setup', () => {
        const visible = ref(false);

        mount(
            defineComponent({
                components: { MSidePanel },
                setup: () => ({ visible }),
                template: '<MSidePanel v-model="visible" />',
            }),
        );

        expect(visible.value).toBe(false);
    });
});

describe('MSidePanel toggle', () => {
    const mountPanel = (props: Record<string, unknown> = {}) => {
        const visible = ref(true);

        const wrapper = mount(
            defineComponent({
                components: { MSidePanel },
                setup: () => ({ visible, props }),
                template: '<MSidePanel v-model="visible" v-bind="props">Content</MSidePanel>',
            }),
        );

        return { wrapper, visible };
    };

    it('uses one button whose label and aria-expanded follow the state', async () => {
        const { wrapper, visible } = mountPanel();
        const toggle = wrapper.get('.m-side-panel__toggle button');
        expect(wrapper.findAll('.m-side-panel__toggle')).toHaveLength(1);
        expect(toggle.attributes('aria-label')).toBe('Hide side panel');
        expect(toggle.attributes('aria-expanded')).toBe('true');

        await toggle.trigger('click');
        expect(visible.value).toBe(false);
        expect(toggle.attributes('aria-label')).toBe('Show side panel');
        expect(toggle.attributes('aria-expanded')).toBe('false');

        await toggle.trigger('click');
        expect(visible.value).toBe(true);
    });

    it('keeps the panel in the DOM but inert while closed so it can slide', async () => {
        const { wrapper, visible } = mountPanel();
        expect(wrapper.get('aside').attributes('inert')).toBeUndefined();

        visible.value = false;
        await wrapper.vm.$nextTick();
        expect(wrapper.get('aside').attributes('inert')).toBeDefined();
        expect(wrapper.get('aside').text()).toContain('Content');
        expect(wrapper.classes()).toContain('m-side-panel--closed');
    });

    it('has no toggle when it is not collapsible', () => {
        const { wrapper } = mountPanel({ collapsible: false });
        expect(wrapper.find('.m-side-panel__toggle').exists()).toBe(false);
    });
});

describe('MButton box', () => {
    it('keeps the same box for every variant; only compact removes it', () => {
        for (const variant of ['primary', 'secondary', 'plain', 'ghost'] as const) {
            const classes = mount(MButton, { props: { variant } }).classes();
            expect(classes).not.toContain('m-button--compact');
        }

        const compact = mount(MButton, { props: { variant: 'ghost', compact: true } });
        expect(compact.classes()).toContain('m-button--compact');
        expect(compact.classes()).toContain('m-button--ghost');
    });
});

describe('MSidePanel content', () => {
    it('lays its content out from the start edge instead of centring or stretching it', () => {
        const wrapper = mount(MSidePanel, { slots: { default: '<button>Item</button>' } });
        const stack = wrapper.get('aside .m-v-stack');
        expect(stack.classes()).toContain('m-v-stack--start');
        expect(stack.classes()).not.toContain('m-v-stack--centre');
    });
});

describe('MNavigationView appearance', () => {
    it('applies content padding only when asked and resolves tokens', () => {
        const plain = mount(MNavigationView);
        expect(plain.get('main').attributes('style') ?? '').not.toContain(
            '--m-navigation-view-content-padding',
        );

        const none = mount(MNavigationView, { props: { contentPadding: 'none' } });
        expect(none.get('main').attributes('style')).toContain(
            '--m-navigation-view-content-padding: 0',
        );

        const token = mount(MNavigationView, { props: { contentPadding: 'large' } });
        expect(token.get('main').attributes('style')).toContain('var(--spacing-large)');
    });

    it('forwards class and style to its root so the page can be styled from outside', () => {
        const wrapper = mount(MNavigationView, {
            attrs: { class: 'mine', style: '--m-navigation-view-background: red' },
        });

        expect(wrapper.classes()).toContain('mine');
        expect(wrapper.attributes('style')).toContain('--m-navigation-view-background: red');
    });
});

describe('MSidePanelItem', () => {
    it('is a full-width, start-aligned button whose box does not depend on selection', async () => {
        const wrapper = mount(MSidePanelItem, {
            props: { id: 'a', label: 'Alpha', active: false },
        });
        const button = wrapper.get('button');
        const classesBefore = button.classes().filter((name) => !name.includes('selected'));

        await wrapper.setProps({ active: true });
        const classesAfter = button.classes().filter((name) => !name.includes('selected'));

        expect(classesAfter).toEqual(classesBefore);
        expect(button.classes()).toContain('m-side-panel-item');
        expect(button.classes()).not.toContain('m-button--compact');
        expect(button.classes()).toContain('m-button--ghost');
        expect(button.attributes('type')).toBe('button');
    });

    it('marks the selected item with aria-current and passes active to the icon slot', async () => {
        const wrapper = mount(MSidePanelItem, {
            props: { id: 'a', label: 'Alpha', active: true },
            slots: { icon: '<template #icon="{ active }"><i>{{ active }}</i></template>' },
        });

        expect(wrapper.get('button').attributes('aria-current')).toBe('page');
        expect(wrapper.get('.m-side-panel-item__icon').text()).toBe('true');

        await wrapper.setProps({ active: false });
        expect(wrapper.get('button').attributes('aria-current')).toBeUndefined();
        expect(wrapper.get('.m-side-panel-item__icon').text()).toBe('false');
    });

    it('emits select, and follows and updates a surrounding MTabView', async () => {
        const standalone = mount(MSidePanelItem, { props: { id: 'a', label: 'Alpha' } });
        await standalone.get('button').trigger('click');
        expect(standalone.emitted('select')).toEqual([['a']]);
        expect(standalone.find('.m-side-panel-item__icon').exists()).toBe(false);

        const selected = ref('b');

        const wrapper = mount(
            defineComponent({
                components: { MTabView, MSidePanelItem },
                setup: () => ({ selected }),
                template:
                    '<MTabView v-model="selected"><MSidePanelItem id="a" label="Alpha" /><MSidePanelItem id="b" label="Beta" /></MTabView>',
            }),
        );

        expect(wrapper.get('button[aria-current="page"]').text()).toBe('Beta');

        await wrapper.findAll('button')[0]?.trigger('click');
        expect(selected.value).toBe('a');
    });
});
