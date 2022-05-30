<template>
  <div class="m-10" v-if="dataSource.length">
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
        <div class="p-4">
          <div>
            Średnia 7-dniowa
            <b>{{ value.sevenDayAvg }}</b>
          </div>
          <div>
            Średnia 30-dniowa
            <b>{{ value.thirtyDayAvg }}</b>
          </div>
        </div>
      </div>
    </div>
    {{ getAverage('sleep') }}
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
  const selectedMonth = ref(dayjs().month() + 1);
  const daysInMonth = computed(() => dayjs(selectedMonth.value).daysInMonth());

  const monthFilteredData = computed(() => {
    return dataSource.value.filter(row => dayjs(row.date).month() === selectedMonth.value - 1);
  });

  const labels = computed(() => monthFilteredData.value.map(row => dayjs(row.date).format('D/MM')));

  const getDataSet = label => {
    return [
      {
        label: label.toUpperCase(),
        data: monthFilteredData.value.map(e => e[label]),
        backgroundColor: 'darkgreen'
      }
    ];
  };

  const getAverage = (key, days = 7) => {
    const data = dataSource.value.slice(-days).filter(item => Number(item[key]) !== 0);
    const sum = data.reduce((a, b) => Number(a) + Number(b[key]), 0);
    return (sum / data.length).toFixed(0);
  };

  const charts = computed(() => {
    const defaultPlugins = {
      legend: {
        align: 'start',
        labels: {
          font: {
            size: 20
          }
        }
      }
    };

    return {
      sleep: {
        labels: labels.value,
        datasets: getDataSet('sleep'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('sleep'),
        thirtyDayAvg: getAverage('sleep', 30)
      },
      steps: {
        labels: labels.value,
        datasets: getDataSet('steps'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('steps'),
        thirtyDayAvg: getAverage('steps', 30)
      },
      belly: {
        labels: labels.value,
        datasets: getDataSet('belly'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('belly'),
        thirtyDayAvg: getAverage('belly', 30)
      },
      caffeine: {
        labels: labels.value,
        datasets: getDataSet('caffeine'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('caffeine'),
        thirtyDayAvg: getAverage('caffeine', 30)
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
        datasets: getDataSet('kcal'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('kcal'),
        thirtyDayAvg: getAverage('kcal', 30)
      },
      protein: {
        labels: labels.value,
        datasets: getDataSet('protein'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('protein'),
        thirtyDayAvg: getAverage('protein', 30)
      },
      carbs: {
        labels: labels.value,
        datasets: getDataSet('carbs'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('carbs'),
        thirtyDayAvg: getAverage('carbs', 30)
      },
      fat: {
        labels: labels.value,
        datasets: getDataSet('fat'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('fat'),
        thirtyDayAvg: getAverage('fat', 30)
      },
      weight: {
        labels: labels.value,
        datasets: getDataSet('weight'),
        options: {
          plugins: defaultPlugins
        },
        sevenDayAvg: getAverage('weight'),
        thirtyDayAvg: getAverage('weight', 30)
      }
    };
  });

  onMounted(async () => {
    const { data } = await getData();
    dataSource.value = data;
  });
</script>
