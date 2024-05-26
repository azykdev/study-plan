import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FanBlokiService } from '@/service/fanBlokiService';

export const useFanBlokiStore = defineStore('fanBloki', () => {
  // State
  const fanBloklari = ref([]);
  const fanBloki = ref({});
  const loading = ref(false);

  // Actions

  const getAllFanBloklari = async () => {
    loading.value = true;
    fanBloklari.value = (await FanBlokiService.getAll()).data;
    loading.value = false;
  };

  const getFanBloki = async (id) => {
    return (fanBloki.value = await FanBlokiService.get(id));
  };

  const createFanBloki = async (data) => {
    return await FanBlokiService.create(data);
  };

  const updateFanBloki = async (data) => {
    return await FanBlokiService.update(data.id, data);
  };

  const deleteFanBloki = async (id) => {
    return await FanBlokiService.delete(id);
  };

  return {
    fanBloklari,
    fanBloki,
    loading,
    getAllFanBloklari,
    getFanBloki,
    createFanBloki,
    updateFanBloki,
    deleteFanBloki,
  };
});
