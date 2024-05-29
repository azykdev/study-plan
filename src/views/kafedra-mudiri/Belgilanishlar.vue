<template>
  <div class="grid mt-0">
    <div class="cols-12 w-full">
      <div class="card w-full">

        <div v-if="belgilanishlarStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="belgilanishlarStore.belgilanishlar" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column header="Belgilanishi">
            <template #body="slotProps">
              <Badge :value="slotProps.data.grafik_belgisi" severity="info" size="large"></Badge>
            </template>
          </Column>
          <Column field="mazmuni" header="Mazmuni" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <!-- <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" /> -->
              <InputSwitch v-model="check" />
            </template>
          </Column>
        </DataTable>

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useBelgilanishlarStore } from '../../stores/belgilanishlar';
import { useKafedraStore } from '../../stores/kafedra';

const toast = useToast();
const belgilanishlarStore = useBelgilanishlarStore();
const kafedraStore = useKafedraStore();

const formData = ref({});
const dt = ref(null);
const check = ref(true);

// OnMounted
onMounted(() => {
  belgilanishlarStore.getAllBelgilanishlar()
  kafedraStore.getAllKafedralar()
});

// Computed
// const currentKafedra = computed(() => {
//   return kafedraStore.kafedra
// })

// const belgilanishlar = computed(() => {
//   return belgilanishlarStore.belgilanishlar.map((item, i) => {
    
//   })
// })

</script>
