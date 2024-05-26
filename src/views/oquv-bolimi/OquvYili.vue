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

        <ProgressSpinner v-if="oquvYili.loading" style="width: 50px; height: 50px" strokeWidth="6"
          fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />

        <DataTable v-else ref="dt" :value="oquvYili.oquvYillari" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="oquv_yili" header="O'quv yili" style="width: 100%;"></Column>
          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                @click="editOquvYili(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="O'quv yili qo'shish" :modal="true"
          class="p-fluid">
          <div class="field">
            <label for="oquv_yili">O'quv yili</label>
            <InputText id="oquv_yili" v-model.trim="formData.oquv_yili" required="true" autofocus
              :invalid="submitted && !formData.oquv_yili" />
            <small class="p-invalid" v-if="submitted && !formData.oquv_yili">O'quv yili kiritish majburiy.</small>
          </div>

          <template #footer>
            <Button label="Bekor qilish" icon="pi pi-times" text="" @click="hideDialog" />
            <Button label="Saqlash" icon="pi pi-check" text="" @click="save" />
          </template>
        </Dialog>

        <!-- delete dialog -->
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Tasdiqlash" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="formData">Haqiqatan ham oʻchirib tashlamoqchimisiz <b>{{ formData.oquv_yili }}</b>?</span>
          </div>
          <template #footer>
            <Button label="Yo'q" icon="pi pi-times" text @click="deleteDialog = false" />
            <Button label="Ha" icon="pi pi-check" text @click="deleteOquvYili" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useOquvYiliStore } from '@/stores/oquvYili';

const toast = useToast();
const oquvYili = useOquvYiliStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// OnBeforeMount
// onBeforeMount(() => {
//   oquvYili.getOquvYillari();
// });

// OnMounted
onMounted(() => {
  oquvYili.getAllOquvYillari()
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

  if (formData.value.oquv_yili && formData.value.oquv_yili.trim()) {
    if (formData.value.id) {
      oquvYili.updateOquvYili(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'O\'quv yili', detail: 'O\'quv yili muvaffaqiyatli o\'zgartirildi', life: 3000 });
          oquvYili.getAllOquvYillari();
        } else {
          toast.add({ severity: 'error', summary: 'O\'quv yili', detail: 'O\'quv yili o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      oquvYili.createOquvYili(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'O\'quv yili', detail: 'O\'quv yili muvaffaqiyatli qo\'shildi', life: 3000 });
          oquvYili.getAllOquvYillari();
        } else {
          toast.add({ severity: 'error', summary: 'O\'quv yili', detail: 'O\'quv yili qo\'shishda xatolik', life: 3000 });
        }
      })
    }

    dialog.value = false;
    formData.value = {};
  }
};

const editOquvYili = (oquvYili) => {
  formData.value = { ...oquvYili };
  dialog.value = true;
};

const deleteConfirm = (oquvYili) => {
  formData.value = oquvYili;
  deleteDialog.value = true;
};

const deleteOquvYili = () => {
  oquvYili.deleteOquvYili(formData.value.id).then(res => {
    console.log(res);
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'O\'quv yili', detail: 'O\'quv yili muvaffaqiyatli o\'chirildi', life: 3000 });
      oquvYili.getAllOquvYillari();
    } else {
      toast.add({ severity: 'error', summary: 'O\'quv yili', detail: 'O\'quv yili o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};

</script>

<style scoped></style>