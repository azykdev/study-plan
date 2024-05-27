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

        <div v-if="fanBlokiStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="fanBlokiStore.fanBloklari" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="fan_bloki" header="Fan bloki" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Fan bloki qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="fan_bloki">Fan bloki nomi</label>
            <InputText id="fan_bloki" v-model.trim="formData.fan_bloki" required="true" autofocus
              :invalid="submitted && !formData.fan_bloki" />
            <small class="p-error" v-if="submitted && !formData.fan_bloki">Fan bloki kiritish majburiy.</small>
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
            <span v-if="formData">Haqiqatan ham <b>{{ formData.fan_bloki }}</b> ni oʻchirib tashlamoqchimisiz
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
import { useFanBlokiStore } from '../../stores/fanBloki';

const toast = useToast();
const fanBlokiStore = useFanBlokiStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnMounted
onMounted(() => {
  fanBlokiStore.getAllFanBloklari()
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

  if (formData.value.fan_bloki && formData.value.fan_bloki.trim()) {
    if (formData.value.id) {
      fanBlokiStore.updateFanBloki(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'zgartirildi', life: 3000 });
          fanBlokiStore.getAllFanBloklari();
        } else {
          toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      fanBlokiStore.createFanBloki(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli qo\'shildi', life: 3000 });
          fanBlokiStore.getAllFanBloklari();
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
  fanBlokiStore.deleteFanBloki(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli muvaffaqiyatli o\'chirildi', life: 3000 });
      fanBlokiStore.getAllFanBloklari();
    } else {
      toast.add({ severity: 'error', summary: 'Ta\'lim shakli', detail: 'Ta\'lim shakli o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};
</script>
