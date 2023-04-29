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
  <q-table class="main-confirm__content_table" :rows="usersUnConfirm" :columns="columns" :rows-per-page-options="[10]"
    row-key="username">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="username" :props="props">
          <div class="main-confirm__content_table_row">{{ props.row.username }}</div>
        </q-td>
        <q-td class="main-confirm__content_table_row" key="email" :props="props">
          <div>{{ props.row.email }}</div>
        </q-td>
        <q-td key="edit" :props="props">
          <q-btn round color="green" icon="check" @click="confirmUserDialog(props.row.id, props.row.username)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAdminStore } from "../stores/admin"

const columns = [
  { name: 'username', align: 'left', label: 'Имя', field: 'username' },
  { name: 'email', align: 'left', label: 'Почта', field: 'email' },
  { name: 'edit', label: 'Подтверждение', field: 'confirm' },
]

export default defineComponent({
  name: "HomeConfirmTableComponent",
  setup() {
    const { usersUnConfirm } = storeToRefs(useAdminStore())
    const adminStore = useAdminStore()

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

    const confirmUser = async () => {
      isConfirmUser.value = false
      const formData = {
        id: confirmUserData.value.id
      }
      await adminStore.actUserConfirmAccount(formData)
    }

    return {
      usersUnConfirm,
      columns,
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
