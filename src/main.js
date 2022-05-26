import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router';
import './index.css';
import 'ant-design-vue/dist/antd.css';

import useFirebase from './use-firebase';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#app');
