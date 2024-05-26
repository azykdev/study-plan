import { defineStore } from 'pinia';
import { ref } from 'vue';
import { KafedraService } from '../service/kafedraService';

export const useKafedraStore = defineStore('kafedra', () => {
  // State
  const kafedralar = ref([]);
  const kafedra = ref({});
  const loading = ref(false);

  // Actions

  const getAllKafedralar = async () => {
    loading.value = true;
    kafedralar.value = (await KafedraService.getAll()).data;
    loading.value = false;
  };

  const getKafedra = async (id) => {
    return (kafedra.value = await KafedraService.get(id));
  };

  const createKafedra = async (data) => {
    return await KafedraService.create(data);
  };

  const updateKafedra = async (data) => {
    return await KafedraService.update(data.id, data);
  };

  const deleteKafedra = async (id) => {
    return await KafedraService.delete(id);
  };

  return { kafedralar, kafedra, loading, getAllKafedralar, getKafedra, createKafedra, updateKafedra, deleteKafedra };
});
