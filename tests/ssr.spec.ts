import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';

describe('server imports', () => {
    it('imports theme and environment modules without browser globals', async () => {
        await expect(import('../src/lib/theme')).resolves.toBeDefined();
        await expect(import('../src/lib/environment/environment')).resolves.toBeDefined();
    });

    it('imports the whole public entry in Node', async () => {
        await expect(import('../src/lib')).resolves.toBeDefined();
    });
});

describe('server rendering', () => {
    it('renders form, display and feedback components to HTML without browser globals', async () => {
        const { MBadge, MFormField, MList, MListItem, MSelect, MSpinner, MSwitch, MTextInput } =
            await import('../src/lib');

        const app = createSSRApp({
            render() {
                return h('div', [
                    h(
                        MFormField,
                        { label: 'Name', error: 'Required' },
                        { default: () => h(MTextInput, { modelValue: 'Ada' }) },
                    ),
                    h(MSelect, { options: [{ value: 'a', label: 'A' }], modelValue: 'a' }),
                    h(MSwitch, { modelValue: true }),
                    h(MBadge, null, { default: () => 'New' }),
                    h(MSpinner),
                    h(MList, null, {
                        default: () =>
                            h(MListItem, { interactive: true }, { default: () => 'Row' }),
                    }),
                ]);
            },
        });

        const html = await renderToString(app);

        expect(html).toContain('aria-invalid="true"');
        expect(html).toContain('role="switch"');
        expect(html).toContain('role="progressbar"');
        expect(html).toContain('<button');
    });
});
