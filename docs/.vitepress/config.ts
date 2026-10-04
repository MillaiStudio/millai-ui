import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'MillaiUI',
    base:'/millai-ui/',
    description: 'A Vue UI component library by Millai',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'ホーム', link: '/' },
            { text: '始める', link: '/getstarted' },
            { text: 'コンポーネント', link: '/components/typography' },
            { text: 'API', link: '/api/theme' },
        ],

        sidebar: [
            {
                text: '導入',
                items: [{ text: '始める', link: '/getstarted' }],
            },
            {
                text: 'コンポーネント',
                items: [
                    { text: 'タイポグラフィ', link: '/components/typography' },
                    { text: 'レイアウト', link: '/components/layout' },
                    { text: 'フォームと操作', link: '/components/forms' },
                    { text: '表示とフィードバック', link: '/components/display' },
                    { text: 'ナビゲーション', link: '/components/navigation' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'テーマ', link: '/api/theme' },
                    { text: '環境', link: '/api/environment' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/MillaiStudio/millai-ui' }],
    },
});
