<template>
  <div>
    <h1>Kafedralar</h1>
  </div>
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

        <div v-if="kafedreStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="kafedreStore.kafedralar" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="kafedra_nomi" header="Kafedra" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Kafedra qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="kafedra_nomi">Kafedra nomi</label>
            <InputText id="kafedra_nomi" v-model.trim="formData.kafedra_nomi" required="true" autofocus
              :invalid="submitted && !formData.kafedra_nomi" />
            <small class="p-error" v-if="submitted && !formData.kafedra_nomi">Kafedra kiritish majburiy.</small>
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
            <span v-if="formData">Haqiqatan ham <b>{{ formData.kafedra_nomi }}</b> ni oʻchirib tashlamoqchimisiz
              ?</span>
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
import { useKafedraStore } from '../../stores/kafedra';

const toast = useToast();
const kafedreStore = useKafedraStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnMounted
onMounted(() => {
  kafedreStore.getAllKafedralar()
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

  if (formData.value.kafedra_nomi && formData.value.kafedra_nomi.trim()) {
    if (formData.value.id) {
      kafedreStore.updateKafedra(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'Kafedra', detail: 'Kafedra muvaffaqiyatli o\'zgartirildi', life: 3000 });
          kafedreStore.getAllKafedralar();
        } else {
          toast.add({ severity: 'error', summary: 'Kafedra', detail: 'Kafedra o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      kafedreStore.createKafedra(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'Kafedra', detail: 'Kafedra muvaffaqiyatli qo\'shildi', life: 3000 });
          kafedreStore.getAllKafedralar();
        } else {
          toast.add({ severity: 'error', summary: 'Kafedra', detail: 'Kafedra qo\'shishda xatolik', life: 3000 });
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
  kafedreStore.deleteKafedra(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'Kafedra', detail: 'Kafedra muvaffaqiyatli o\'chirildi', life: 3000 });
      kafedreStore.getAllKafedralar();
    } else {
      toast.add({ severity: 'error', summary: 'Kafedra', detail: 'Kafedra o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};
</script>
