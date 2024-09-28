import { createApp } from 'vue';
import './style.css';
import './index.css';
import { PLUGIN_IMPORTS } from '../pages/plugins';
import { usePages } from '../composables/usePages';
import App from './App.vue';
import DraggableVue from './components/Draggable.vue';
import { Quasar } from 'quasar';

/*
    Qusar imports and setup 
*/
import quasarIconSet from 'quasar/icon-set/material-icons';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/mdi-v7/mdi-v7.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/ionicons-v4/ionicons-v4.css';
import '@quasar/extras/eva-icons/eva-icons.css';
import '@quasar/extras/themify/themify.css';
import '@quasar/extras/line-awesome/line-awesome.css';
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';
// Import Quasar css
import 'quasar/src/css/index.sass';

const { init } = usePages();

const app = createApp(App);

for (let key of Object.keys(PLUGIN_IMPORTS)) {
    app.component(key, PLUGIN_IMPORTS[key]);
}

app.use(Quasar, {
    config: {
        dark: true,
    },

    plugins: {},
    iconSet: quasarIconSet,
});

app.component('Draggable', DraggableVue);
app.mount('#app');
init();
