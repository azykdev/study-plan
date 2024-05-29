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

        <div v-if="OBOquvRejaStore.loading" class="flex items-center justify-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>

        <DataTable v-else ref="dt" :value="OBOquvRejaStore.oquvRejalar" dataKey="id">
          <!-- col index -->
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>

          <Column field="yunalish.label" header="Yo'nalish" style="width: 300px;"></Column>
          <Column field="uquv_yili.label" header="O'quv yili"></Column>
          <Column field="talim_shakli.label" header="Talim shakli"></Column>
          <Column field="akademik_daraja.label" header="Akademik daraja"></Column>
          <Column header="Oqish muddati">
            <template #body="slotProps">
              {{ slotProps.data.uqish_muddati.label }} yil
            </template>
          </Column>
          <Column field="kafedra.label" header="Kafedra"></Column>

          <Column headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                @click="deleteConfirm(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <!-- dialog -->
        <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="O'quv reja qo'shish" :modal="true"
          class="p-fluid">

          <!-- Yo'nalishlar -->
          <FloatLabel class="mt-5">
            <Dropdown showClear inputId="yunalish" v-model="formData.yunalish" :options="yunalishlarOptions" optionLabel="label"
              :invalid="submitted && !formData.yunalish">

            </Dropdown>
            <label for="yunalish">Yo'nalish</label>
            <!-- <small class="p-error" v-if="submitted && !formData.yunalish">Yo'nalish kiritish majburiy</small> -->
          </FloatLabel>

          <!-- O'quv yili -->
          <FloatLabel class="mt-5">
            <Dropdown showClear id="uquv_yili" v-model="formData.uquv_yili" :options="uquvYiliOptions" optionLabel="label"
              :invalid="submitted && !formData.uquv_yili">
            </Dropdown>
            <label for="uquv_yili">O'quv yili</label>
            <!-- <small class="p-error" v-if="submitted && !formData.uquv_yili">O'quv yili kiritish majburiy</small> -->
          </FloatLabel>

          <!-- Ta'lim shakli -->
          <FloatLabel class="mt-5">
            <Dropdown showClear id="talim_shakli" v-model="formData.talim_shakli" :options="talimShakliOptions"
              optionLabel="label" :invalid="submitted && !formData.talim_shakli">
            </Dropdown>
            <label for="talim_shakli">Ta'lim shakli</label>
            <!-- <small class="p-error" v-if="submitted && !formData.talim_shakli">Ta'lim shakli kiritish majburiy</small> -->
          </FloatLabel>

          <!-- Akademik daraja -->
          <FloatLabel class="mt-5">
            <Dropdown showClear id="akademik_daraja" v-model="formData.akademik_daraja" :options="akademikDarajaOptions"
              optionLabel="label" :invalid="submitted && !formData.akademik_daraja">
            </Dropdown>
            <label for="akademik_daraja">Akademik daraja</label>
            <!-- <small class="p-error" v-if="submitted && !formData.akademik_daraja">Akademik daraja kiritish
              majburiy</small> -->
          </FloatLabel>

          <!-- O'qish muddati -->
          <FloatLabel class="mt-5">
            <Dropdown showClear id="uqish_muddati" v-model="formData.uqish_muddati" :options="uqishMuddatiOptions"
              optionLabel="label" :invalid="submitted && !formData.uqish_muddati">
            </Dropdown>
            <label for="uqish_muddati">O'qish muddati</label>
            <!-- <small class="p-error" v-if="submitted && !formData.uqish_muddati">O'qish muddati kiritish majburiy</small> -->
          </FloatLabel>

          <!-- Kafedra -->
          <FloatLabel class="mt-5">
            <!-- <small class="p-invalid" v-if="submitted && !formData.kafedra">Kafedra kiritish majburiy</small> -->
            <Dropdown showClear id="kafedra" v-model="formData.kafedra" :options="kafedraOptions" optionLabel="label"
              :invalid="submitted && !formData.kafedra">
            </Dropdown>
            <label for="kafedra">Kafedra</label>
          </FloatLabel>

          <template #footer>
            <Button label="Bekor qilish" icon="pi pi-times" text="" @click="hideDialog" severity="secondary" />
            <Button label="Saqlash" icon="pi pi-check" text="" @click="save" />
          </template>
        </Dialog>

        <!-- delete dialog -->
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Tasdiqlash" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="formData">Haqiqatan ham <b>{{ formData.yunalish.label }}</b> ni oʻchirib tashlamoqchimisiz
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
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useOBOquvRejaStore } from '../../stores/OBOquvReja';
import { useAkademikStore } from '../../stores/akademik';
import { useKafedraStore } from '../../stores/kafedra';
import { useOquvYiliStore } from '../../stores/oquvYili';
import { useTalimShakliStore } from '../../stores/talimShakli';
import { useYonalishlarStore } from '../../stores/yonalishlar';

const toast = useToast();
const OBOquvRejaStore = useOBOquvRejaStore();
const akademikStore = useAkademikStore();
const kafedraStore = useKafedraStore();
const oquvYiliStore = useOquvYiliStore();
const talimShakliStore = useTalimShakliStore();
const yonalishlarStore = useYonalishlarStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const formData = ref({});
const dt = ref(null);
const submitted = ref(false);

// selects options
const yunalishlarOptions = computed(() => {
  return yonalishlarStore.yonalishlar.map((item) => {
    return {
      label: item.yunalish,
      value: item.id,
    };
  })
})

const uquvYiliOptions = computed(() => {
  return oquvYiliStore.oquvYillari.map((item) => {
    return {
      label: item.uquv_yili,
      value: item.id,
    };
  })
})

const talimShakliOptions = computed(() => {
  return talimShakliStore.talimShakllari.map((item) => {
    return {
      label: item.talim_shakli,
      value: item.id,
    };
  })
})

const akademikDarajaOptions = computed(() => {
  return akademikStore.akademikDarajalar.map((item) => {
    return {
      label: item.akademik_daraja,
      value: item.id,
    };
  })
})

const uqishMuddatiOptions = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
]

const kafedraOptions = computed(() => {
  return kafedraStore.kafedralar.map((item) => {
    return {
      label: item.kafedra_nomi,
      value: item.id,
    };
  })
})

// OnMounted
onMounted(() => {
  OBOquvRejaStore.getAllOquvRejalar()
  akademikStore.getAllAkademikDarajalar()
  kafedraStore.getAllKafedralar()
  oquvYiliStore.getAllOquvYillari()
  talimShakliStore.getAllTalimShakllari()
  yonalishlarStore.getAllYonalishlar()
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

  if (formData.value.yunalish && formData.value.uquv_yili && formData.value.talim_shakli && formData.value.akademik_daraja && formData.value.kafedra && formData.value.uqish_muddati) {
    if (formData.value.id) {
      OBOquvRejaStore.updateOquvReja(formData.value).then(res => {
        console.log(res);
        if (res.status === 200) {
          toast.add({ severity: 'success', summary: 'O\'quv reja', detail: 'O\'quv reja muvaffaqiyatli o\'zgartirildi', life: 3000 });
          OBOquvRejaStore.getAllOquvRejalar();
        } else {
          toast.add({ severity: 'error', summary: 'O\'quv reja', detail: 'O\'quv reja o\'zgartirishda xatolik', life: 3000 });
        }
      })
    } else {
      OBOquvRejaStore.createOquvReja(formData.value).then(res => {
        if (res.status === 201) {
          toast.add({ severity: 'success', summary: 'O\'quv reja', detail: 'O\'quv reja muvaffaqiyatli qo\'shildi', life: 3000 });
          OBOquvRejaStore.getAllOquvRejalar();
        } else {
          toast.add({ severity: 'error', summary: 'O\'quv reja', detail: 'O\'quv reja qo\'shishda xatolik', life: 3000 });
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
  OBOquvRejaStore.deleteOquvReja(formData.value.id).then(res => {
    if (res.status === 200) {
      toast.add({ severity: 'success', summary: 'O\'quv reja', detail: 'O\'quv reja muvaffaqiyatli o\'chirildi', life: 3000 });
      OBOquvRejaStore.getAllOquvRejalar();
    } else {
      toast.add({ severity: 'error', summary: 'O\'quv reja', detail: 'O\'quv reja o\'chirishda xatolik', life: 3000 });
    }
  })
  deleteDialog.value = false;
  formData.value = {};
};

</script>
