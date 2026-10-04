# ナビゲーション

`MNavigationView` は画面幅に応じてナビゲーションを切り替えるシェルです。幅が 440px 以下のコンパクト表示ではコンテンツと下部タブを、441px 以上ではサイドパネルとコンテンツを表示します。

## MNavigationView

マウント中は環境情報の監視を開始しサイドパネルとタブを切り替えます。

```vue
<MNavigationView>
  <template #sidepanel>
    <MSidePanel title="MillaiUI">...</MSidePanel>
  </template>

  <RouterView />

  <template #tab>
    <MTabView v-model="currentPage">
      <MTabItem id="home" label="ホーム" />
      <MTabItem id="settings" label="設定" />
    </MTabView>
  </template>
</MNavigationView>
```

| Slot        | 表示される画面サイズ | 説明             |
| ----------- | -------------------- | ---------------- |
| default     | すべて               | 主コンテンツ。   |
| `sidepanel` | medium / large       | サイドパネル。   |
| `tab`       | compact              | 画面下部のタブ。 |

## MSidePanel

固定表示できる折りたたみ式サイドパネルです。開閉状態は `v-model` で管理されます。

```vue
<MSidePanel v-model="panelOpen" title="設定" show-options @options="openSettings">
  <MSidePanelItem id="profile" label="プロフィール" />
</MSidePanel>
```

| Prop / v-model | 型        | 既定値         | 説明                             |
| -------------- | --------- | -------------- | -------------------------------- |
| `v-model`      | `boolean` | `true`         | パネルを開くか。                 |
| `title`        | `string`  | —              | パネル内の見出し。               |
| `collapsible`  | `boolean` | `true`         | 開閉ボタンを表示するか。         |
| `showOptions`  | `boolean` | `false`        | オプションボタンを表示するか。   |
| `label`        | `string`  | `'Side panel'` | `<aside>` のアクセシブルな名前。 |

| Event     | 説明                                     |
| --------- | ---------------------------------------- |
| `options` | オプションボタンのクリック時に発火する。 |

| Slot    | 説明                                           |
| ------- | ---------------------------------------------- |
| default | パネルの内容。通常は `MSidePanelItem` を置く。 |

## MSidePanelItem

サイドパネル用の選択可能なボタンです。`active` を親から渡すか、`@select` で選択を処理します。

```vue
<MSidePanelItem
    id="profile"
    label="プロフィール"
    :active="currentPage === 'profile'"
    @select="currentPage = $event"
>
  <template #icon="{ active }">
    <UserIcon :stroke-width="active ? 3 : 2" />
  </template>
</MSidePanelItem>
```

| Prop     | 型        | 既定値 | 説明                         |
| -------- | --------- | ------ | ---------------------------- |
| `id`     | `string`  | 必須   | 項目の識別子。               |
| `label`  | `string`  | 必須   | 表示するラベル。             |
| `active` | `boolean` | —      | 選択状態を明示的に制御する。 |

| Event    | 値           | 説明                         |
| -------- | ------------ | ---------------------------- |
| `select` | `id: string` | 項目のクリック時に発火する。 |

| Slot   | スコープ              | 説明                 |
| ------ | --------------------- | -------------------- |
| `icon` | `{ active: boolean }` | ラベル前のアイコン。 |

## MTabView と MTabItem

`MTabView` は下部のナビゲーション領域で、`MTabItem` の選択状態を `v-model` で持ちます。セーフエリアの下余白に対応しています。

```vue
<MTabView v-model="currentPage" label="メインナビゲーション">
  <MTabItem id="home" label="ホーム">
    <template #icon="{ active }">
      <HomeIcon :fill="active ? 'currentColor' : 'none'" />
    </template>
  </MTabItem>
  <MTabItem id="settings" label="設定" />
</MTabView>
```

### MTabView

| Prop / v-model | 型       | 既定値                 | 説明                           |
| -------------- | -------- | ---------------------- | ------------------------------ |
| `v-model`      | `string` | `''`                   | 選択中の項目の `id`。          |
| `label`        | `string` | `'Primary navigation'` | `<nav>` のアクセシブルな名前。 |

| Slot    | 説明         |
| ------- | ------------ |
| default | `MTabItem`。 |

### MTabItem

| Prop    | 型       | 説明             |
| ------- | -------- | ---------------- |
| `id`    | `string` | 項目の識別子。   |
| `label` | `string` | 表示するラベル。 |

| Event    | 値           | 説明                             |
| -------- | ------------ | -------------------------------- |
| `select` | `id: string` | 項目が選択されたときに発火する。 |

| Slot   | スコープ              | 説明           |
| ------ | --------------------- | -------------- |
| `icon` | `{ active: boolean }` | タブアイコン。 |
