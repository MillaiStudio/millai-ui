import { readonly, ref } from 'vue';
import type { ColourScheme, DeviceSize, Environment, PointerType } from './types';

export const classifySize = (size: number): DeviceSize => {
    if (size <= 440) {
        return 'compact';
    }

    return size < 800 ? 'medium' : 'large';
};

const watchedQueries = ['(prefers-color-scheme: dark)', '(pointer: coarse)', '(pointer: fine)'];

const serverEnvironment: Environment = {
    colourScheme: 'light',
    pointer: 'none',
    size: { width: 'large', height: 'large' },
};

const environment = ref<Environment>(serverEnvironment);
let stopListening: (() => void) | undefined;
let subscribers = 0;

const matches = (query: string): boolean => {
    return typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
};

const browserEnvironment = (): Environment => {
    if (typeof window === 'undefined') {
        return serverEnvironment;
    }

    const colourScheme: ColourScheme = matches('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    let pointer: PointerType = 'none';

    if (matches('(pointer: coarse)')) {
        pointer = 'coarse';
    } else if (matches('(pointer: fine)')) {
        pointer = 'fine';
    }

    return {
        colourScheme,
        pointer,
        size: { width: classifySize(window.innerWidth), height: classifySize(window.innerHeight) },
    };
};

export const updateEnvironment = (): void => {
    environment.value = browserEnvironment();
};

const listen = (): (() => void) => {
    const queries: MediaQueryList[] = [];

    if (typeof window.matchMedia === 'function') {
        for (const query of watchedQueries) {
            queries.push(window.matchMedia(query));
        }
    }

    window.addEventListener('resize', updateEnvironment, { passive: true });

    for (const query of queries) {
        query.addEventListener('change', updateEnvironment);
    }

    updateEnvironment();

    return (): void => {
        window.removeEventListener('resize', updateEnvironment);

        for (const query of queries) {
            query.removeEventListener('change', updateEnvironment);
        }
    };
};

const doNothing = (): void => {};

export const startEnvironment = (): (() => void) => {
    if (typeof window === 'undefined') {
        return doNothing;
    }

    if (!stopListening) {
        stopListening = listen();
    }

    subscribers += 1;
    let stopped = false;

    return (): void => {
        if (stopped) {
            return;
        }

        stopped = true;
        subscribers -= 1;

        if (subscribers === 0) {
            stopListening?.();
            stopListening = undefined;
        }
    };
};

export const useEnvironment = () => {
    return readonly(environment);
};

export type { Environment } from './types';
