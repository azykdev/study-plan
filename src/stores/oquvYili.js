import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OquvYiliService } from '../service/oquvYiliService';

export const useOquvYiliStore = defineStore('oquvYili', () => {
  // State
  const oquvYillari = ref([]);
  const oquvYili = ref({});
  const loading = ref(false);

  // Actions
  // const getAllOquvYillari = () => {
  //   return new Promise(resolve => {
  //     OquvYiliService.getAll().then((response) => {
  //       console.log(response);
  //       oquvYillari.value = response.data;
  //       resolve(response);
  //     })
  //   })
  // };

  const getAllOquvYillari = async () => {
    loading.value = true;
    oquvYillari.value = (await OquvYiliService.getAll()).data;
    loading.value = false;
  };

  const getOquvYili = async (id) => {
    return (oquvYili.value = await OquvYiliService.get(id));
  };

  const createOquvYili = async (data) => {
    return await OquvYiliService.create(data);
  };

  const updateOquvYili = async (data) => {
    return await OquvYiliService.update(data.id, data);
  };

  const deleteOquvYili = async (id) => {
    return await OquvYiliService.delete(id);
  };

  return { oquvYillari, oquvYili, loading, getAllOquvYillari, getOquvYili, createOquvYili, updateOquvYili, deleteOquvYili };
});
