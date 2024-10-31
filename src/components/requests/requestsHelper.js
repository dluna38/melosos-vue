import axios from 'axios';

async function getCategorias(params) {
    return axios.get('/categorias');
}

async function getPedidoDetail(idPedido) {
    return axios.get('/pedido/' + idPedido);
}
async function getCsrfCookie(){
    return axios.get('http://localhost/meloso-app/public/sanctum/csrf-cookie');
}

export {getCategorias,getPedidoDetail,getCsrfCookie}


/* axios.interceptors.request.use(
  config => {
    // Si la petición es POST, realizar una GET previa
    if (config.method === 'post') {
      return axios.get('http://localhost/meloso-app/public/sanctum/csrf-cookie')
        .catch(error => {
          console.error('Error en la petición GET:', error);
          return Promise.reject(error);
        });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
); */