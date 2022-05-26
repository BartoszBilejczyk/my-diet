<template>
  <div class="m-10">
    <div class="flex flex-wrap">
      <div class="w-1/3 p-4" v-for="value in charts">
        <BarChart :height="300" :chartData="value" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { BarChart } from 'vue-chart-3';
  import useFirebase from '../use-firebase';

  const { getData } = useFirebase();
  const dataSource = ref([]);

  const labels = Array.from({ length: 31 }, (v, i) => i + 1);

  const charts = {
    sleep: {
      labels,
      datasets: [
        {
          label: 'sleep',
          data: labels
        }
      ]
    },
    steps: {
      labels,
      datasets: [
        {
          label: 'steps',
          data: labels
        }
      ]
    },
    belly: {
      labels,
      datasets: [
        {
          label: 'belly',
          data: labels
        }
      ]
    },
    caffeine: {
      labels,
      datasets: [
        {
          label: 'caffeine',
          data: labels
        }
      ]
    },
    training: {
      labels,
      datasets: [
        {
          label: 'training',
          data: labels
        }
      ]
    },
    stretch: {
      labels,
      datasets: [
        {
          label: 'stretch',
          data: labels
        }
      ]
    },
    meditation: {
      labels,
      datasets: [
        {
          label: 'meditation',
          data: labels
        }
      ]
    },
    kcal: {
      labels,
      datasets: [
        {
          label: 'kcal',
          data: labels
        }
      ]
    },
    protein: {
      labels,
      datasets: [
        {
          label: 'protein',
          data: labels
        }
      ]
    },
    carbs: {
      labels,
      datasets: [
        {
          label: 'carbs',
          data: labels
        }
      ]
    },
    fat: {
      labels,
      datasets: [
        {
          label: 'fat',
          data: labels
        }
      ]
    },
    weight: {
      labels,
      datasets: [
        {
          label: 'weight',
          data: labels
        }
      ]
    }
  };

  onMounted(async () => {
    const { data } = await getData();
    dataSource.value = data;
  });
</script>
