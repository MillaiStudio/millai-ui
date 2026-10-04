import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import MCheckbox from '../src/lib/components/form/MCheckbox.vue';
import MFormField from '../src/lib/components/form/MFormField.vue';
import MRadio from '../src/lib/components/form/MRadio.vue';
import MSegmentedControl from '../src/lib/components/form/MSegmentedControl.vue';
import MSelect from '../src/lib/components/form/MSelect.vue';
import MSlider from '../src/lib/components/form/MSlider.vue';
import MSwitch from '../src/lib/components/form/MSwitch.vue';
import MTextArea from '../src/lib/components/form/MTextArea.vue';
import MTextInput from '../src/lib/components/form/MTextInput.vue';
import { mountTemplate } from './helpers.ts';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('MTextInput', () => {
    it('puts class and style on the root and every other attribute on the input', () => {
        const wrapper = mount(MTextInput, {
            attrs: {
                class: 'custom',
                style: 'margin: 1px',
                name: 'email',
                placeholder: 'you@example.com',
            },
        });

        expect(wrapper.classes()).toContain('custom');
        expect(wrapper.get('input').classes()).not.toContain('custom');
        expect(wrapper.get('input').attributes('name')).toBe('email');
        expect(wrapper.get('input').attributes('placeholder')).toBe('you@example.com');
    });

    it('hides the clear button when disabled, including when disabled changes after mount', async () => {
        const wrapper = mount(MTextInput, { props: { modelValue: 'hello' } });
        expect(wrapper.find('button').exists()).toBe(true);

        await wrapper.setProps({ disabled: true });
        expect(wrapper.find('button').exists()).toBe(false);
        expect(wrapper.get('input').attributes('disabled')).toBeDefined();

        await wrapper.setProps({ disabled: false, readonly: true });
        expect(wrapper.find('button').exists()).toBe(false);
        expect(wrapper.get('input').attributes('readonly')).toBeDefined();
    });

    it('does not show a clear button for an empty value or when clearable is off', async () => {
        const wrapper = mount(MTextInput, { props: { modelValue: '' } });
        expect(wrapper.find('button').exists()).toBe(false);

        await wrapper.setProps({ modelValue: 'text', clearable: false });
        expect(wrapper.find('button').exists()).toBe(false);
    });

    it('returns focus to the input after clearing', async () => {
        const { wrapper, model } = mountTemplate(
            '<MTextInput v-model="model.value" />',
            { value: 'abc' },
            { MTextInput },
        );
        await wrapper.get('button').trigger('click');

        expect(model.value).toBe('');
        expect(document.activeElement).toBe(wrapper.get('input').element);
    });
});

describe('MFormField', () => {
    it('links the label, description and error to the control', () => {
        const wrapper = mount({
            components: { MFormField, MTextInput },
            template:
                '<MFormField label="Email" description="We never share it." error="Required"><MTextInput /></MFormField>',
        });

        const input = wrapper.get('input');
        const label = wrapper.get('label');

        expect(label.attributes('for')).toBe(input.attributes('id'));
        expect(input.attributes('aria-invalid')).toBe('true');

        const describedBy = input.attributes('aria-describedby')?.split(' ') ?? [];
        expect(describedBy).toHaveLength(2);

        for (const id of describedBy) {
            expect(wrapper.find(`[id="${id}"]`).exists()).toBe(true);
        }

        expect(wrapper.text()).toContain('We never share it.');
        expect(wrapper.text()).toContain('Required');
    });

    it('stays valid and undescribed without a description or error', () => {
        const wrapper = mount({
            components: { MFormField, MTextInput },
            template: '<MFormField label="Name"><MTextInput /></MFormField>',
        });

        const input = wrapper.get('input');

        expect(input.attributes('aria-invalid')).toBeUndefined();
        expect(input.attributes('aria-describedby')).toBeUndefined();
    });

    it('marks the control required and lets explicit attributes win', () => {
        const wrapper = mount({
            components: { MFormField, MTextInput },
            template:
                '<MFormField label="Name" required><MTextInput id="mine" aria-describedby="extra" /></MFormField>',
        });

        const input = wrapper.get('input');

        expect(input.attributes('required')).toBeDefined();
        expect(input.attributes('id')).toBe('mine');
        expect(input.attributes('aria-describedby')).toBe('extra');
        expect(wrapper.get('label').attributes('for')).not.toBe('mine');
    });

    it('also wires MSelect and MTextArea', () => {
        const wrapper = mount({
            components: { MFormField, MSelect, MTextArea },
            template:
                '<div><MFormField label="A" error="x"><MSelect :options="[]" /></MFormField><MFormField label="B" error="y"><MTextArea /></MFormField></div>',
        });

        for (const control of [wrapper.get('select'), wrapper.get('textarea')]) {
            expect(control.attributes('aria-invalid')).toBe('true');
            expect(control.attributes('id')).toBeTruthy();
        }
    });
});

describe('MTextArea', () => {
    it('updates its model, defaults to three rows and lets rows be overridden', async () => {
        const { wrapper, model } = mountTemplate(
            '<MTextArea v-model="model.value" />',
            { value: '' },
            { MTextArea },
        );
        expect(wrapper.get('textarea').attributes('rows')).toBe('3');

        await wrapper.get('textarea').setValue('line one\nline two');
        expect(model.value).toBe('line one\nline two');

        const tall = mount(MTextArea, { attrs: { rows: 8 } });
        expect(tall.get('textarea').attributes('rows')).toBe('8');
    });
});

describe('MCheckbox', () => {
    it('toggles a boolean model and renders its label', async () => {
        const { wrapper, model } = mountTemplate(
            '<MCheckbox v-model="model.on">Subscribe</MCheckbox>',
            { on: false },
            { MCheckbox },
        );
        expect(wrapper.text()).toBe('Subscribe');

        await wrapper.get('input').setValue(true);
        expect(model.on).toBe(true);

        await wrapper.get('input').setValue(false);
        expect(model.on).toBe(false);
    });

    it('collects values in an array model shared between checkboxes', async () => {
        const { wrapper, model } = mountTemplate(
            '<div><MCheckbox v-model="model.picked" value="a" /><MCheckbox v-model="model.picked" value="b" /></div>',
            { picked: [] as string[] },
            { MCheckbox },
        );
        const [first, second] = wrapper.findAll<HTMLInputElement>('input');

        await second?.setValue(true);
        await first?.setValue(true);
        expect(model.picked).toEqual(['b', 'a']);

        await second?.setValue(false);
        expect(model.picked).toEqual(['a']);
    });

    it('keeps the indeterminate DOM property in sync with its prop', async () => {
        const wrapper = mount(MCheckbox, { props: { modelValue: false, indeterminate: true } });
        const input = wrapper.get('input').element;
        expect(input.indeterminate).toBe(true);

        await wrapper.setProps({ indeterminate: false });
        expect(input.indeterminate).toBe(false);
    });

    it('dims the label and disables the input when disabled', () => {
        const wrapper = mount(MCheckbox, { props: { disabled: true } });
        expect(wrapper.classes()).toContain('m-choice--disabled');
        expect(wrapper.get('input').attributes('disabled')).toBeDefined();
    });

    it('forwards native attributes to the input and class to the label', () => {
        const wrapper = mount(MCheckbox, { attrs: { name: 'terms', class: 'wide' } });
        expect(wrapper.element.tagName).toBe('LABEL');
        expect(wrapper.classes()).toContain('wide');
        expect(wrapper.get('input').attributes('name')).toBe('terms');
    });
});

describe('MSwitch', () => {
    it('is a native checkbox exposed as a switch and toggles its model', async () => {
        const { wrapper, model } = mountTemplate(
            '<MSwitch v-model="model.on" aria-label="Wi-Fi" />',
            { on: false },
            { MSwitch },
        );
        const input = wrapper.get('input');

        expect(input.attributes('type')).toBe('checkbox');
        expect(input.attributes('role')).toBe('switch');
        expect(input.attributes('aria-label')).toBe('Wi-Fi');
        expect(input.element.checked).toBe(false);

        await input.setValue(true);
        expect(model.on).toBe(true);
        expect(input.element.checked).toBe(true);
    });

    it('can be driven from the model side', async () => {
        const { wrapper, model } = mountTemplate(
            '<MSwitch v-model="model.on" />',
            { on: false },
            { MSwitch },
        );
        model.on = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.get('input').element.checked).toBe(true);
    });
});

describe('MRadio', () => {
    it('shares one model between radios and keeps value types', async () => {
        const { wrapper, model } = mountTemplate(
            '<div><MRadio v-model="model.choice" :value="1" name="n">One</MRadio><MRadio v-model="model.choice" :value="2" name="n">Two</MRadio></div>',
            { choice: null as number | null },
            { MRadio },
        );
        const [one, two] = wrapper.findAll<HTMLInputElement>('input');

        await two?.setValue(true);
        expect(model.choice).toBe(2);
        expect(two?.element.checked).toBe(true);
        expect(one?.element.checked).toBe(false);

        await one?.setValue(true);
        expect(model.choice).toBe(1);
    });
});

describe('MSelect', () => {
    const options = [
        { value: 'jp', label: 'Japan' },
        { value: 42, label: 'Numeric' },
        { value: 'us', label: 'United States', disabled: true },
    ];

    it('renders options, a placeholder and disabled options', () => {
        const wrapper = mount(MSelect, { props: { options, placeholder: 'Choose…' } });
        const rendered = wrapper.findAll('option');

        expect(rendered.map((option) => option.text())).toEqual([
            'Choose…',
            'Japan',
            'Numeric',
            'United States',
        ]);
        expect(rendered[0]?.attributes('disabled')).toBeDefined();
        expect(rendered[3]?.attributes('disabled')).toBeDefined();
    });

    it('updates its model and preserves numeric values', async () => {
        const { wrapper, model } = mountTemplate(
            '<MSelect v-model="model.value" :options="model.options" />',
            { value: '' as string | number, options },
            { MSelect },
        );

        await wrapper.get('select').setValue('jp');
        expect(model.value).toBe('jp');

        await wrapper.get('select').setValue('42');
        expect(model.value).toBe(42);
    });

    it('disables the whole control', () => {
        const wrapper = mount(MSelect, { props: { options, disabled: true } });
        expect(wrapper.get('select').attributes('disabled')).toBeDefined();
    });
});

describe('MSlider', () => {
    it('is a native range input with a numeric model', async () => {
        const { wrapper, model } = mountTemplate(
            '<MSlider v-model="model.volume" :min="0" :max="10" :step="0.5" aria-label="Volume" />',
            { volume: 2 },
            { MSlider },
        );
        const input = wrapper.get('input');

        expect(input.attributes('type')).toBe('range');
        expect(input.attributes('aria-label')).toBe('Volume');
        expect(input.attributes('step')).toBe('0.5');

        await input.setValue('7.5');
        expect(model.volume).toBe(7.5);
    });

    it('exposes the filled proportion as a CSS variable', async () => {
        const wrapper = mount(MSlider, { props: { modelValue: 25, min: 0, max: 100 } });
        expect(wrapper.get('input').attributes('style')).toContain('--m-slider-progress: 25%');

        await wrapper.setProps({ modelValue: 150 });
        expect(wrapper.get('input').attributes('style')).toContain('--m-slider-progress: 100%');

        await wrapper.setProps({ min: 10, max: 10 });
        expect(wrapper.get('input').attributes('style')).toContain('--m-slider-progress: 0%');
    });

    it('keeps class on the input and adds form-field wiring', () => {
        const wrapper = mount({
            components: { MFormField, MSlider },
            template: '<MFormField label="Gain"><MSlider class="wide" /></MFormField>',
        });

        const input = wrapper.get('input');

        expect(input.classes()).toContain('wide');
        expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'));
    });
});

describe('MSegmentedControl', () => {
    const options = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month', disabled: true },
    ];

    it('is a labelled radio group whose radios share one name', () => {
        const wrapper = mount(MSegmentedControl, {
            props: { modelValue: 'day', options, label: 'Range' },
        });

        const group = wrapper.get('[role="radiogroup"]');
        const radios = wrapper.findAll<HTMLInputElement>('input[type="radio"]');
        const names = new Set(radios.map((radio) => radio.attributes('name')));

        expect(group.attributes('aria-label')).toBe('Range');
        expect(radios).toHaveLength(3);
        expect(names.size).toBe(1);
        expect(radios[0]?.element.checked).toBe(true);
        expect(radios[2]?.attributes('disabled')).toBeDefined();
    });

    it('updates its model when another segment is chosen', async () => {
        const { wrapper, model } = mountTemplate(
            '<MSegmentedControl v-model="model.range" :options="model.options" label="Range" />',
            { range: 'day', options },
            { MSegmentedControl },
        );

        await wrapper.findAll('input')[1]?.setValue(true);
        expect(model.range).toBe('week');
    });

    it('passes the selected state to the option slot', () => {
        const wrapper = mount(MSegmentedControl, {
            props: { modelValue: 'week', options },
            slots: {
                option: '<template #option="{ option, selected }">{{ option.label }}:{{ selected }}</template>',
            },
        });

        const labels = wrapper.findAll('.m-segmented__label').map((label) => label.text());

        expect(labels).toEqual(['Day:false', 'Week:true', 'Month:false']);
    });

    it('disables every segment at once', () => {
        const wrapper = mount(MSegmentedControl, {
            props: { modelValue: 'day', options, disabled: true },
        });

        const disabled = wrapper
            .findAll('input')
            .map((input) => input.attributes('disabled') !== undefined);

        expect(disabled).toEqual([true, true, true]);
    });
});
