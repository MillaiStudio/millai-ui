import type { InjectionKey, Ref } from 'vue';

/** What `MFormField` tells the control placed inside it. */
export interface FormFieldContext {
    controlId: string;
    describedBy: Readonly<Ref<string | undefined>>;
    invalid: Readonly<Ref<boolean>>;
    required: Readonly<Ref<boolean>>;
}

export const formFieldKey: InjectionKey<FormFieldContext> = Symbol('millai-form-field');
