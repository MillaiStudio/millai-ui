import { mount } from '@vue/test-utils';
import { defineComponent, reactive, type Component } from 'vue';

export const mountTemplate = <State extends object>(
    template: string,
    state: State,
    components: Record<string, Component>,
) => {
    const model = reactive(state) as State;

    const wrapper = mount(
        defineComponent({
            components,
            setup() {
                return { model };
            },
            template,
        }),
        { attachTo: document.body },
    );

    return { wrapper, model };
};
