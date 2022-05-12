import { createApp } from 'vue'
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue';
import store from './store';
import "./plugin.js";
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);

// app.use(BootstrapVue)

app.use(store);

app.mount('#app');


// Vue.use(BootstrapVue);

// const vm = new Vue({
//   render: h => h(App)
// });

// vm.$use(store);

// vm.$mount('#app');