import { describe, expect, it } from 'vitest';
import { LightTheme, setTheme, themeToCssVariables } from '../src/lib/theme';

describe('theme', () => {
    it('generates valid numeric typography properties and resolves semantic colours', () => {
        const variables = themeToCssVariables(LightTheme);
        expect(variables['--typography-content-weight']).toBe('400');
        expect(variables['--semantic-colour-primary-bg']).toBe('var(--system-colour-blue)');
    });

    it('only changes the document when a theme is explicitly set', () => {
        const target = document.createElement('div');
        setTheme(LightTheme, target);
        expect(target.style.getPropertyValue('--theme-colour')).toBe('#007AFF');
    });
});
