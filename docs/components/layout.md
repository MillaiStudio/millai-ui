# レイアウト

余白に使える `Space` は、`'none'`、`'xSmall'`、`'small'`、`'medium'`、`'large'`、`'xLarge'`、ピクセル数、または任意の CSS 長です。トークン名はテーマの余白値に解決されます。

## MHStack

子要素を横方向に並べる flex コンテナです。

```vue
<MHStack gap="medium" wrap>
  <MButton>キャンセル</MButton>
  <MButton>保存</MButton>
</MHStack>
```

| Prop      | 型        | 既定値    | 説明                                      |
| --------- | --------- | --------- | ----------------------------------------- |
| `gap`     | `Space`   | `'small'` | 子要素間の余白。                          |
| `padding` | `Space`   | `'none'`  | コンテナ内側の余白。                      |
| `wrap`    | `boolean` | `false`   | `true` のとき、幅が足りなければ折り返す。 |

## MVStack

子要素を縦方向に並べる flex コンテナです。

```vue
<MVStack gap="large" alignment="stretch">
  <MHeading :level="2">設定</MHeading>
  <MText>項目を編集できます。</MText>
</MVStack>
```

| Prop        | 型                                          | 既定値     | 説明                 |
| ----------- | ------------------------------------------- | ---------- | -------------------- |
| `gap`       | `Space`                                     | `'small'`  | 子要素間の余白。     |
| `padding`   | `Space`                                     | `'none'`   | コンテナ内側の余白。 |
| `alignment` | `'start' \| 'centre' \| 'end' \| 'stretch'` | `'centre'` | 交差軸方向の配置。   |

## MSpacer

残りの空間を埋める flex アイテムです。属性・スロットはありません。`MHStack` 内で要素を挟むことで中央ぞろえにしたり、`MSpacer`を間に挟み込むことで要素同士の間隔を調整することに使います。

```vue
<MHStack>
  <MText as="span">戻る</MText>
  <MSpacer />
  <MButton compact aria-label="閉じる">×</MButton>
</MHStack>
```

## MDivider

区切り線を表示します。水平線は `<hr>` として出力されます。

```vue
<MDivider />
<MHStack style="height: 3rem">
  <MText as="span">左</MText>
  <MDivider vertical />
  <MText as="span">右</MText>
</MHStack>
```

| Prop       | 型        | 既定値  | 説明                                  |
| ---------- | --------- | ------- | ------------------------------------- |
| `vertical` | `boolean` | `false` | `true` のとき縦方向の区切り線にする。 |
