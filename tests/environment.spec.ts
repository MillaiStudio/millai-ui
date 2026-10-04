import { afterEach, describe, expect, it } from 'vitest';
import { classifySize, startEnvironment, useEnvironment } from '../src/lib/environment/environment';

describe('responsive sizing', () => {
    it.each([
        [440, 'compact'],
        [441, 'medium'],
        [799, 'medium'],
        [800, 'large'],
    ] as const)('classifies %i as %s', (width, expected) => {
        expect(classifySize(width)).toBe(expected);
    });
});

const originalMatchMedia = window.matchMedia;
const originalWidth = window.innerWidth;
const originalHeight = window.innerHeight;
const environment = useEnvironment();

const resizeTo = (width: number, height = 800): void => {
    Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
    window.dispatchEvent(new Event('resize'));
};

const installMatchMedia = (state: Record<string, boolean>) => {
    const listeners = new Map<string, Set<() => void>>();

    window.matchMedia = (query: string): MediaQueryList => {
        const queryListeners = listeners.get(query) ?? new Set<() => void>();
        listeners.set(query, queryListeners);

        return {
            get matches() {
                return state[query] ?? false;
            },
            addEventListener(_type: string, listener: () => void) {
                queryListeners.add(listener);
            },
            removeEventListener(_type: string, listener: () => void) {
                queryListeners.delete(listener);
            },
        } as unknown as MediaQueryList;
    };

    return {
        change(query: string) {
            for (const listener of listeners.get(query) ?? []) {
                listener();
            }
        },
        listenerCount() {
            let total = 0;

            for (const queryListeners of listeners.values()) {
                total += queryListeners.size;
            }

            return total;
        },
    };
};

afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerWidth', { value: originalWidth, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalHeight, configurable: true });
});

describe('startEnvironment', () => {
    it('follows window size while started and stops after being released', () => {
        installMatchMedia({});
        resizeTo(1200, 900);
        const stop = startEnvironment();
        expect(environment.value.size).toEqual({ width: 'large', height: 'large' });

        resizeTo(390, 700);
        expect(environment.value.size).toEqual({ width: 'compact', height: 'medium' });

        stop();
        resizeTo(1200, 900);
        expect(environment.value.size.width).toBe('compact');
    });

    it('keeps listening until every caller has released, and ignores repeated releases', () => {
        installMatchMedia({});
        resizeTo(1200);
        const first = startEnvironment();
        const second = startEnvironment();

        first();
        first();
        resizeTo(500);
        expect(environment.value.size.width).toBe('medium');

        second();
        resizeTo(1200);
        expect(environment.value.size.width).toBe('medium');
    });

    it('reacts to media query changes and releases those listeners too', () => {
        const state = {
            '(prefers-color-scheme: dark)': false,
            '(pointer: coarse)': false,
            '(pointer: fine)': true,
        };

        const media = installMatchMedia(state);
        const stop = startEnvironment();
        expect(environment.value.colourScheme).toBe('light');
        expect(environment.value.pointer).toBe('fine');
        expect(media.listenerCount()).toBe(3);

        state['(prefers-color-scheme: dark)'] = true;
        state['(pointer: coarse)'] = true;
        media.change('(prefers-color-scheme: dark)');
        expect(environment.value.colourScheme).toBe('dark');
        expect(environment.value.pointer).toBe('coarse');

        stop();
        expect(media.listenerCount()).toBe(0);
    });

    it('still works where matchMedia is unavailable', () => {
        Object.defineProperty(window, 'matchMedia', {
            value: undefined,
            writable: true,
            configurable: true,
        });

        resizeTo(600);
        const stop = startEnvironment();

        expect(environment.value.size.width).toBe('medium');
        expect(environment.value.colourScheme).toBe('light');
        expect(environment.value.pointer).toBe('none');
        stop();
    });
});
