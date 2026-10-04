import { readonly, ref } from 'vue';
import { applyTheme } from './converter';
import { LightTheme } from './default';
import type { Theme } from './types';

const currentTheme = ref<Theme>(LightTheme);

const applyThemeToElement = (theme: Theme, element: HTMLElement): void => {
    applyTheme(theme, element.style);
};

export const setTheme = (theme: Theme, target?: HTMLElement): void => {
    currentTheme.value = theme;

    const element =
        target ?? (typeof document === 'undefined' ? undefined : document.documentElement);

    if (element) {
        applyThemeToElement(theme, element);
    }
};

export const useTheme = () => {
    return { theme: readonly(currentTheme), setTheme, applyTheme: applyThemeToElement };
};

export { LightTheme } from './default';
export { applyTheme, resolveColour, themeToCssVariables } from './converter';
export type { Theme, TypographyToken, SemanticColour, Colour, FontWeight } from './types';
