<template>
  <div class="m-10">
    <AButton @click="createNewRow">Nowy wiersz</AButton>
    {{ editableData['2']?.food }}
    <ATable :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, text, record }">
        <AModal
          v-if="column.dataIndex === 'kcal' && record.key === editableData[record.key]?.key"
          v-model:visible="visible"
          @ok="handleOk(record.key)"
          style="width: auto; min-width: 50vw; max-width: 600px"
        >
          <ATable
            class="p-4"
            :dataSource="editableData[record.key]?.food"
            :columns="foodColumns"
            :pagination="false"
          >
            <template #bodyCell="{ column: foodColumn, text: foodText, record: foodRecord }">
              <template v-if="foodColumn.dataIndex === 'operation'">
                <div class="editable-row-operations">
                  <a class="mx-2" @click="deleteFoodRow(record.key, foodRecord.key)">Usuń</a>
                </div>
              </template>
              <template v-else>
                <AInput
                  v-if="editableData[record.key].food.find(item => item.key === foodRecord.key)"
                  v-model:value="
                    editableData[record.key].food.find(item => item.key === foodRecord.key)[
                      foodColumn.dataIndex
                    ]
                  "
                  style="margin: -5px 0"
                />
              </template>
            </template>
          </ATable>
          <AButton class="mt-6" @click="createNewFoodRow(record.key)">Nowy posiłek</AButton>
          <div class="mt-6">
            <AButton
              class="mr-4"
              v-for="meal in predefinedMeals"
              @click="createNewFoodRow(record.key, makePredefined(meal))"
            >
              {{ meal.meal }}
            </AButton>
          </div>
        </AModal>
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <ATypographyLink @click="save(record.key)">Zapisz</ATypographyLink>
              <APopconfirm title="Na pewno anulować?" @confirm="cancel(record.key)">
                <a class="mx-2">Anuluj</a>
              </APopconfirm>
            </span>
            <span v-else>
              <a class="mx-2" @click="markAsDone(record.key)">Done</a>
              <a class="mx-2" @click="edit(record.key)">Edytuj</a>
              <a class="mx-2" @click="openFoodModal(record.key)">Jedzenie</a>
              <a class="mx-2" @click="deleteRow(record.key)">Usuń</a>
            </span>
          </div>
        </template>
        <template v-else-if="['kcal', 'protein', 'carbs', 'fat'].includes(column.dataIndex)">
          <div>
            {{ text }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'date'">
          <div>
            {{ dayjs(text).format('DD MMM YYYY (dddd)') }}
          </div>
        </template>
        <template
          v-else-if="['sauna', 'meditation', 'training', 'done'].includes(column.dataIndex)"
        >
          <ACheckbox
            v-if="editableData[record.key]"
            v-model:checked="editableData[record.key][column.dataIndex]"
          />
          <QuestionCircleOutlined v-else-if="text === null" style="font-size: 20px" />
          <CheckOutlined v-else-if="Boolean(text)" style="color: green; font-size: 20px" />
          <CloseOutlined v-else style="color: red; font-size: 20px" />
        </template>
        <template v-else>
          <div>
            <AInput
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
      </template>
    </ATable>

    <div>
      <button @click="saveBackup">Save as backup</button>
    </div>
  </div>
</template>

<script setup>
  import { CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { reactive, ref, onMounted } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import useFirebase from '../use-firebase';
  import { nanoid } from 'nanoid';
  import { makePredefined, predefinedMeals } from '../helpers/predefined';

  dayjs.locale('pl');

  const { getData, saveData, saveBackup } = useFirebase();

  const foodRow = () => ({
    key: nanoid(),
    meal: '',
    kcal: '0',
    protein: '0',
    carbs: '0',
    fat: '0'
  });

  const createNewRow = () => {
    dataSource.value.push({
      done: false,
      key: nanoid(),
      date: dataSource.value.length
        ? dayjs(dayjs(dataSource.value[dataSource.value.length - 1].date))
            .add(1, 'day')
            .format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
      kcal: '0',
      protein: '0',
      carbs: '0',
      fat: '0',
      division: '0',
      weight: '0',
      training: null,
      sauna: null,
      meditation: null,
      belly: '0',
      caffeine: '0',
      sleep: '0',
      steps: '0',
      food: [{ ...foodRow() }]
    });

    saveData(dataSource.value);
  };

  const createNewFoodRow = (key, newRow = { ...foodRow() }) => {
    editableData[key].food.push(newRow);
  };

  const dataSource = ref([]);

  const foodColumns = [
    {
      title: 'Nazwa',
      dataIndex: 'meal'
    },
    {
      title: 'Kcal',
      dataIndex: 'kcal'
    },
    {
      title: 'Białko',
      dataIndex: 'protein'
    },
    {
      title: 'Tłuszcze',
      dataIndex: 'fat'
    },
    {
      title: 'Węgle',
      dataIndex: 'carbs'
    },
    {
      dataIndex: 'operation'
    }
  ];

  const columns = [
    {
      title: 'Done?',
      dataIndex: 'done'
    },
    {
      title: 'Data',
      dataIndex: 'date'
    },
    {
      title: 'Kcal',
      dataIndex: 'kcal'
    },
    {
      title: 'Białko',
      dataIndex: 'protein'
    },
    {
      title: 'Tłuszcze',
      dataIndex: 'fat'
    },
    {
      title: 'Węgle',
      dataIndex: 'carbs'
    },
    {
      title: 'Rozkład (B/T/W)',
      dataIndex: 'division'
    },
    {
      title: 'Waga',
      dataIndex: 'weight'
    },
    {
      title: 'Trening',
      dataIndex: 'training'
    },
    {
      title: 'Stretch/Sauna',
      dataIndex: 'sauna'
    },
    {
      title: 'Medytacja',
      dataIndex: 'meditation'
    },
    {
      title: 'Brzuch (cm)',
      dataIndex: 'belly'
    },
    {
      title: 'Kofeina (mg)',
      dataIndex: 'caffeine'
    },
    {
      title: 'Sen (h)',
      dataIndex: 'sleep'
    },
    {
      title: 'Kroki',
      dataIndex: 'steps'
    },
    {
      dataIndex: 'operation'
    }
  ];

  onMounted(async () => {
    const { data } = await getData();
    dataSource.value = data;
  });

  const editableData = reactive({});

  const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };

  const deleteRow = key => {
    const newData = dataSource.value.filter(item => key !== item.key);

    dataSource.value = newData;
    saveData(newData);
  };

  const deleteFoodRow = (key, foodKey) => {
    editableData[key].food = editableData[key].food.filter(item => {
      return foodKey !== item.key;
    });
  };

  const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];

    saveData(dataSource.value);
  };

  const cancel = key => {
    delete editableData[key];
  };

  const markAsDone = key => {
    edit(key);
    editableData[key].done = true;
    save(key);
  };

  // modal
  const visible = ref(false);

  const openFoodModal = key => {
    edit(key);
    setTimeout(() => {
      visible.value = true;
    }, 100);
  };

  const calculatePercentage = (key, childKey, factor = 4) => {
    return (
      (((editableData[key][childKey] * factor) / editableData[key].kcal) * 100).toFixed() + '%'
    );
  };

  const handleOk = key => {
    ['kcal', 'protein', 'fat', 'carbs'].forEach(item => {
      editableData[key][item] = editableData[key].food.reduce((acc, curr) => {
        acc += Number(curr[item]);
        return Number(acc);
      }, 0);
    });

    editableData[key].division = `${calculatePercentage(key, 'protein')} | ${calculatePercentage(
      key,
      'fat',
      9
    )} | ${calculatePercentage(key, 'carbs')}`;

    save(key);
    visible.value = false;
  };
</script>

<style>
  .ant-modal-body {
    min-width: 700px !important;
  }
</style>
