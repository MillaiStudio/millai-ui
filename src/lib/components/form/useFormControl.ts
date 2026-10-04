import { inject, useAttrs } from 'vue';
import { formFieldKey } from './context';

type Attributes = Record<string, unknown>;

const joinIds = (first: unknown, second: string | undefined): string | undefined => {
    const ids = [typeof first === 'string' ? first : undefined, second].filter(Boolean);
    return ids.length > 0 ? ids.join(' ') : undefined;
};

/**
 * Splits fallthrough attributes for controls that wrap a native element (`inheritAttrs: false`):
 * `class` and `style` belong on the component's root, everything else on the native control.
 * When the control sits inside an `MFormField`, its id, `aria-describedby`, `aria-invalid`
 * and `required` are wired up automatically; explicit attributes always win.
 *
 * These are functions rather than computed values on purpose: `attrs` is not reactive,
 * so they must be evaluated during render.
 */
export const useFormControl = () => {
    const attrs = useAttrs();
    const field = inject(formFieldKey, undefined);

    const rootAttributes = (): Attributes => {
        return { class: attrs.class, style: attrs.style };
    };

    const controlAttributes = (): Attributes => {
        const result: Attributes = {};

        for (const [name, value] of Object.entries(attrs)) {
            if (name !== 'class' && name !== 'style') {
                result[name] = value;
            }
        }

        if (field) {
            result.id = attrs.id ?? field.controlId;
            result['aria-describedby'] = joinIds(
                attrs['aria-describedby'],
                field.describedBy.value,
            );

            if (field.invalid.value && attrs['aria-invalid'] === undefined) {
                result['aria-invalid'] = 'true';
            }

            if (field.required.value && attrs.required === undefined) {
                result.required = true;
            }
        }

        return result;
    };

    const allAttributes = (): Attributes => {
        return { ...rootAttributes(), ...controlAttributes() };
    };

    return { rootAttributes, controlAttributes, allAttributes };
};
