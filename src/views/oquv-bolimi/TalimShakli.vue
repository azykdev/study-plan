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

        <div v-if="talimShakliStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="talimShakliStore.talimShakllari" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="talim_shakli" header="Talim shakli" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Ta'lim shakli qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="talim_shakli">Ta'lim shakli nomi</label>
            <InputText id="talim_shakli" v-model.trim="formData.talim_shakli" required="true" autofocus
              :invalid="submitted && !formData.talim_shakli" />
            <small class="p-invalid" v-if="submitted && !formData.talim_shakli">Ta'lim shakli kiritish majburiy.</small>
          </div>

          <template #footer>
            <Button label="Bekor qilish" icon="pi pi-times" text="" @click="hideDialog"severity="danger" />
            <Button label="Saqlash" icon="pi pi-check" text="" @click="save" />
          </template>
        </Dialog>

        <!-- delete dialog -->
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Tasdiqlash" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="formData">Haqiqatan ham <b>{{ formData.talim_shakli }}</b> ni oʻchirib tashlamoqchimisiz ?</span>
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
import { useTalimShakliStore } from '../../stores/talimShakli';

const toast = useToast();
const talimShakliStore = useTalimShakliStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnMounted
onMounted(() => {
  talimShakliStore.getAllTalimShakllari()
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

  if (formData.value.talim_shakli && formData.value.talim_shakli.trim()) {
    if (formData.value.id) {
      talimShakliStore.updateTalimShakli(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'zgartirildi', life: 3000 });
          talimShakliStore.getAllTalimShakllari();
        } else {
          toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      talimShakliStore.createTalimShakli(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli qo\'shildi', life: 3000 });
          talimShakliStore.getAllTalimShakllari();
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
  talimShakliStore.deleteTalimShakli(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'chirildi', life: 3000 });
      talimShakliStore.getAllTalimShakllari();
    } else {
      toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};
</script>

<style scoped></style>