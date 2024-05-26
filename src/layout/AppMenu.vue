<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

let role = ref('oquv_bolimi');

const oquvBolimiModel = ref([
  {
    label: 'O\'quv bolimi',
    items: [
      { label: 'Dashboard', icon: 'mdi mdi-view-dashboard', to: 'oquv_bolimi_dashboard' },
      { label: "O'quv yili", icon: 'mdi mdi-calendar-month', to: 'oquv_bolimi_oquv_yili' },
      { label: "Yo'nalish", icon: 'mdi mdi-directions-fork', to: 'oquv_bolimi_yonalishlar' },
      { label: "Ta'lim shakli", icon: 'mdi mdi-sitemap-outline', to: 'oquv_bolimi_talim_shakli' },
      { label: "Akademik daraja", icon: 'mdi mdi-school', to: 'oquv_bolimi_akademik_daraja' },
      { label: "O'quv rejalar", icon: 'mdi mdi-calendar-search', to: 'oquv_bolimi_oquv_rejalar' },
      { label: "Fan bloklari", icon: 'mdi mdi-bookshelf', to: 'oquv_bolimi_fan_bloklari' },
      { label: "O'quv grafigi belgilanishlari", icon: 'mdi mdi-symbol', to: 'oquv_bolimi_belgilanishlar' },
      { label: "Kafedralar", icon: 'mdi mdi-alpha-k', to: 'oquv_bolimi_kafedralar' },
    ]
  },

  // {
  //     label: 'Pages',
  //     icon: 'pi pi-fw pi-briefcase',
  //     to: '/pages',
  //     items: [
  //         {
  //             label: 'Landing',
  //             icon: 'pi pi-fw pi-globe',
  //             to: '/landing'
  //         },
  //         {
  //             label: 'Auth',
  //             icon: 'pi pi-fw pi-user',
  //             items: [
  //                 {
  //                     label: 'Login',
  //                     icon: 'pi pi-fw pi-sign-in',
  //                     to: '/auth/login'
  //                 },
  //                 {
  //                     label: 'Error',
  //                     icon: 'pi pi-fw pi-times-circle',
  //                     to: '/auth/error'
  //                 },
  //                 {
  //                     label: 'Access Denied',
  //                     icon: 'pi pi-fw pi-lock',
  //                     to: '/auth/access'
  //                 }
  //             ]
  //         },
  //         {
  //             label: 'Not Found',
  //             icon: 'pi pi-fw pi-exclamation-circle',
  //             to: '/pages/notfound'
  //         },

  //     ]
  // },

]);

const kafedraMudiriModel = ref([
  {
    label: 'Kafedra mudiri',
    items: [
      { label: 'Dashboard', icon: 'mdi mdi-view-dashboard', to: 'oquv_bolimi_dashboard' },
      // { label: "O'quv yili", icon: 'mdi mdi-calendar-month', to: 'oquv_bolimi_oquv_yili' },
      // { label: "Yo'nalish", icon: 'mdi mdi-directions-fork', to: 'oquv_bolimi_yonalishlar' },
      // { label: "Ta'lim shakli", icon: 'mdi mdi-sitemap-outline', to: 'oquv_bolimi_talim_shakli' },
      // { label: "Akademik daraja", icon: 'mdi mdi-school', to: 'oquv_bolimi_akademik_daraja' },
      { label: "O'quv grafigi belgilanishlari", icon: 'mdi mdi-symbol', to: 'oquv_bolimi_belgilanishlar' },
      { label: "O'quv rejalar", icon: 'mdi mdi-calendar-search', to: 'oquv_bolimi_oquv_rejalar' },
      // { label: "Fan bloklari", icon: 'mdi mdi-bookshelf', to: 'oquv_bolimi_fan_bloklari' },
      // { label: "Kafedralar", icon: 'mdi mdi-alpha-k', to: 'oquv_bolimi_kafedralar' },
    ]
  },
])


</script>

<template>
  <ul class="layout-menu">
    <template v-if="role === 'oquv_bolimi'" v-for="(item, i) in oquvBolimiModel" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>

    <template v-if="role === 'kafedra_mudiri'" v-for="(item, i) in kafedraMudiriModel" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>

  </ul>
</template>

<style lang="scss" scoped></style>
