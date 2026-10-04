export type ColourScheme = 'light' | 'dark';

export type PointerType = 'fine' | 'coarse' | 'none';

export type DeviceSize = 'compact' | 'medium' | 'large';

export interface Environment {
    colourScheme: ColourScheme;
    pointer: PointerType;
    size: { width: DeviceSize; height: DeviceSize };
}
