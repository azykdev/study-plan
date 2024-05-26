import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TalimShakliService } from '../service/talimShakliService';

export const useTalimShakliStore = defineStore('talimShakli', () => {
  // State
  const talimShakllari = ref([]);
  const talimShakli = ref({});
  const loading = ref(false);

  // Actions

  const getAllTalimShakllari = async () => {
    loading.value = true;
    talimShakllari.value = (await TalimShakliService.getAll()).data;
    loading.value = false;
  };

  const getTalimShakli = async (id) => {
    return (talimShakli.value = await TalimShakliService.get(id));
  };

  const createTalimShakli = async (data) => {
    return await TalimShakliService.create(data);
  };

  const updateTalimShakli = async (data) => {
    return await TalimShakliService.update(data.id, data);
  };

  const deleteTalimShakli = async (id) => {
    return await TalimShakliService.delete(id);
  };

  return { talimShakllari, talimShakli, loading, getAllTalimShakllari, getTalimShakli, createTalimShakli, updateTalimShakli, deleteTalimShakli };
});
