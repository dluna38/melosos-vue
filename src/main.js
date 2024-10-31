import './assets/main.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { getCsrfCookie } from './components/requests/requestsHelper'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost/meloso-app/public/api';
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.response.use(function (response) {
  // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
  // Haz algo con los datos de la respuesta
  return response;
}, function (error) {
  console.log('error en la petición');
  console.log(error);

  if (error.response.status === 419) {
    console.log('falta csrf');
  }

  /*if (error.response.status === 401) {
    console.log('error prohibido, borrar sesion y devolver a login');
  }*/
  return Promise.reject(error);
});
axios.interceptors.request.use(
  async config => {
    // Si la petición es POST, realizar una GET previa
    if (config.method === 'post' && document.cookie.split(';')[0] === '') {
      console.log('sin csrf cookie');
      await getCsrfCookie()
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


const app = createApp(App)

app.use(router)

app.mount('#app')
