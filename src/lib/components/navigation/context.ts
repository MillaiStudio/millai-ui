import type { InjectionKey, Ref } from 'vue';

export interface NavigationContext {
    selected: Readonly<Ref<string>>;
    select: (id: string) => void;
}

export const navigationContextKey: InjectionKey<NavigationContext> = Symbol('millai-navigation');
