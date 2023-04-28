<template>
  <q-table class="main-users__content_table" :rows="rows" :columns="columns" :rows-per-page-options="[10]" row-key="name">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <div class="main-users__content_table_row">{{ props.row.name }}</div>
          <!-- <q-popup-edit v-model="props.row.name" title="Edit the Name" auto-save v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </q-popup-edit> -->
        </q-td>
        <q-td class="main-users__content_table_row" key="role" :props="props">
          <div>{{ props.row.role }}</div>
          <!-- <q-popup-edit v-model.number="props.row.role" auto-save v-slot="scope">
                  <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit> -->
        </q-td>
        <q-td key="edit" :props="props">
          <!-- {{ props.row.edit }} -->
          <q-btn round color="green" icon="edit" @click="editUser(props.row.id)" />
          <!-- <q-popup-edit disable v-model="props.row.edit" auto-save v-slot="scope">
                  <div class="text-italic text-primary q-mb-xs">
                    My Custom Title
                  </div>

                  <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit> -->
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="js">
import { defineComponent } from 'vue'

const columns = [
  { name: 'name', align: 'left', label: 'Имя', field: 'name' },
  { name: 'role', align: 'center', label: 'Роль', field: 'role' },
  { name: 'edit', label: 'Редактировать', field: 'edit' },
]

const rows = [
  {
    id: 1,
    name: 'Пользователь 1',
    role: 'Администратор',
    edit: "edit",
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    role: 'Пользователь',
    edit: "edit2",
  },
  {
    id: 3,
    name: 'Eclair',
    role: 'Пользователь',
    edit: "edit3",
  },
  {
    id: 4,
    name: 'Cupcake',
    role: 'Администратор',
    edit: "edit4",
  },
  {
    id: 5,
    name: 'Eclair',
    role: 'Пользователь',
    edit: "edit3",
  },
  {
    id: 6,
    name: 'Cupcake',
    role: 'Администратор',
    edit: "edit4",
  },
  {
    id: 7,
    name: 'Eclair',
    role: 'Пользователь',
    edit: "edit3",
  },
  {
    id: 8,
    name: 'Cupcake',
    role: 'Администратор',
    edit: "edit4",
  },
]

export default defineComponent({
  name: "HomeusersComponent",
  setup() {
    const editUser = (id) => {
      console.log("id --->", id)
    }

    return {
      columns,
      rows,
      editUser
    }
  }
})
</script>

<style lang="scss" scoped>
.main-users__content_table {
  width: 100%;
}

.main-users__content_table_row {
  font-size: 14px;
}

@media (max-width: 1440px) {
  .main-users__content_table_row {
    font-size: 13px;
  }
}

@media (max-width: 1280px) {
  .main-users__content_table_row {
    font-size: 12px;
  }
}

@media (max-width: 428px) {
  .main-users__content_table_row {
    font-size: 11px;
  }
}
</style>
