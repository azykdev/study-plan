<template>
  <section style="font-family: serif;">
    <!-- title -->
    <div id="title" class="text-center">
      <h6 class="text-sm font-semibold">OʻZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR VAZIRLIGI <br>
        "ZARMED UNIVERSTITETI" MCHJ </h6>
    </div>

    <!-- ISHCHI  O‘QUV REJA -->
    <div class="mt-5 text-center">
      <h6 class="font-semibold border-y-1 border-300">ISHCHI O‘QUV REJA</h6>

      <div class="grid mt-5">
        <div class="col-12 md:col-4">
          <h6>“TASDIQLAYMAN” <br>
            "ZARMED UNIVERSTITETI" <br>
            MCHJ direktori
          </h6>

          <p class="m-0 mt-5">__________ <span>A.D.Dalerov</span></p>
          <p>«____» _______________ <span>2023 yil</span></p>
        </div>

        <div class="col-12 md:col-4">
          <h6>Ta’lim yo‘nalishi:</h6>
          <h4 class="font-bold">60910200 –Davolash ishi</h4>
          <h6 class="mt-5">2023-2024 o'quv yili 1 -kurs</h6>
        </div>
        <div class="col-12 md:col-4">
          <h6>Akademik daraja – BAKALAVR</h6>
          <h6 class="mt-2">O‘qish muddati – 6 yil</h6>
          <h6 class="mt-2">Ta’lim shakli – kunduzgi</h6>
        </div>
      </div>
    </div>

    <!-- O‘QUV REJASI -->
    <div class="mt-5 text-center ">
      <h6 class="border-y-1 border-300 font-semibold">I. O‘QUV JARAYONI JADVALI</h6>

      <div class="overflow-x-auto" style="max-width: 100%;">
        <table class="mt-5  ">
          <thead>
            <tr>
              <td style="writing-mode:vertical-lr; transform: rotate(180deg);" rowspan="4">Kurs</td>
              <td colspan="52">Haftalar</td>
              <td colspan="5">O‘quv jarayoni <br> haftalari soni</td>
              <td rowspan="3" style="writing-mode:vertical-lr; transform: rotate(180deg); ">Ta’til haftalari soni</td>
              <td rowspan="3" style="writing-mode:vertical-lr; transform: rotate(180deg); ">Hammasi</td>
            </tr>
            <tr>
              <td v-for="month in months" :key="month.name" :colspan="month.colspan" rowspan="2">{{ month.name }}</td>

              <td style="writing-mode:vertical-lr; transform: rotate(180deg); " rowspan="2">Jami</td>
              <td colspan="4">Shundan</td>
            </tr>
            <tr>
              <td style="writing-mode:vertical-lr; transform: rotate(180deg); width: 0; ">Nazariy va amaliy ta’lim</td>
              <td style="writing-mode:vertical-lr; transform: rotate(180deg); width: 0; ">Attestatsiyalar</td>
              <td style="writing-mode:vertical-lr; transform: rotate(180deg); width: 0; ">Ishlab chiqarish(malaka) <br> amaliyoti
              </td>
              <td style="writing-mode:vertical-lr; transform: rotate(180deg); ">Fanlarni tanlash uchun <br> ro'yxatdan
                o'tish
              </td>
            </tr>
            <tr>
              <td v-for="num in 52" :key="num">{{ num }}</td>
              <td v-for="num in 7" :key="num"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableRows" :key="item">
              <td>{{ row.kurs }}</td>
              <td v-for="(td, tdIndex) in row.td_cells" :key="td" class="ma-0 pa-0">
                <!-- <study-process-table-menu v-if="tdIndex < 52" :rowIndex="rowIndex" :tdIndex="tdIndex" :td="td"
                  @item-selected="handleItemSelected"></study-process-table-menu> -->
                  <!-- <span class="p-3">{{ td }}</span> -->
                  <OquvRejaTableMenu v-if="tdIndex < 52">
                    
                  </OquvRejaTableMenu>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="53" class="text-end">Jami</td>
              <td>##</td>
              <td>180</td>
              <td>40</td>
              <td>18</td>
              <td>6</td>
              <td>64</td>
              <td>308</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <div class="mt-5 d-flex justify-space-between align-center flex-wrap">

          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
            </div>
            <h5>Nazariy va amaliy ta'lim</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-a mdi-36px"></span> -->
              A
            </div>
            <h5>Attestatsiyalar</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-m mdi-36px"></span> -->
              M
            </div>
            <h5>Ishlab chiqarish (malaka amaliyoti)</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-f mdi-36px ma-0 pa-0"></span> -->
              <!-- <span class="mdi mdi-alpha-t mdi-36px ma-0 pa-0"></span> -->
              FT
            </div>
            <h5>Fanlarni tanlash uchun ro'yxatdan o'tish</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-d mdi-36px"></span> -->
              D
            </div>
            <h5>Davlat attestatsiya</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-t mdi-36px"></span> -->
              T
            </div>
            <h5>Ta'til</h5>
          </div>
          <div class="pa-2">
            <div class="border d-flex align-center justify-center" style="width: 60px; height: 40px; margin: 0 auto;">
              <!-- <span class="mdi mdi-alpha-i mdi-36px"></span> -->
              I
            </div>
            <h5>Integrallashgan imtihon</h5>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import OquvRejaTableMenu from '../../components/kaf-mudiri/OquvRejaTableMenu.vue';

const selectedCity = ref();
const cities = ref([
    { name: 'A', code: 'NY' },
    { name: 'B', code: 'RM' },
    { name: 'C', code: 'LDN' },
    { name: 'D', code: 'IST' },
    { name: 'G', code: 'PRS' }
]);

const months = ref([
  {
    name: 'Sentyabr',
    colspan: 5
  },
  {
    name: 'Oktyabr',
    colspan: 4
  },
  {
    name: 'Noyabr',
    colspan: 4
  },
  {
    name: 'Dekabr',
    colspan: 4
  },
  {
    name: 'Yanvar',
    colspan: 4
  },
  {
    name: 'Fevral',
    colspan: 5
  },
  {
    name: 'Mart',
    colspan: 4
  },
  {
    name: 'Aprel',
    colspan: 4
  },
  {
    name: 'May',
    colspan: 5
  },
  {
    name: 'Iyun',
    colspan: 4
  },
  {
    name: 'Iyul',
    colspan: 5
  },
  {
    name: 'Avgust',
    colspan: 4
  },
])

const tableRows = ref([
  {
    kurs: 'I',
    td_cells: [
      'A', 'T', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
  {
    kurs: 'II',
    td_cells: [
      'FT', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
  {
    kurs: 'III',
    td_cells: [
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
  {
    kurs: 'IV',
    td_cells: [
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
  {
    kurs: 'V',
    td_cells: [
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
  {
    kurs: 'VI',
    td_cells: [
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
    ]
  },
])

// Methods

const handleItemSelected = (val, rowIndex, tdIndex) => {
  console.log(val, rowIndex, tdIndex);

  tableRows.value[rowIndex].td_cells[tdIndex] = val;

  console.log(tableRows.value);
}
</script>

<style scoped>
table,
td,
th {
  border: 1px solid #333;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
}

</style>