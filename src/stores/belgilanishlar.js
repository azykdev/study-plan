import { defineStore } from 'pinia';
import { ref } from 'vue';
import { BelgilanishlarService } from '@/service/belgilanishlarService';

export const useBelgilanishlarStore = defineStore('talimShakli', () => {
  // State
  const belgilanishlar = ref([]);
  const belgilanish = ref({});
  const loading = ref(false);

  // Actions

  const getAllBelgilanishlar = async () => {
    loading.value = true;
    belgilanishlar.value = (await BelgilanishlarService.getAll()).data;
    loading.value = false;
  };

  const getBelgilanish = async (id) => {
    return (belgilanish.value = await BelgilanishlarService.get(id));
  };

  const createBelgilanish = async (data) => {
    return await BelgilanishlarService.create(data);
  };

  const updateBelgilanish = async (data) => {
    return await BelgilanishlarService.update(data.id, data);
  };

  const deleteBelgilanish = async (id) => {
    return await BelgilanishlarService.delete(id);
  };

  return {
    belgilanishlar,
    belgilanish,
    loading,
    getAllBelgilanishlar,
    getBelgilanish,
    createBelgilanish,
    updateBelgilanish,
    deleteBelgilanish
  };
});
