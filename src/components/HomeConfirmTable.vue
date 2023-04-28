<template>
  <q-dialog v-model="isConfirmUser" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="thumb_up_alt" color="green" text-color="white" />
        <span class="q-ml-sm">
          Вы действительно хотите подтвердить аккаунт пользователя: <b>{{ confirmUserData.name }}</b> ?
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="green" v-close-popup />
        <q-btn flat label="Подтвердить" color="green" @click="confirmUser" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-table class="main-confirm__content_table" :rows="rows" :columns="columns" :rows-per-page-options="[10]"
    row-key="name">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <div class="main-confirm__content_table_row">{{ props.row.name }}</div>
        </q-td>
        <q-td class="main-confirm__content_table_row" key="role" :props="props">
          <div>{{ props.row.role }}</div>
        </q-td>
        <q-td key="edit" :props="props">
          <q-btn round color="green" icon="check" @click="confirmUserDialog(props.row.id, props.row.name)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

const columns = [
  { name: 'name', align: 'left', label: 'Имя', field: 'name' },
  { name: 'edit', label: 'Подтверждение', field: 'confirm' },
]

const rows = [
  {
    id: 1,
    name: 'Пользователь 1',
    confirm: "edit",
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    confirm: "edit2",
  },
  {
    id: 3,
    name: 'Eclair',
    confirm: "edit3",
  },
  {
    id: 4,
    name: 'Cupcake',
    confirm: "edit4",
  },
  {
    id: 5,
    name: 'Eclair',
    confirm: "edit3",
  },
  {
    id: 6,
    name: 'Cupcake',
    confirm: "edit4",
  },
  {
    id: 7,
    name: 'Eclair',
    confirm: "edit3",
  },
  {
    id: 8,
    name: 'Cupcake',
    confirm: "edit4",
  },
  {
    id: 9,
    name: 'Eclair',
    confirm: "edit3",
  },
  {
    id: 10,
    name: 'Cupcake1',
    confirm: "edit4",
  },
  {
    id: 11,
    name: 'Eclair2',
    confirm: "edit3",
  },
  {
    id: 12,
    name: 'Cupcake3',
    confirm: "edit4",
  },
]

export default defineComponent({
  name: "HomeConfirmTableComponent",
  setup() {
    const isConfirmUser = ref(false)
    const confirmUserData = ref({
      id: 0,
      name: ""
    })

    const confirmUserDialog = (id, name) => {
      confirmUserData.value.id = id
      confirmUserData.value.name = name
      isConfirmUser.value = true
    }

    const confirmUser = () => {
      isConfirmUser.value = false
      console.log("confirmUserData -->", confirmUserData.value)
    }

    return {
      columns,
      rows,
      confirmUserDialog,
      isConfirmUser,
      confirmUserData,
      confirmUser
    }
  }
})
</script>

<style lang="scss" scoped>
.main-confirm__content_table {
  width: 100%;
}

.main-confirm__content_table_row {
  font-size: 14px;
}

@media (max-width: 1440px) {
  .main-confirm__content_table_row {
    font-size: 13px;
  }
}

@media (max-width: 1280px) {
  .main-confirm__content_table_row {
    font-size: 12px;
  }
}

@media (max-width: 428px) {
  .main-confirm__content_table_row {
    font-size: 11px;
  }
}
</style>
