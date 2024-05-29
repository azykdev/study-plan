import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: '/404',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        // O'QUV BOLIMI ROUTES
        {
          path: '/oquv-bolimi/dashboard',
          name: 'oquv_bolimi_dashboard',
          component: () => import('@/views/oquv-bolimi/Dashboard.vue')
        },
        {
          path: '/oquv-bolimi/oquv-yili',
          name: 'oquv_bolimi_oquv_yili',
          component: () => import('@/views/oquv-bolimi/OquvYili.vue')
        },
        {
          path: '/oquv-bolimi/yonalishlar',
          name: 'oquv_bolimi_yonalishlar',
          component: () => import('@/views/oquv-bolimi/Yonalishlar.vue')
        },
        {
          path: '/oquv-bolimi/talim-shakli',
          name: 'oquv_bolimi_talim_shakli',
          component: () => import('@/views/oquv-bolimi/TalimShakli.vue')
        },
        {
          path: '/oquv-bolimi/akademik-daraja',
          name: 'oquv_bolimi_akademik_daraja',
          component: () => import('@/views/oquv-bolimi/AkademikDaraja.vue')
        },
        {
          path: '/oquv-bolimi/oquv-rejalar',
          name: 'oquv_bolimi_oquv_rejalar',
          component: () => import('@/views/oquv-bolimi/OquvRejalar.vue')
        },
        {
          path: '/oquv-bolimi/fan-bloklari',
          name: 'oquv_bolimi_fan_bloklari',
          component: () => import('@/views/oquv-bolimi/FanBloklari.vue')
        },
        {
          path: '/oquv-bolimi/belgilanishlar',
          name: 'oquv_bolimi_belgilanishlar',
          component: () => import('@/views/oquv-bolimi/Belgilanishlar.vue')
        },
        {
          path: '/oquv-bolimi/kafedralar',
          name: 'oquv_bolimi_kafedralar',
          component: () => import('@/views/oquv-bolimi/Kafedralar.vue')
        },

        // KAFEDRA MUDIRI ROUTES
        {
          path: '/kafedra-mudiri/dashboard',
          name: 'kafedra_mudiri_dashboard',
          component: () => import('@/views/kafedra-mudiri/Dashboard.vue')
        },
        {
          path: '/kafedra-mudiri/belgilanishlari',
          name: 'kafedra_mudiri_belgilanishlari',
          component: () => import('@/views/kafedra-mudiri/Belgilanishlar.vue')
        },
        {
          path: '/kafedra-mudiri/oquv-rejalar',
          name: 'kafedra_mudiri_oquv_rejalar',
          component: () => import('@/views/kafedra-mudiri/OquvRejalar.vue')
        }
      ]
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/pages/Landing.vue')
    }
  ]
});

export default router;
