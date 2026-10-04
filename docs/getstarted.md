# 始める

MillaiUI は Vue 3 向けの UI コンポーネントライブラリです。Vue 3.5 以上をピア依存として利用します。

## インストール

```sh
pnpm add vue-millai-ui
```

## スタイルとテーマを設定する

すべてのコンポーネントで共有するリセットとスタイルを読み込み、起動時にテーマを適用します。`styles.css` の読み込みは必須です。

```ts
import { createApp } from 'vue';
import { LightTheme, setTheme } from 'vue-millai-ui';
import 'vue-millai-ui/styles.css';
import App from './App.vue';

setTheme(LightTheme);
createApp(App).mount('#app');
```

`setTheme()` はブラウザでない環境でも安全に呼び出せます。第2引数に要素を渡すと、その要素以下だけにテーマを適用できます。

```ts
setTheme(LightTheme, document.querySelector('#app')!);
```

## 最初の画面を作る

各コンポーネントは`M`プレフィックスから始まります。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { MButton, MCard, MFormField, MTextInput, MVStack } from 'vue-millai-ui';

const name = ref('');
</script>

<template>
    <MCard>
        <MVStack gap="medium" alignment="stretch">
            <MFormField label="名前" required>
                <MTextInput v-model="name" />
            </MFormField>
            <MButton>保存する</MButton>
        </MVStack>
    </MCard>
</template>
```

## フォームを使用

`MFormField` の中に対応する入力コンポーネントを1つ置くと、ラベル、説明、エラーと入力要素の `id`・ARIA 属性が自動的に関連付けられます。入力要素に明示した属性がある場合は、そちらが優先されます。

```vue
<MFormField label="メールアドレス" description="メールを送信します" error="形式を確認してください">
  <MTextInput v-model="email" type="email" autocomplete="email" />
</MFormField>
```

続きは[フォームと操作](/components/forms)、[テーマAPI](/api/theme)を参照してください。
