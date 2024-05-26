import { defineStore } from 'pinia';
import { ref } from 'vue';
import { YonalishlarService } from '../service/yonalishlarService';

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
    yonalishlar.value = (await YonalishlarService.getAll()).data;
    loading.value = false;
  };

  const getYonalish = async (id) => {
    return (yonalish.value = await YonalishlarService.get(id));
  };

  const createYonalish = async (data) => {
    return await YonalishlarService.create(data);
  };

  const updateYonalish = async (data) => {
    return await YonalishlarService.update(data.id, data);
  };

  const deleteYonalish = async (id) => {
    return await YonalishlarService.delete(id);
  };

  return { yonalishlar, yonalish, loading, getAllYonalishlar, getYonalish, createYonalish, updateYonalish, deleteYonalish };
});
