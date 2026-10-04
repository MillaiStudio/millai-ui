import { camelToKebab } from '../util/string';
import type { Colour, Theme } from './types';

const cssColourPattern = /^(#|rgba?\(|hsla?\()/;

export const resolveColour = (value: Colour): string => {
    return cssColourPattern.test(value) ? value : `var(--system-colour-${camelToKebab(value)})`;
};

const addTokens = <Tokens extends object>(
    variables: Record<string, string>,
    prefix: string,
    tokens: Tokens,
    format: (token: Tokens[keyof Tokens]) => string,
): void => {
    for (const [name, token] of Object.entries(tokens) as Array<[string, Tokens[keyof Tokens]]>) {
        variables[`${prefix}-${camelToKebab(name)}`] = format(token);
    }
};

const pixels = (value: number): string => {
    return `${value}px`;
};

const asIs = (value: string): string => {
    return value;
};

export const themeToCssVariables = (theme: Theme): Record<string, string> => {
    const variables: Record<string, string> = {
        '--theme-colour': theme.themeColour,
        '--blur': pixels(theme.blur),
    };

    for (const [name, token] of Object.entries(theme.typography)) {
        const prefix = `--typography-${camelToKebab(name)}`;
        variables[`${prefix}-size`] = pixels(token.size);
        variables[`${prefix}-leading`] = pixels(token.leading);
        variables[`${prefix}-weight`] = String(token.weight);
        variables[`${prefix}-emphasis`] = String(token.emphasis);
    }

    addTokens(variables, '--spacing', theme.spacing, pixels);
    addTokens(variables, '--border-radius', theme.borderRadius, pixels);
    addTokens(variables, '--system-colour', theme.systemColour, asIs);
    addTokens(variables, '--semantic-colour', theme.semanticColour, resolveColour);
    addTokens(variables, '--elevation', theme.elevation, asIs);

    return variables;
};

export const applyTheme = (
    theme: Theme,
    target: Pick<CSSStyleDeclaration, 'setProperty'>,
): void => {
    for (const [name, value] of Object.entries(themeToCssVariables(theme))) {
        target.setProperty(name, value);
    }
};
