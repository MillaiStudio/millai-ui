import { createApp } from 'vue';
import App from './App.vue';
import './lib/styles.css';
import { LightTheme, setTheme } from './lib/theme/index.ts';

setTheme(LightTheme);
createApp(App).mount('#app');
