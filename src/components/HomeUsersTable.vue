<template>
  <q-table class="main-users__content_table" :rows="usersConfirm" :columns="columns" :rows-per-page-options="[10]"
    row-key="name">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="username" :props="props">
          <div class="main-users__content_table_row">{{ props.row.username }}</div>
        </q-td>
        <q-td class="main-users__content_table_row" key="email" :props="props">
          <div>{{ props.row.tele_id }}</div>
        </q-td>
        <q-td class="main-users__content_table_row" key="email" :props="props">
          <div>{{ props.row.email }}</div>
        </q-td>
        <q-td class="main-users__content_table_row" key="role" :props="props">
          <div>{{ props.row.role === 'user' ? 'пользователь' : props.row.role === 'admin' ? 'администратор' :
            props.row.role === 'super-admin' ? 'супер администратор' : '' }}</div>
        </q-td>
        <q-td key="edit" :props="props">
          <q-btn round color="green" icon="edit" @click="editUser(props.row.id)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useAdminStore } from "../stores/admin"

const columns = [
  { name: 'username', align: 'left', label: 'Имя', field: 'username' },
  { name: 'tele_id', align: 'center', label: 'Telegram Id', field: 'tele_id' },
  { name: 'email', align: 'center', label: 'Почта', field: 'email' },
  { name: 'role', align: 'center', label: 'Роль', field: 'role' },
  { name: 'edit', label: 'Редактировать', field: 'edit' },
]

export default defineComponent({
  name: "HomeusersComponent",
  setup() {
    const { usersConfirm } = storeToRefs(useAdminStore())
    const adminStore = useAdminStore()

    const editUser = (id) => {
      console.log("id --->", id)
    }

    return {
      usersConfirm,
      columns,
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
