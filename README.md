# @millai/millai-ui

A small Vue 3 UI foundation for Millai products. It provides token-driven, iOS-inspired controls, layouts and responsive navigation primitives without a third-party component framework.

- Vue 3.5+, TypeScript-first, ES modules.
- Design tokens are exposed as CSS custom properties and applied explicitly; nothing touches `document` or `window` when the package is imported.
- Native elements first: every control is a real `<button>`, `<input>`, `<select>` or `<textarea>`, so keyboard, form and accessibility behaviour comes from the browser.

## Install and set up

```sh
pnpm add @millai/millai-ui
```

`vue` is a peer dependency. Import the stylesheet once and explicitly apply a theme during client start-up:

```ts
import { createApp } from 'vue';
import { LightTheme, setTheme } from '@millai/millai-ui';
import '@millai/millai-ui/styles.css';

setTheme(LightTheme);
createApp(App).mount('#app');
```

`@millai/millai-ui/styles.css` is **required**: it contains the base reset, the styles shared between controls and every component's own styles. Components read their colours, spacing and type from CSS custom properties, which `setTheme()` writes.

`setTheme()` is safe to import and call on the server: it only touches the document when one exists. Pass an element as its second argument to scope the tokens to that element instead of the document root.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { MButton, MFormField, MTextInput } from '@millai/millai-ui';

const name = ref('');
</script>

<template>
    <MFormField label="Name" description="Shown on your profile." required>
        <MTextInput v-model="name" />
    </MFormField>
    <MButton>Save</MButton>
</template>
```

## Components

All public components use the `M` prefix. Native attributes fall through to the underlying element unless noted.

### Typography and layout

| Component            | Notes                                                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MHeading`           | `level` 1–3 renders `<h1>`–`<h3>` with the matching token style.                                                                                                                        |
| `MText`              | `variant`: `content` \| `callout` \| `footnote` \| `small`; `as`: `p` \| `span` \| `small`.                                                                                             |
| `MHStack`, `MVStack` | Flex containers. `gap` and `padding` are separate and take a token (`xSmall`…`xLarge`, `none`), a pixel number or any CSS length. `MVStack` also has `alignment`; `MHStack` has `wrap`. |
| `MSpacer`            | Flexible gap inside a stack.                                                                                                                                                            |
| `MDivider`           | `<hr>`; `vertical` for use inside `MHStack`.                                                                                                                                            |

### Controls and forms

| Component           | Model                      | Notes                                                                                                                                                                                                                                                                                                                             |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MButton`           | –                          | `variant`: `primary` \| `secondary` \| `plain` \| `ghost`. Variants change colour only and every variant has the same box, so swapping variant (for example selected / unselected) never moves anything. `compact` removes the padding and minimum height for icon-only buttons. Native `type="button"` by default; slot content. |
| `MTextInput`        | `string`                   | `clearable` (default on), `clearLabel`, `disabled`, `readonly`, `type`. The clear control is a labelled `<button>` that is visible on touch devices. `class`/`style` go to the wrapper, everything else to the `<input>`.                                                                                                         |
| `MTextArea`         | `string`                   | `rows` defaults to 3; `disabled`, `readonly`.                                                                                                                                                                                                                                                                                     |
| `MSelect`           | `string \| number`         | Native `<select>`. `options: ChoiceOption[]`, `placeholder`, `disabled`. Number values keep their type.                                                                                                                                                                                                                           |
| `MCheckbox`         | `boolean` or an array      | With a `value` prop and an array model, several checkboxes share one model. `indeterminate`, `disabled`; label in the default slot.                                                                                                                                                                                               |
| `MSwitch`           | `boolean`                  | A native checkbox exposed as `role="switch"`. Give it a label in the slot or `aria-label`.                                                                                                                                                                                                                                        |
| `MRadio`            | `string \| number \| null` | Radios sharing a `v-model` form one group; `value` is required.                                                                                                                                                                                                                                                                   |
| `MSlider`           | `number`                   | Native range input: `min`, `max`, `step`, `disabled`.                                                                                                                                                                                                                                                                             |
| `MSegmentedControl` | `string \| number`         | A radio group: `options`, `label` (its accessible name), `disabled`. The `#option="{ option, selected }"` slot customises a segment, for example to add an icon.                                                                                                                                                                  |
| `MFormField`        | –                          | Wraps one control with a `label`, `description` and `error`. It links the label (`for`/`id`), `aria-describedby`, `aria-invalid` and `required` to the control automatically. Attributes you set on the control always win.                                                                                                       |

```ts
interface ChoiceOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
```

### Display and feedback

| Component            | Notes                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MCard`              | Surface container. `as`: `div` \| `section` \| `article` \| `aside`; `padding` (same values as stacks); `elevated`.                                                                                                                                                                                                           |
| `MBadge`             | Compact label. `tone`: `neutral` \| `accent` \| `success` \| `warning` \| `danger`.                                                                                                                                                                                                                                           |
| `MList`, `MListItem` | Grouped list (`variant="plain"` removes the card styling). `MListItem` slots: `leading`, default (title), `description`, `trailing`. A row is plain text, a `<button>` with `interactive`, or a link with `href`; `chevron` shows a disclosure arrow. Put form controls in the `trailing` slot only for non-interactive rows. |
| `MSpinner`           | Indeterminate `progressbar`. `size` in pixels, `label` (default "Loading"). Under `prefers-reduced-motion` it pulses instead of rotating.                                                                                                                                                                                     |
| `MProgress`          | Native `<progress>`: `value`, `max` (default 100). Name it with `aria-label`.                                                                                                                                                                                                                                                 |

### Navigation

| Component                    | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MNavigationView`            | Responsive shell, not a router: a side panel (`#sidepanel`) beside the content on medium and large widths, content plus a bottom bar (`#tab`) on compact widths. It starts and stops environment observation itself. Appearance hooks: the `contentPadding` prop (token, pixels or any CSS padding; `none` for no padding), `--m-navigation-view-background`, `--m-navigation-view-min-height`, `--m-side-panel-width` and `--m-side-panel-closed-width`; `class` and `style` go to the root. |
| `MSidePanel`                 | Collapsible side panel. `v-model` is the open state and is never overwritten at set-up. `title`, `label`, `collapsible`, `showOptions` (emits `options`). Stays in view while the page scrolls. Its content is laid out from the start edge (left in left-to-right text). Closing slides the panel out at its full width (it does not squash its contents) and leaves a narrow strip with the show/hide button, which never moves between states. The hidden panel is `inert`.                |
| `MSidePanelItem`, `MTabItem` | Selectable items. `id` and `label`; `#icon="{ active }"` takes any component, so you are not tied to one icon set. `MSidePanelItem` is its own component: a full-width button with its content aligned to the start, built on `MButton`; selection changes colours only, never size. It follows an enclosing `MTabView`, or you can drive it with `active` and `@select`.                                                                                                                     |
| `MTabView`                   | Bottom navigation bar that sticks to the bottom of the viewport and pads for the iOS safe area (add `viewport-fit=cover` to your viewport meta tag for that inset to apply). `v-model` is the selected item's `id`. It is a navigation container (`<nav>`, `aria-current="page"`), not an ARIA tabs widget.                                                                                                                                                                                   |

## Theme and environment

`LightTheme` is a typed `Theme` object. Use `setTheme(theme, element?)` to apply one, `themeToCssVariables(theme)` to inspect or test the generated variables without a document, and `useTheme()` for the shared, read-only reactive theme.

Token variables use these prefixes: `--typography-<name>-{size,leading,weight,emphasis}`, `--spacing-*`, `--border-radius-*`, `--system-colour-*`, `--semantic-colour-*`, `--elevation-*`, `--theme-colour` and `--blur`.

`useEnvironment()` exposes read-only responsive state: `colourScheme`, `pointer` (`fine` \| `coarse` \| `none`) and `size.width` / `size.height` (`compact` up to 440px, `medium` below 800px, `large` from 800px). Call `startEnvironment()` in browser-only code when you use it outside `MNavigationView`; it returns a function that releases the listeners. Calls are reference-counted.

## Development

```sh
pnpm install
pnpm dev          # demo and smoke-test page (src/App.vue, src/demo/)
pnpm type-check   # library, demo and tests
pnpm lint
pnpm test
pnpm build        # type-check, then library build into dist/ (index.js, styles.css, *.d.ts)
```
