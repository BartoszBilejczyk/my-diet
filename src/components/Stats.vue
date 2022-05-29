<template>
  <div class="m-10">
    <div>
      <ASelect
        class="w-64"
        v-if="months.length"
        :value="selectedMonth"
        @change="selectedMonth = $event"
      >
        <ASelectOption v-for="month in months" :value="month.value">
          {{ month.label }}
        </ASelectOption>
      </ASelect>
    </div>
    <div class="flex flex-wrap">
      <div class="w-1/3 p-4 my-6" v-for="value in charts">
        <BarChart :height="300" :chartData="value" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { BarChart } from 'vue-chart-3';
  import useFirebase from '../use-firebase';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';

  const { getData } = useFirebase();
  const dataSource = ref([]);
  dayjs.locale('pl');

  const months = ref(
    Array.from({ length: 12 }, (v, i) => {
      return {
        label: dayjs().month(i).format('MMMM'),
        value: Number(dayjs().month(i).format('M'))
      };
    })
  );
  const selectedMonth = ref(0);
  const daysInMonth = computed(() => dayjs(selectedMonth.value).daysInMonth());

  const labels = computed(() => {
    console.log(selectedMonth.value);
    return dataSource.value
      .filter(row => dayjs(row.date).month() === selectedMonth)
      .map(row => dayjs(row.date).format('D/MM'));
  });

  const getDataSet = label => {
    console.log(selectedMonth.value);
    const elo = dataSource.value.filter(
      row => Number(dayjs(row.date).format('M')) === selectedMonth
    );

    return [
      {
        label: label.toUpperCase(),
        data: elo.map(e => e[label]),
        backgroundColor: 'darkgreen'
      }
    ];
  };

  const charts = computed(() => {
    return {
      sleep: {
        labels: labels.value,
        datasets: getDataSet('sleep')
      },
      steps: {
        labels: labels.value,
        datasets: getDataSet('steps')
      },
      belly: {
        labels: labels.value,
        datasets: getDataSet('belly')
      },
      caffeine: {
        labels: labels.value,
        datasets: getDataSet('caffeine')
      },
      // training: {
      //   labels: labels.value,
      //   datasets: getDataSet('training')
      // },
      // stretch: {
      //   labels: labels.value,
      //   datasets: getDataSet('stretch')
      // },
      // meditation: {
      //   labels: labels.value,
      //   datasets: getDataSet('meditation')
      // },
      kcal: {
        labels: labels.value,
        datasets: getDataSet('kcal')
      },
      protein: {
        labels: labels.value,
        datasets: getDataSet('protein')
      },
      carbs: {
        labels: labels.value,
        datasets: getDataSet('carbs')
      },
      fat: {
        labels: labels.value,
        datasets: getDataSet('fat')
      },
      weight: {
        labels: labels.value,
        datasets: getDataSet('weight')
      }
    };
  });

  onMounted(async () => {
    const { data } = await getData();
    dataSource.value = data;
    selectedMonth.value = dayjs().month();
  });
</script>
