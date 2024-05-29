<template>
  <Button label="" type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
    class="border-noround border-none " :style="{ backgroundColor: '#f1ee8e' }" />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">

  </Menu>
</template>

<script setup>
import { ref } from "vue";

// props
const props = defineProps({
  rowIndex: Number,
  tdIndex: Number,
  td: String
})

const menu = ref();
const items = ref([
  {
    label: 'empty',
    command: () => {
      console.log('empty');
    }
  },
  { 
    label: 'A', 
    command: () => {
      console.log('A');
    }
  },
  { 
    label: 'B', 
    command: () => {
      console.log('B');
    }
  },
  { 
    label: 'C', 
    command: () => {
      console.log('C');
    }
  },
  { 
    label: 'D', 
    command: () => {
      console.log('D');
    }
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

</script>

<style scoped></style>