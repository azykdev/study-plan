import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OBOquvRejaService } from '../service/OBOquvRejaService';

export const useOBOquvRejaStore = defineStore('OBOquvReja', () => {
  // State
  const oquvRejalar = ref([]);
  const oquvReja = ref({});
  const loading = ref(false);

  // Actions

  const getAllOquvRejalar = async () => {
    loading.value = true;
    oquvRejalar.value = (await OBOquvRejaService.getAll()).data;
    loading.value = false;
  };

  const getOquvReja = async (id) => {
    return (oquvReja.value = await OBOquvRejaService.get(id));
  };

  const createOquvReja = async (data) => {
    return await OBOquvRejaService.create(data);
  };

  const updateOquvReja = async (data) => {
    return await OBOquvRejaService.update(data.id, data);
  };

  const deleteOquvReja = async (id) => {
    return await OBOquvRejaService.delete(id);
  };

  return {
    oquvRejalar,
    oquvReja,
    loading,
    getAllOquvRejalar,
    getOquvReja,
    createOquvReja,
    updateOquvReja,
    deleteOquvReja
  };
});
