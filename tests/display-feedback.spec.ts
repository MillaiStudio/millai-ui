import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MBadge from '../src/lib/components/display/MBadge.vue';
import MCard from '../src/lib/components/display/MCard.vue';
import MList from '../src/lib/components/display/MList.vue';
import MListItem from '../src/lib/components/display/MListItem.vue';
import MProgress from '../src/lib/components/feedback/MProgress.vue';
import MSpinner from '../src/lib/components/feedback/MSpinner.vue';
import MDivider from '../src/lib/components/layout/MDivider.vue';

describe('MCard', () => {
    it('renders the requested element and resolves padding tokens', () => {
        const section = mount(MCard, { props: { as: 'section' }, slots: { default: 'Hello' } });
        expect(section.element.tagName).toBe('SECTION');
        expect(section.attributes('style')).toContain('padding: var(--spacing-medium)');

        const custom = mount(MCard, { props: { padding: 12 } });
        expect(custom.attributes('style')).toContain('padding: 12px');
    });

    it('marks elevated cards', () => {
        expect(mount(MCard, { props: { elevated: true } }).classes()).toContain('m-card--elevated');
        expect(mount(MCard).classes()).not.toContain('m-card--elevated');
    });
});

describe('MBadge', () => {
    it('defaults to the neutral tone and accepts the others', () => {
        expect(mount(MBadge).classes()).toContain('m-badge--neutral');
        expect(
            mount(MBadge, { props: { tone: 'danger' }, slots: { default: '3' } }).classes(),
        ).toContain('m-badge--danger');
    });
});

describe('MList and MListItem', () => {
    it('restores list semantics on the list', () => {
        const wrapper = mount(MList, { slots: { default: '<li>one</li>' } });
        expect(wrapper.element.tagName).toBe('UL');
        expect(wrapper.attributes('role')).toBe('list');
        expect(wrapper.classes()).toContain('m-list--grouped');
    });

    it('renders a plain row by default, a button when interactive and a link with href', () => {
        const plain = mount(MListItem, { slots: { default: 'Plain' } });
        expect(plain.find('button, a').exists()).toBe(false);

        const button = mount(MListItem, {
            props: { interactive: true },
            slots: { default: 'Action' },
        });

        expect(button.get('button').attributes('type')).toBe('button');

        const link = mount(MListItem, {
            props: { href: '/settings' },
            slots: { default: 'Settings' },
        });

        expect(link.get('a').attributes('href')).toBe('/settings');
    });

    it('lets clicks on an interactive row reach listeners on the item', async () => {
        let clicks = 0;

        const wrapper = mount(MListItem, {
            props: { interactive: true },
            attrs: {
                onClick() {
                    clicks += 1;
                },
            },
            slots: { default: 'Action' },
        });

        await wrapper.get('button').trigger('click');
        expect(clicks).toBe(1);
    });

    it('disables an interactive button row and stops a disabled link being followed', () => {
        const button = mount(MListItem, { props: { interactive: true, disabled: true } });
        expect(button.get('button').attributes('disabled')).toBeDefined();

        const link = mount(MListItem, { props: { href: '/x', disabled: true, interactive: true } });
        expect(link.find('a').exists()).toBe(false);
        expect(link.get('button').attributes('disabled')).toBeDefined();
    });

    it('renders leading, description and trailing slots, and a hidden chevron', () => {
        const wrapper = mount(MListItem, {
            props: { chevron: true },
            slots: { leading: 'L', default: 'Title', description: 'Details', trailing: 'T' },
        });

        expect(wrapper.get('.m-list-item__leading').text()).toBe('L');
        expect(wrapper.get('.m-list-item__title').text()).toBe('Title');
        expect(wrapper.get('.m-list-item__description').text()).toBe('Details');
        expect(wrapper.get('.m-list-item__trailing').text()).toBe('T');
        expect(wrapper.get('.m-list-item__chevron').attributes('aria-hidden')).toBe('true');
    });

    it('omits empty slot wrappers', () => {
        const wrapper = mount(MListItem, { slots: { default: 'Only title' } });
        expect(wrapper.find('.m-list-item__leading').exists()).toBe(false);
        expect(wrapper.find('.m-list-item__description').exists()).toBe(false);
        expect(wrapper.find('.m-list-item__trailing').exists()).toBe(false);
        expect(wrapper.find('.m-list-item__chevron').exists()).toBe(false);
    });
});

describe('MSpinner', () => {
    it('is an indeterminate, named progressbar with a configurable size', () => {
        const wrapper = mount(MSpinner, { props: { size: 32, label: 'Saving' } });
        expect(wrapper.attributes('role')).toBe('progressbar');
        expect(wrapper.attributes('aria-label')).toBe('Saving');
        expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
        expect(wrapper.attributes('style')).toContain('--m-spinner-size: 32px');
    });

    it('defaults to a "Loading" label', () => {
        expect(mount(MSpinner).attributes('aria-label')).toBe('Loading');
    });
});

describe('MProgress', () => {
    it('is a native progress element and forwards its accessible name', () => {
        const wrapper = mount(MProgress, {
            props: { value: 30 },
            attrs: { 'aria-label': 'Upload' },
        });

        expect(wrapper.element.tagName).toBe('PROGRESS');
        expect(wrapper.attributes('aria-label')).toBe('Upload');
        expect(wrapper.attributes('max')).toBe('100');
        expect((wrapper.element as HTMLProgressElement).value).toBe(30);
    });

    it('honours a custom maximum', () => {
        const wrapper = mount(MProgress, { props: { value: 2, max: 4 } });
        expect((wrapper.element as HTMLProgressElement).position).toBe(0.5);
    });
});

describe('MDivider', () => {
    it('is horizontal by default and announces vertical orientation when asked', () => {
        const horizontal = mount(MDivider);
        expect(horizontal.element.tagName).toBe('HR');
        expect(horizontal.attributes('aria-orientation')).toBeUndefined();

        const vertical = mount(MDivider, { props: { vertical: true } });
        expect(vertical.attributes('aria-orientation')).toBe('vertical');
        expect(vertical.classes()).toContain('m-divider--vertical');
    });
});
