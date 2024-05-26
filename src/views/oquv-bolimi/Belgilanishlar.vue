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
          <Column field="grafik_belgisi" header="Belgilanishi"></Column>
          <Column field="mazmuni" header="Mazmuni" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Belgilanish qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="grafik_belgisi">Belgilanish nomi</label>
            <InputText id="grafik_belgisi" v-model.trim="formData.grafik_belgisi" required="true" autofocus
              :invalid="submitted && !formData.grafik_belgisi" />
            <small class="p-invalid" v-if="submitted && !formData.grafik_belgisi">Belgilanish kiritish majburiy.</small>
          </div>

          <div class="field">
            <label for="mazmuni">Mazmuni</label>
            <Textarea id="mazmuni" v-model="formData.mazmuni" required="true" rows="3" cols="20" />
          </div>

          <template #footer>
            <Button label="Bekor qilish" icon="pi pi-times" text="" @click="hideDialog" severity="danger" />
            <Button label="Saqlash" icon="pi pi-check" text="" @click="save" />
          </template>
        </Dialog>

        <!-- delete dialog -->
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Tasdiqlash" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="formData">Haqiqatan ham <b>{{ formData.grafik_belgisi }}</b> ni oʻchirib tashlamoqchimisiz
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
import { useBelgilanishlarStore } from '../../stores/belgilanishlar';

const toast = useToast();
const belgilanishlarStore = useBelgilanishlarStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnMounted
onMounted(() => {
  belgilanishlarStore.getAllBelgilanishlar()
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

  if (formData.value.grafik_belgisi && formData.value.grafik_belgisi.trim()) {
    if (formData.value.id) {
      belgilanishlarStore.updateBelgilanish(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'zgartirildi', life: 3000 });
          belgilanishlarStore.getAllBelgilanishlar();
        } else {
          toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      belgilanishlarStore.createBelgilanish(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli qo\'shildi', life: 3000 });
          belgilanishlarStore.getAllBelgilanishlar();
        } else {
          toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli qo\'shishda xatolik', life: 3000 });
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
  belgilanishlarStore.deleteBelgilanish(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'chirildi', life: 3000 });
      belgilanishlarStore.getAllBelgilanishlar();
    } else {
      toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};
</script>
