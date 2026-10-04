# テーマ API

MillaiUI の見た目は `Theme` オブジェクトから生成される CSS カスタムプロパティで決まります。組み込みの `LightTheme` をそのまま使うか、同じ形のテーマを渡して変更できます。

## LightTheme

標準のライトテーマです。

```ts
import { LightTheme, setTheme } from 'vue-millai-ui';

setTheme(LightTheme);
```

## setTheme

テーマを共有状態に設定し、指定要素または `document.documentElement` に CSS 変数を書き込みます。サーバー環境で対象要素を省略して呼び出しても安全です。

```ts
setTheme(theme);
setTheme(theme, document.querySelector('#app')!);
```

```ts
function setTheme(theme: Theme, target?: HTMLElement): void;
```

## useTheme

現在のテーマと、テーマ適用関数を取得する Composition API です。`theme` は読み取り専用の ref です。

```ts
const { theme, setTheme, applyTheme } = useTheme();

// 現在のテーマを別の要素にだけ適用する
applyTheme(theme.value, previewElement);
```

```ts
function useTheme(): {
    theme: Readonly<Ref<Theme>>;
    setTheme: typeof setTheme;
    applyTheme: (theme: Theme, target: HTMLElement) => void;
};
```

## themeToCssVariables

テーマを CSS カスタムプロパティのオブジェクトへ変換します。DOM を使わないため、テストやサーバー側の検証にも使えます。

```ts
const variables = themeToCssVariables(LightTheme);
// { '--theme-colour': '#007AFF', '--spacing-medium': '16px', ... }
```

```ts
function themeToCssVariables(theme: Theme): Record<string, string>;
```

## applyTheme と resolveColour

`applyTheme` は CSS プロパティを書き込める対象へテーマを適用します。`resolveColour` はテーマ内で使うシステムカラー名を対応する CSS 変数に変換します。`#`、`rgb()`、`rgba()`、`hsl()`、`hsla()` で始まる値はそのまま返します。

```ts
applyTheme(LightTheme, element.style);
resolveColour('blue'); // 'var(--system-colour-blue)'
```

```ts
function applyTheme(theme: Theme, target: Pick<CSSStyleDeclaration, 'setProperty'>): void;
function resolveColour(value: Colour): string;
```

## Theme の形

`Theme` は次のトークン群で構成されます。数値のサイズ・余白・角丸・ぼかしは、CSS 変数へ変換されると px になります。

```ts
interface Theme {
    themeColour: CssColour;
    blur: number;
    typography: Typography;
    spacing: Spacing;
    borderRadius: Radius;
    elevation: Elevation;
    systemColour: SystemColour;
    semanticColour: SemanticColour;
}
```

主な型は以下のとおりです。

| 型                | 内容                                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `TypographyToken` | `{ weight, size, leading, emphasis }`。文字のウェイト・サイズ・行高を数値で定義する。                                                        |
| `Typography`      | `hugeTitle`、`title1`〜`title3`、`headline`、`content`、`callout`、`subheading`、`footnote`、`caption1`、`caption2` の各 `TypographyToken`。 |
| `Spacing`         | `xSmall`、`small`、`medium`、`large`、`xLarge` の数値。                                                                                      |
| `Radius`          | `small`、`medium`、`large` の数値。                                                                                                          |
| `Elevation`       | `low`、`medium`、`high` の box-shadow 文字列。                                                                                               |
| `Colour`          | システムカラー名、または `#` / `rgb()` / `rgba()` / `hsl()` / `hsla()` 形式の CSS 色。                                                       |

## 生成される CSS 変数

`themeToCssVariables()` と `setTheme()` は、次のプレフィックスを使う変数を生成します。

| トークン       | CSS 変数の例                                               |
| -------------- | ---------------------------------------------------------- |
| 基調色・ぼかし | `--theme-colour`、`--blur`                                 |
| 文字組み       | `--typography-title1-size`、`--typography-content-leading` |
| 余白・角丸     | `--spacing-medium`、`--border-radius-large`                |
| 色             | `--system-colour-blue`、`--semantic-colour-card-bg`        |
| 影             | `--elevation-medium`                                       |

カスタムテーマは `LightTheme` を基に必要な値を置き換えることをお勧めします。

```ts
import { LightTheme, type Theme } from 'vue-millai-ui';

const brandTheme: Theme = {
    ...LightTheme,
    themeColour: '#5B5CE2',
    semanticColour: {
        ...LightTheme.semanticColour,
        accent: '#5B5CE2',
    },
};
```
