<template>
  <div class="grid mt-0">
    <div class="cols-12 w-full">
      <div class="card w-full">

        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="Qo'shish" icon="pi pi-plus" class="mr-2" severity="success" @click="openDialog" />
            </div>
          </template>
        </Toolbar>
        
        <div v-if="akademikStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="akademikStore.akademikDarajalar" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="akademik_daraja" header="Talim shakli" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Akademik daraja qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="akademik_daraja">Akademik daraja nomi</label>
            <InputText id="akademik_daraja" v-model.trim="formData.akademik_daraja" required="true" autofocus
              :invalid="submitted && !formData.akademik_daraja" />
            <small class="p-error" v-if="submitted && !formData.akademik_daraja">Akademik daraja kiritish majburiy.</small>
          </div>

          <template #footer>
            <Button label="Bekor qilish" icon="pi pi-times" text="" @click="hideDialog" severity="secondary" />
            <Button label="Saqlash" icon="pi pi-check" text="" @click="save" />
          </template>
        </Dialog>

        <!-- delete dialog -->
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Tasdiqlash" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="formData">Haqiqatan ham <b>{{ formData.akademik_daraja }}</b> ni oʻchirib tashlamoqchimisiz ?</span>
          </div>
          <template #footer>
            <Button label="Yo'q" icon="pi pi-times" text @click="deleteDialog = false" severity="danger" />
            <Button label="Ha" icon="pi pi-check" text @click="deleting" />
          </template>
        </Dialog>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAkademikStore } from '@/stores/akademik';

const toast = useToast();
const akademikStore = useAkademikStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnMounted
onMounted(() => {
  akademikStore.getAllAkademikDarajalar()
});

const openDialog = () => {
  formData.value = {};
  submitted.value = false;
  dialog.value = true;
};
const hideDialog = () => {
  dialog.value = false;
  submitted.value = false;
};

const save = () => {
  submitted.value = true;

  if (formData.value.akademik_daraja && formData.value.akademik_daraja.trim()) {
    if (formData.value.id) {
      akademikStore.updateAkademikDaraja(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'Akademik daraja', detail: 'Akademik daraja muvaffaqiyatli o\'zgartirildi', life: 3000 });
          akademikStore.getAllAkademikDarajalar();
        } else {
          toast.add({ severity: 'error', summary: 'Akademik daraja', detail: 'Akademik daraja o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      akademikStore.createAkademikDaraja(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'Akademik daraja', detail: 'Akademik daraja muvaffaqiyatli qo\'shildi', life: 3000 });
          akademikStore.getAllAkademikDarajalar();
        } else {
          toast.add({ severity: 'error', summary: 'Akademik daraja', detail: 'Akademik daraja qo\'shishda xatolik', life: 3000 });
        }
      })
    }

    dialog.value = false;
    formData.value = {};
  }
};

const edit = (item) => {
  formData.value = { ...item };
  dialog.value = true;
};

const deleteConfirm = (item) => {
  formData.value = item;
  deleteDialog.value = true;
};

const deleting = () => {
  akademikStore.deleteAkademikDaraja(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'Akademik daraja', detail: 'Akademik daraja muvaffaqiyatli o\'chirildi', life: 3000 });
      akademikStore.getAllAkademikDarajalar();
    } else {
      toast.add({ severity: 'error', summary: 'Akademik daraja', detail: 'Akademik daraja o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};
</script>

<style  scoped>

</style>