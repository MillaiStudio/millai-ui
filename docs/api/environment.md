# 環境 API

環境 API は画面サイズ、配色設定、ポインタ種別を共有するリアクティブな状態として提供します。`MNavigationView` は自動で監視を開始します。コンポーネントの外で使う場合は `startEnvironment()` を呼び出してください。

## useEnvironment

現在の環境を読み取り専用の ref として返します。

```ts
import { computed } from 'vue';
import { useEnvironment } from 'vue-millai-ui';

const environment = useEnvironment();
const isCompact = computed(() => environment.value.size.width === 'compact');
```

```ts
function useEnvironment(): Readonly<Ref<Environment>>;
```

```ts
interface Environment {
    colourScheme: 'light' | 'dark';
    pointer: 'fine' | 'coarse' | 'none';
    size: {
        width: 'compact' | 'medium' | 'large';
        height: 'compact' | 'medium' | 'large';
    };
}
```

## startEnvironment

`resize` とメディアクエリを監視して環境状態を更新します。複数回呼び出しても監視は共有されます。返り値を呼び出すと購読を解除し、最後の購読が解除されたときに監視も停止します。

```ts
import { onMounted, onUnmounted } from 'vue';
import { startEnvironment } from 'vue-millai-ui';

let stop: (() => void) | undefined;

onMounted(() => {
    stop = startEnvironment();
});

onUnmounted(() => {
    stop?.();
});
```

```ts
function startEnvironment(): () => void;
```

ブラウザ環境以外ではからの関数を返します。

## updateEnvironment

現在のブラウザ環境から状態をただちに再計算します。通常は呼び出す必要はありません

```ts
updateEnvironment();
```

```ts
function updateEnvironment(): void;
```

## classifySize

ピクセル値を MillaiUI の画面サイズ名へ変換します。

```ts
classifySize(375); // 'compact'
classifySize(600); // 'medium'
classifySize(1280); // 'large'
```

| 幅または高さ          | 結果        |
| --------------------- | ----------- |
| 440px 以下            | `'compact'` |
| 441px 以上 800px 未満 | `'medium'`  |
| 800px 以上            | `'large'`   |

```ts
function classifySize(size: number): DeviceSize;
```
