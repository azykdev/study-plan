<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

// let role = ref('oquv_bolimi');
let role = ref('kafedra_mudiri');

const oquvBolimiModel = ref([
  {
    label: 'O\'quv bolimi',
    items: [
      { label: 'Dashboard', icon: 'mdi mdi-view-dashboard', to: 'oquv_bolimi_dashboard' },
      { label: "O'quv yili", icon: 'mdi mdi-calendar-month', to: 'oquv_bolimi_oquv_yili' },
      { label: "Yo'nalish", icon: 'mdi mdi-directions-fork', to: 'oquv_bolimi_yonalishlar' },
      { label: "Ta'lim shakli", icon: 'mdi mdi-sitemap-outline', to: 'oquv_bolimi_talim_shakli' },
      { label: "Akademik daraja", icon: 'mdi mdi-school', to: 'oquv_bolimi_akademik_daraja' },
      { label: "Fan bloklari", icon: 'mdi mdi-bookshelf', to: 'oquv_bolimi_fan_bloklari' },
      { label: "O'quv grafigi belgilanishlari", icon: 'mdi mdi-symbol', to: 'oquv_bolimi_belgilanishlar' },
      { label: "Kafedralar", icon: 'mdi mdi-alpha-k', to: 'oquv_bolimi_kafedralar' },
      { label: "O'quv rejalar", icon: 'mdi mdi-calendar-search', to: 'oquv_bolimi_oquv_rejalar' },
    ]
  },
]);

const kafedraMudiriModel = ref([
  {
    label: 'Kafedra mudiri',
    items: [
      { label: 'Dashboard', icon: 'mdi mdi-view-dashboard', to: 'kafedra_mudiri_dashboard' },
      { label: "O'quv grafigi belgilanishlari", icon: 'mdi mdi-symbol', to: 'kafedra_mudiri_belgilanishlari' },
      { label: "O'quv rejalar", icon: 'mdi mdi-calendar-search', to: 'kafedra_mudiri_oquv_rejalar' },
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
