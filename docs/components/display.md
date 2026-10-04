# 表示とフィードバック

## MCard

背景、境界線、角丸を持つコンテナです。

```vue
<MCard as="section" padding="large" elevated>
  <MHeading :level="2">お知らせ</MHeading>
</MCard>
```

| Prop       | 型                                           | 既定値     | 説明                                                           |
| ---------- | -------------------------------------------- | ---------- | -------------------------------------------------------------- |
| `as`       | `'div' \| 'section' \| 'article' \| 'aside'` | `'div'`    | 出力する要素。                                                 |
| `padding`  | `Space`                                      | `'medium'` | 内側の余白。`Space` は[レイアウト](/components/layout)を参照。 |
| `elevated` | `boolean`                                    | `false`    | 境界線の代わりに影を適用する。                                 |

| Slot    | 説明           |
| ------- | -------------- |
| default | カードの内容。 |

## MBadge

短いステータスや分類を表示するバッジです。

```vue
<MBadge tone="success">完了</MBadge>
<MBadge tone="warning">確認中</MBadge>
```

| Prop   | 型                                                            | 既定値      | 説明           |
| ------ | ------------------------------------------------------------- | ----------- | -------------- |
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | バッジの色調。 |

| Slot    | 説明           |
| ------- | -------------- |
| default | バッジの内容。 |

## MList と MListItem

`MList` はリストの枠、`MListItem` は各行です。`MListItem` は通常の行のほか、`interactive` を指定したボタン、`href` を指定したリンクとして使えます。

```vue
<MList>
  <MListItem chevron href="/account">
    アカウント
    <template #description>プロフィールとセキュリティ</template>
  </MListItem>
  <MListItem interactive @click="signOut">
    ログアウト
  </MListItem>
</MList>
```

### MList

| Prop      | 型                     | 既定値      | 説明                                                     |
| --------- | ---------------------- | ----------- | -------------------------------------------------------- |
| `variant` | `'grouped' \| 'plain'` | `'grouped'` | `grouped` は角丸のある面に、`plain` は素のリストにする。 |

| Slot    | 説明                           |
| ------- | ------------------------------ |
| default | `MListItem` などのリスト項目。 |

### MListItem

| Prop          | 型        | 既定値  | 説明                                      |
| ------------- | --------- | ------- | ----------------------------------------- |
| `href`        | `string`  | —       | 指定時はリンクとして出力する。            |
| `interactive` | `boolean` | `false` | `href` がないとき、ボタンとして出力する。 |
| `chevron`     | `boolean` | `false` | 末尾に開示用の山形アイコンを表示する。    |
| `disabled`    | `boolean` | `false` | 操作を無効化し、見た目を抑える。          |

| Slot          | 説明                 |
| ------------- | -------------------- |
| default       | 行のタイトル。       |
| `leading`     | 先頭のアイコンなど。 |
| `description` | タイトル下の補足。   |
| `trailing`    | 末尾の値や操作。     |

## MSpinner

処理中を示す不定進捗インジケーターです。

```vue
<MSpinner :size="24" label="読み込み中" />
```

| Prop    | 型       | 既定値      | 説明                                         |
| ------- | -------- | ----------- | -------------------------------------------- |
| `size`  | `number` | `20`        | 直径（px）。                                 |
| `label` | `string` | `'Loading'` | `progressbar` に付与するアクセシブルな名前。 |

## MProgress

値が分かっている進捗を示すネイティブの `<progress>` です。アクセシブルな名前として `aria-label` を指定してください。

```vue
<MProgress :value="48" :max="100" aria-label="アップロードの進捗" />
```

| Prop    | 型       | 既定値 | 説明           |
| ------- | -------- | ------ | -------------- |
| `value` | `number` | 必須   | 現在の進捗値。 |
| `max`   | `number` | `100`  | 進捗の最大値。 |
