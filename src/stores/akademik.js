import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AkademikService } from '@/service/akademikService';

export const useAkademikStore = defineStore('akademik', () => {
  // State
  const akademikDarajalar = ref([]);
  const akademikDaraja = ref({});
  const loading = ref(false);

  // Actions

  const getAllAkademikDarajalar = async () => {
    loading.value = true;
    akademikDarajalar.value = (await AkademikService.getAll()).data;
    loading.value = false;
  };

  const getAkademikDaraja = async (id) => {
    return (akademikDaraja.value = await AkademikService.get(id));
  };

  const createAkademikDaraja = async (data) => {
    return await AkademikService.create(data);
  };

  const updateAkademikDaraja = async (data) => {
    return await AkademikService.update(data.id, data);
  };

  const deleteAkademikDaraja = async (id) => {
    return await AkademikService.delete(id);
  };

  return { akademikDarajalar, akademikDaraja, loading, getAllAkademikDarajalar, getAkademikDaraja, createAkademikDaraja, updateAkademikDaraja, deleteAkademikDaraja };
});
