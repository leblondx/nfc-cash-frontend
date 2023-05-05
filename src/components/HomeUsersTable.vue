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
          <q-btn round color="green" icon="edit" @click="showDialogChangeUser(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog v-model="isChangeDialog">
    <q-card>
      <div class="main-users__dialog">
        <q-toolbar>
          <q-avatar>
            <q-icon class="main-users__dialog_icon" name="account_circle" />
          </q-avatar>
          <q-toolbar-title>
            <span class="text-weight-bold main-users__dialog_title" style="color: #1b5e20">
              Изменить пользователя
            </span>
          </q-toolbar-title>
          <q-btn class="main-users__dialog_close" flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <form class="main-users__dialog_form" @submit.prevent="submitChangeUserForm">
            <div class="main-users__dialog_form_row">
              <div class="main-users__dialog_form_row_label">
                <label for="name">Имя</label>
              </div>
              <input class="main-users__dialog_form_row_input" :class="{ 'input-error': v$.name.$errors.length > 0 }"
                id="name" type="text" placeholder="Имя" v-model.trim="changeUserForm.name" @blur="v$.name.$touch()">
              <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите имя" : "" }}
                </div>
              </div>
            </div>
            <div class="main-users__dialog_form_row">
              <div class="main-users__dialog_form_row_label">
                <label for="tele_id">Telegram Id</label>
              </div>
              <input class="main-users__dialog_form_row_input" :class="{ 'input-error': v$.tele_id.$errors.length > 0 }"
                id="tele_id" type="text" placeholder="Telegram Id" v-model.trim="changeUserForm.tele_id"
                @blur="v$.tele_id.$touch()">
              <div class="input-errors" v-for="error of v$.tele_id.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите telegram Id" : ""
                }}
                </div>
              </div>
            </div>
            <div class="main-users__dialog_form_row">
              <div class="main-users__dialog_form_row_label">
                <label for="email">Почта</label>
              </div>
              <input class="main-users__dialog_form_row_input" :class="{ 'input-error': v$.email.$errors.length > 0 }"
                id="email" type="text" placeholder="Email" v-model.trim="changeUserForm.email" @blur="v$.email.$touch()">
              <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите email" :
                  error.$message === "Value is not a valid email address" ?
                    "Значение не является действительным адресом электронной почты" : "" }}
                </div>
              </div>
            </div>
            <div class="main-users__dialog_form_row">
              <div class="main-users__dialog_form_row_label">
                <label for="role">Роль (admin, user)</label>
              </div>
              <input class="main-users__dialog_form_row_input" :class="{ 'input-error': v$.role.$errors.length > 0 }"
                id="role" type="text" placeholder="Telegram Id" v-model.trim="changeUserForm.role"
                @blur="v$.role.$touch()">
              <div class="input-errors" v-for="error of v$.role.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите роль пользователя"
                  : ""
                }}
                </div>
              </div>
            </div>
            <div class="main-users__dialog_form_btn">
              <button :disabled="isButtonDisabled" @click.prevent="submitChangeUserForm">Сохранить</button>
            </div>
          </form>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

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
    const $q = useQuasar()

    const notifyNeed = (needMessage, needType, needPosition, needTimeout) => {
      $q.notify({
        type: needType,
        message: needMessage,
        progress: true,
        position: needPosition,
        timeout: needTimeout
      })
    }

    const { usersConfirm } = storeToRefs(useAdminStore())
    const adminStore = useAdminStore()

    const isChangeDialog = ref(false)
    const changeUserForm = ref({
      id: 0,
      name: "",
      tele_id: "",
      email: "",
      role: ""
    })
    const isButtonDisabled = ref(false)

    const rules = {
      name: {
        required
      },
      tele_id: {
        required
      },
      email: {
        required,
        email
      },
      role: {
        required
      }
    }

    const v$ = useVuelidate(rules, changeUserForm)

    const showDialogChangeUser = (data) => {
      changeUserForm.value.id = data.id
      changeUserForm.value.name = data.username
      changeUserForm.value.tele_id = data.tele_id
      changeUserForm.value.email = data.email
      changeUserForm.value.role = data.role
      isChangeDialog.value = true
    }

    const submitChangeUserForm = async () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        notifyNeed("Не все поля заполнены", "warning", "top", 1000)
      } else {
        isButtonDisabled.value = true
        $q.loading.show()
        const formData = {
          id: changeUserForm.value.id,
          username: changeUserForm.value.name,
          tele_id: changeUserForm.value.tele_id,
          email: changeUserForm.value.email,
          role: changeUserForm.value.role
        }
        await adminStore.actChangeUser(formData)
        if (adminStore.isChangeUser === true) {
          isChangeDialog.value = false
          notifyNeed("Успешное изменение пользователя", "positive", "top-right", 2000)
          adminStore.isChangeUser = false
        } else {
          notifyNeed("Произошла ошибка изменения пользователя. Попробуйте позже", "warning", "top-right", 2000)
        }
        isButtonDisabled.value = false
        $q.loading.hide()
      }
    }

    return {
      usersConfirm,
      columns,
      showDialogChangeUser,
      isChangeDialog,
      v$,
      changeUserForm,
      submitChangeUserForm,
      isButtonDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
.main-users__content_table {
  width: 100%;
}


.main-users__dialog {
  width: 450px;
}

.main-users__dialog_icon {
  color: #1b5e20
}

.main-users__dialog_title {
  color: #1b5e20
}

.main-users__dialog_close {
  color: #1b5e20
}

.main-users__dialog_form_row_label>label {
  font-size: 14px;
}

.main-users__dialog_form_row_input {
  width: 100%;
  height: 40px;
  background-color: #fff;
  color: #333333;
  font-size: 14px;
  padding: 12px 22px;
  border-radius: 3px;
  border: solid 1px #bcc2ce;
  outline: none;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.1);
}

.main-users__dialog_form_row:not(:first-child) {
  margin-top: 5px;
}

.input-error {
  border: 1px solid #ff0000;
}

.error-msg {
  color: #ff0000;
  font-size: 11px;
}

.main-users__dialog_form_btn {
  margin-top: 20px;
}

.main-users__dialog_form_btn>button {
  cursor: pointer;
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  border-radius: 3px;
  border: none;
  box-shadow: 0px 2px 3px #9c9c9c;
  font-size: 14px;
  background-color: #1b5e20;
  color: #fff;
}

.main-users__dialog_form_btn>button:hover {
  color: #fff;
  background-color: #1b5e1fe8;
  border-color: #1b5e1fe8;
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
