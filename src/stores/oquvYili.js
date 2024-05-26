import { defineStore } from 'pinia';
import { ref } from 'vue';
import { oquvYiliService } from '../service/oquvYiliService';

export const useOquvYiliStore = defineStore('oquvYili', () => {
  // State
  const oquvYillari = ref([]);
  const oquvYili = ref({});
  const loading = ref(false);

  // Actions
  // const getAllOquvYillari = () => {
  //   return new Promise(resolve => {
  //     oquvYiliService.getAll().then((response) => {
  //       console.log(response);
  //       oquvYillari.value = response.data;
  //       resolve(response);
  //     })
  //   })
  // };

  const getAllOquvYillari = async () => {
    loading.value = true;
    oquvYillari.value = (await oquvYiliService.getAll()).data;
    loading.value = false;
  };

  const getOquvYili = async (id) => {
    return (oquvYili.value = await oquvYiliService.get(id));
  };

  const createOquvYili = async (data) => {
    return await oquvYiliService.create(data);
  };

  const updateOquvYili = async (data) => {
    return await oquvYiliService.update(data.id, data);
  };

  const deleteOquvYili = async (id) => {
    return await oquvYiliService.delete(id);
  };

  return { oquvYillari, oquvYili, loading, getAllOquvYillari, getOquvYili, createOquvYili, updateOquvYili, deleteOquvYili };
});
