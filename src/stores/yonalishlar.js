import { defineStore } from 'pinia';
import { ref } from 'vue';
import { yonalishlarService } from '../service/yonalishlarService';

export const useYonalishlarStore = defineStore('yonalishlar', () => {
  // State
  const yonalishlar = ref([]);
  const yonalish = ref({});
  const loading = ref(false);

  // Actions
  // const getAllOquvYillari = () => {
  //   return new Promise(resolve => {
  //     yonalishService.getAll().then((response) => {
  //       console.log(response);
  //       oquvYillari.value = response.data;
  //       resolve(response);
  //     })
  //   })
  // };

  const getAllYonalishlar = async () => {
    loading.value = true;
    yonalishlar.value = (await yonalishlarService.getAll()).data;
    loading.value = false;
  };

  const getYonalish = async (id) => {
    return (yonalish.value = await yonalishlarService.get(id));
  };

  const createYonalish = async (data) => {
    return await yonalishlarService.create(data);
  };

  const updateYonalish = async (data) => {
    return await yonalishlarService.update(data.id, data);
  };

  const deleteYonalish = async (id) => {
    return await yonalishlarService.delete(id);
  };

  return { yonalishlar, yonalish, loading, getAllYonalishlar, getYonalish, createYonalish, updateYonalish, deleteYonalish };
});
