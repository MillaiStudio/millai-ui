# タイポグラフィ

## MHeading

見出しを表示します。`level` に応じて `h1`、`h2`、`h3` を出力し、テーマのタイトル用トークンを適用します。

```vue
<MHeading :level="1">プロジェクト</MHeading>
<MHeading :level="2">概要</MHeading>
```

| Prop | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `level` | `1 \| 2 \| 3` | `1` | 出力する見出しレベル。 |

| Slot | 説明 |
| --- | --- |
| default | 見出しの内容。 |

## MText

本文や補足テキストを表示します。`variant` は文字サイズ・行高・ウェイトを選び、`as` は出力する要素を指定します。

```vue
<MText>本文です。</MText>
<MText variant="callout">注目させたい補足です。</MText>
<MText variant="footnote">小さな補足です。</MText>
```

| Prop | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `variant` | `'content' \| 'callout' \| 'footnote' \| 'small'` | `'content'` | 適用する文字スタイル。 |
| `as` | `'p' \| 'span' \| 'small'` | — | 出力する要素。未指定時は `small` バリアントだけ `<small>`、それ以外は `<p>`。 |

| Slot | 説明 |
| --- | --- |
| default | テキストの内容。 |
