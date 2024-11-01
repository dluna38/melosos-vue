import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import PedidosView from '@/views/Pedidos/PedidosView.vue'
import AdminInicioView from '@/views/AdminInicioView.vue'
import DetallePedidoView from '@/views/Pedidos/DetallePedidoView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NewPedidoView from '@/views/Pedidos/NewPedidoView.vue'
import { getPedidoDetail } from '@/components/requests/requestsHelper'
import CatalogoView from '@/views/CatalogoView.vue'
import TalleresView from '@/views/TalleresView.vue'

const router = createRouter({
  linkExactActiveClass:'nav-link active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{protected:false},
      component: Home
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      meta:{protected:false},
      component: CatalogoView
    },
    {
      path: '/talleres',
      name: 'talleres',
      meta:{protected:false},
      component: TalleresView
    },
    {
      path: '/login',
      name: 'login',
      meta:{protected:false},
      component: LoginView
    },
    {
      path: '/contacto',
      name: 'contacto',
      meta:{protected:false},
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContactoView.vue')
    },
    {
      path: '/administracion',
      name: 'administracion',
      redirect: '/administracion/inicio',
      meta:{protected:true},
      component: AdminView,
      children:[
        {
          path:'inicio',
          component: () => import('../views/AdminInicioView.vue')
        },
        {
          path:'pedidos',
          name:'pedidos',
          //component: PedidosView
          component: () => import('../views/Pedidos/PedidosView.vue')
        },
        {
          path:'pedidos/nuevo',
          //component: NewPedidoView
          component: () => import('../views/Pedidos/NewPedidoView.vue')
        },
        {
          name:'detallePedido',
          path:'pedidos/:codigo',
          //component: DetallePedidoView,
          component: () => import('../views/Pedidos/DetallePedidoView.vue'),
          beforeEnter:async (to, from) => {
            const returnTo = {name:'pedidos'};
            await getPedidoDetail(to.params.codigo).then((res) => {
              to.params.data = res.data;
            }).catch((error)=>{
              return  {name:'pedidos'};
            })

            if(Array.isArray(to.params.data.pedido)){
              router.push({name:'pedidos'});
            }
          },
        },
      ]
    },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFoundView },
  ]
})

async function userIsAuthenticated() {
  return true;
  /* return await axios.get('/is-login').then(response => {
    return response.data.msg===true;
  }).catch((error)=>{
    console.log('error - no');
    return false
  }); */
}



router.beforeEach(async (to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  if(!to.meta.protected){
    return true;
  }
  let userAuth = await userIsAuthenticated();
  if(to.meta.protected && !userAuth){
    return '/';
  }
})



export default router
