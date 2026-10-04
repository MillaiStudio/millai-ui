# フォームと操作

`MTextInput`、`MTextArea`、`MSelect`、`MCheckbox`、`MSwitch`、`MRadio`、`MSlider` はネイティブの入力要素を基にしています。`class` と `style` は外側のラッパーに、それ以外の HTML 属性は入力要素に渡されます。

`MFormField` の中で使うと、ラベルと説明・エラーの ARIA 関連付けが自動で行われます。

## MButton

ネイティブの `<button>` を出力します。`type` の既定値は安全な `button` です。

```vue
<MButton @click="save">保存</MButton>
<MButton variant="secondary">あとで</MButton>
<MButton variant="ghost" compact aria-label="閉じる">×</MButton>
```

| Prop | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'plain' \| 'ghost'` | `'primary'` | 配色バリエーション。 |
| `compact` | `boolean` | `false` | 余白と最小高さをなくす。アイコンのみのボタンに便利。 |
| `type` | `ButtonHTMLAttributes['type']` | `'button'` | ネイティブボタンの type。 |

`disabled`、`aria-label`、`@click` などのネイティブ属性・イベントも利用できます。

## MFormField

入力欄にラベル、説明、エラーを付けます。内部の対応コントロールへ `id`、`aria-describedby`、`aria-invalid`、`required` を渡します。

```vue
<MFormField label="表示名" description="公開プロフィールに表示されます。" required>
  <MTextInput v-model="displayName" />
</MFormField>
```

| Prop | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `label` | `string` | — | ラベルのテキスト。 |
| `description` | `string` | — | 入力欄の説明。 |
| `error` | `string` | — | エラーメッセージ。指定時は入力欄に `aria-invalid="true"` を設定する。 |
| `required` | `boolean` | `false` | 必須マークと `required` 属性を付ける。 |

| Slot | 説明 |
| --- | --- |
| default | 入力コンポーネント。 |
| `label` | テキストではなく任意のラベル内容を出力する。 |

## MTextInput

1行のテキスト入力です。値があり、編集可能なときはクリアボタンを表示します。

```vue
<MTextInput v-model="email" type="email" autocomplete="email" />
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | 入力値。 |
| `type` | `string` | `'text'` | 入力タイプ。 |
| `clearable` | `boolean` | `true` | クリアボタンを表示するか。 |
| `clearLabel` | `string` | `'Clear input'` | クリアボタンのアクセシブルな名前。 |
| `disabled` | `boolean` | `false` | 無効化する。 |
| `readonly` | `boolean` | `false` | 読み取り専用にする。 |

## MTextArea

複数行テキスト入力です。ネイティブの `textarea` 属性（例: `rows`、`maxlength`、`placeholder`）を指定できます。

```vue
<MTextArea v-model="memo" rows="5" placeholder="メモを入力" />
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `string` | `''` | 入力値。 |
| `disabled` | `boolean` | `false` | 無効化する。 |
| `readonly` | `boolean` | `false` | 読み取り専用にする。 |

`rows` を指定しない場合は 3 行です。

## MSelect

選択肢から1つを選ぶネイティブの `<select>` です。

```vue
<MSelect v-model="role" placeholder="ロールを選択" :options="[
  { value: 'member', label: 'メンバー' },
  { value: 'admin', label: '管理者' },
]" />
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | `''` | 選択値。数値の選択肢は数値のまま扱う。 |
| `options` | `ChoiceOption[]` | 必須 | 選択肢。 |
| `placeholder` | `string` | — | 未選択時に表示する無効な選択肢。 |
| `disabled` | `boolean` | `false` | 無効化する。 |

```ts
interface ChoiceOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

## MCheckbox

チェックボックスです。`value` と配列の `v-model` を組み合わせると、複数選択を扱えます。

```vue
<MCheckbox v-model="accepted">利用規約に同意する</MCheckbox>
<MCheckbox v-model="selectedIds" value="news">お知らせを受け取る</MCheckbox>
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `boolean \| Array<string \| number>` | `false` | チェック状態または複数選択の値。 |
| `value` | `string \| number` | — | 配列モデルで使う選択値。 |
| `indeterminate` | `boolean` | `false` | 中間状態を表示する。 |
| `disabled` | `boolean` | `false` | 無効化する。 |

| Slot | 説明 |
| --- | --- |
| default | チェックボックスのラベル。 |

## MSwitch

`role="switch"` を持つ真偽値の切り替えです。スロットでラベルを与えない場合は、`aria-label` を指定してください。

```vue
<MSwitch v-model="notifications">通知を受け取る</MSwitch>
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | オン・オフの状態。 |
| `disabled` | `boolean` | `false` | 無効化する。 |

## MRadio

ラジオボタンです。同じ `v-model` を共有する複数の `MRadio` が1つのグループになります。

```vue
<MRadio v-model="plan" value="free">Free</MRadio>
<MRadio v-model="plan" value="pro">Pro</MRadio>
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `string \| number \| null` | `null` | 選択値。 |
| `value` | `string \| number` | 必須 | このラジオの値。 |
| `disabled` | `boolean` | `false` | 無効化する。 |

| Slot | 説明 |
| --- | --- |
| default | ラジオボタンのラベル。 |

## MSlider

数値を選ぶレンジ入力です。

```vue
<MSlider v-model="volume" :min="0" :max="100" :step="5" aria-label="音量" />
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `number` | `0` | 現在値。 |
| `min` | `number` | `0` | 最小値。 |
| `max` | `number` | `100` | 最大値。 |
| `step` | `number` | `1` | 増減単位。 |
| `disabled` | `boolean` | `false` | 無効化する。 |

## MSegmentedControl

選択肢を横並びにするラジオグループです。アクセシブルな名前として `label` を指定してください。

```vue
<MSegmentedControl
  v-model="period"
  label="集計期間"
  :options="[
    { value: 'week', label: '週' },
    { value: 'month', label: '月' },
  ]"
/>
```

| Prop / v-model | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | 必須 | 選択値。 |
| `options` | `ChoiceOption[]` | 必須 | 選択肢。各選択肢で `disabled` も指定できる。 |
| `label` | `string` | — | ラジオグループのアクセシブルな名前。 |
| `disabled` | `boolean` | `false` | すべての選択肢を無効化する。 |

| Slot | スコープ | 説明 |
| --- | --- | --- |
| `option` | `{ option, selected }` | 各選択肢の表示を置き換える。 |
