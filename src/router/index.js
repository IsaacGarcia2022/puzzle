import { createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import JugarView from '../views/JugarView.vue'
import RachaView from '../views/RachaView.vue'
import LogrosView from '../views/LogrosView.vue'
import PerfilView from '../views/PerfilView.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/jugar'
      },
      {
        path: '/jugar',
        name: 'jugar',
        component: JugarView
      },
      {
        path: '/racha',
        name: 'racha',
        component: RachaView
      },
      {
        path: '/logros',
        name: 'logros',
        component: LogrosView
      },
      {
        path: '/perfil',
        name: 'perfil',
        component: PerfilView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
