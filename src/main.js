import '@/assets/scss/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';

import ElementPlus, { ElMessage } from 'element-plus';
import ko from 'element-plus/es/locale/lang/ko';

import 'element-plus/dist/index.css';

import { router } from '@/router';

function toast(message, dangerouslyUseHTMLString = false, center = true, duration = 2000) {
    ElMessage({
        message: message,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString,
        center: center,
        duration: duration
    });
}

const app = createApp(App);

app.use(createPinia());
app.use(router).use(ElementPlus, { locale: ko });

app.provide('$toast', toast);

app.mount('#app');
