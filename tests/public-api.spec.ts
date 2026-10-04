import { describe, expect, it } from 'vitest';
import * as library from '../src/lib';

describe('public API', () => {
    it('exports exactly the intended runtime surface', () => {
        expect(Object.keys(library).sort()).toEqual(
            [
                'LightTheme',
                'MBadge',
                'MButton',
                'MCard',
                'MCheckbox',
                'MDivider',
                'MFormField',
                'MHStack',
                'MHeading',
                'MList',
                'MListItem',
                'MNavigationView',
                'MProgress',
                'MRadio',
                'MSegmentedControl',
                'MSelect',
                'MSidePanel',
                'MSidePanelItem',
                'MSlider',
                'MSpacer',
                'MSpinner',
                'MSwitch',
                'MTabItem',
                'MTabView',
                'MText',
                'MTextArea',
                'MTextInput',
                'MVStack',
                'applyTheme',
                'classifySize',
                'resolveColour',
                'setTheme',
                'startEnvironment',
                'themeToCssVariables',
                'updateEnvironment',
                'useEnvironment',
                'useTheme',
            ].sort(),
        );
    });

    it('uses the M prefix for every component', () => {
        const components = Object.keys(library).filter(
            (name) => /^[A-Z]/.test(name) && name !== 'LightTheme',
        );
        expect(components.every((name) => name.startsWith('M'))).toBe(true);
    });
});
