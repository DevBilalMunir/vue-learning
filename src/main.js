import './assets/main.css'
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";
import RadioButton from 'primevue/radiobutton';
import Listbox from 'primevue/listbox';
import '@/assets/styles.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DialogService from 'primevue/dialogservice';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'
import DynamicDialog from 'primevue/dynamicdialog';
import Dialog from 'primevue/dialog';
import AutoComplete from 'primevue/autocomplete';
import InputMask from 'primevue/inputmask';
import Textarea from 'primevue/textarea';
import Divider from 'primevue/divider';

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(PrimeVue, { ripple: true })
app.use(DialogService);
app.mount('#app')
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Dialog', Dialog)
app.component('DynamicDialog', DynamicDialog);
app.component('Toast', Toast);
app.component('AutoComplete', AutoComplete);
app.component('Listbox', Listbox);
app.component('InputMask', InputMask);
app.component('RadioButton', RadioButton);
app.component('Textarea', Textarea);
app.component('Divider', Divider);
