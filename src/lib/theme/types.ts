export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface TypographyToken {
    weight: FontWeight;
    size: number;
    leading: number;
    emphasis: FontWeight;
}

export type Typography = Record<
    | 'hugeTitle'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'headline'
    | 'content'
    | 'callout'
    | 'subheading'
    | 'footnote'
    | 'caption1'
    | 'caption2',
    TypographyToken
>;

export type Spacing = Record<'xSmall' | 'small' | 'medium' | 'large' | 'xLarge', number>;

export type Radius = Record<'small' | 'medium' | 'large', number>;

export type Elevation = Record<'low' | 'medium' | 'high', string>;

export type CssColour =
    `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hsla(${string})`;

export type SystemColourName =

        | 'red'
        | 'orange'
        | 'yellow'
        | 'green'
        | 'mint'
        | 'teal'
        | 'cyan'
        | 'blue'
        | 'indigo'
        | 'purple'
        | 'pink'
        | 'brown'
        | 'black'
        | 'gray'
        | 'gray1'
        | 'gray2'
        | 'gray3'
        | 'gray4'
        | 'gray5'
        | 'gray6';

export type SystemColour = Record<SystemColourName, CssColour>;

export type Colour = SystemColourName | CssColour;

export interface SemanticColour {
    label: Colour;
    label2: Colour;
    label3: Colour;
    placeholder: Colour;
    link: Colour;
    primaryFg: Colour;
    primaryBg: Colour;
    secondaryFg: Colour;
    secondaryBg: Colour;
    tertiaryFg: Colour;
    tertiaryBg: Colour;
    background: Colour;
    groupedBackground: Colour;
    surface: Colour;
    surfaceSecondary: Colour;
    surfaceTertiary: Colour;
    separator: Colour;
    separatorOpaque: Colour;
    success: Colour;
    warning: Colour;
    danger: Colour;
    info: Colour;
    accent: Colour;
    accentHover: Colour;
    selectedBg: Colour;
    selectedFg: Colour;
    overlay: Colour;
    backdrop: Colour;
    inputFg: Colour;
    inputBg: Colour;
    inputPlaceholder: Colour;
    inputBorder: Colour;
    cardFg: Colour;
    cardBg: Colour;
}

export interface Theme {
    themeColour: CssColour;
    blur: number;
    typography: Typography;
    spacing: Spacing;
    borderRadius: Radius;
    elevation: Elevation;
    systemColour: SystemColour;
    semanticColour: SemanticColour;
}
