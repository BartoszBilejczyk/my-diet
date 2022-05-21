<template>
  <div class="m-10">
    <ATable :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <ATypographyLink @click="save(record.key)">Save</ATypographyLink>
              <APopconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                <a>Cancel</a>
              </APopconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
        <template v-else>
          <div>
            <a-input
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
  import { ref, reactive } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';

  const dataSource = ref([
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]);

  const columns = ref([
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%'
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%'
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%'
    },
    {
      title: 'operation',
      dataIndex: 'operation'
    }
  ]);

  const editableData = reactive({});

  const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };

  const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };

  const cancel = key => {
    delete editableData[key];
  };
</script>
