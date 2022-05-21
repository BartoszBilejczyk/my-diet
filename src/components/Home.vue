<template>
  <div class="m-10">
    <AButton @click="createNewRow">Nowy wiersz</AButton>
    <ATable :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <ATypographyLink @click="save(record.key)">Zapisz</ATypographyLink>
              <APopconfirm title="Na pewno anulować?" @confirm="cancel(record.key)">
                <a class="mx-2">Anuluj</a>
              </APopconfirm>
            </span>
            <span v-else>
              <a class="mx-2" @click="edit(record.key)">Edytuj</a>
              <a class="mx-2" @click="deleteRow(record.key)">Usuń</a>
            </span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'date'">
          <div>
            {{ dayjs(text).format('DD MMM YYYY (dddd)') }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'training'">
          <ACheckbox
            v-if="editableData[record.key]"
            v-model:checked="editableData[record.key][column.dataIndex]"
          />
          <CheckOutlined v-else-if="Boolean(text)" style="color: green" />
          <CloseOutlined v-else style="color: red" />
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
  </div>
</template>

<script setup>
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { reactive, ref, onMounted } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import useFirebase from '../use-firebase';

  dayjs.locale('pl');

  const { getData, saveData } = useFirebase();

  const createNewRow = () => {
    dataSource.value.push({
      key: dataSource.value.length + 1,
      date: dataSource.value.length
        ? dayjs(dayjs(dataSource.value[dataSource.value.length - 1].date))
            .add(1, 'day')
            .format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      weight: 0,
      training: false,
      belly: 0,
      sleep: 0,
      steps: 0
    });

    saveData(dataSource.value);
  };

  const dataSource = ref([]);

  const columns = [
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
      title: 'Węgle',
      dataIndex: 'carbs'
    },
    {
      title: 'Tłuszcze',
      dataIndex: 'fat'
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
      title: 'Brzuch (cm)',
      dataIndex: 'belly'
    },
    {
      title: 'Sen',
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

  const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];

    saveData(dataSource.value);
  };

  const saveCurrentData = () => {
    saveData(dataSource.value);
  };

  const cancel = key => {
    delete editableData[key];
  };
</script>
