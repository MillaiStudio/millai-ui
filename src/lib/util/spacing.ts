import { camelToKebab } from './string';

export type SpacingToken = 'none' | 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

export type Space = SpacingToken | number | string;

const themeSpacingTokens = ['xSmall', 'small', 'medium', 'large', 'xLarge'];

export const resolveSpace = (value: Space | undefined): string | undefined => {
    if (value === undefined) {
        return undefined;
    }

    if (typeof value === 'number') {
        return `${value}px`;
    }

    if (value === 'none') {
        return '0';
    }

    return themeSpacingTokens.includes(value) ? `var(--spacing-${camelToKebab(value)})` : value;
};
