<template>
  <div>
    <div class="main-settings__empty fixed-center">
      <div class="main-settings__empty_icon">
        <q-icon name="hourglass_disabled" />
      </div>
      <div class="main-settings__empty_title">Пусто</div>
      <div class="main-settings__empty_text">Бот не добавлен</div>
      <div class="main-settings__empty_btn">
        <button @click="showDialogCreateBot">Добавить</button>
      </div>
    </div>
    <q-dialog v-model="isCreateDialog">
      <q-card>
        <div class="main-settings__dialog">
          <q-toolbar>
            <q-avatar>
              <q-icon class="main-settings__dialog_icon" name="send_to_mobile" />
            </q-avatar>
            <q-toolbar-title>
              <span class="text-weight-bold main-settings__dialog_title" style="color: #1b5e20">
                Добавить бот
              </span>
            </q-toolbar-title>
            <q-btn class="main-settings__dialog_close" flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <form class="main-settings__dialog_form" @submit.prevent="submitAddBotForm">
              <div class="main-settings__dialog_form_row">
                <div class="main-settings__dialog_form_row_label">
                  <label for="name">Имя</label>
                </div>
                <input class="main-settings__dialog_form_row_input" :class="{ 'input-error': v$.name.$errors.length > 0 }"
                  id="name" type="text" placeholder="Имя" v-model.trim="addBotForm.name" @blur="v$.name.$touch()">
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите имя" : "" }}
                  </div>
                </div>
              </div>
              <div class="main-settings__dialog_form_row">
                <div class="main-settings__dialog_form_row_label">
                  <label for="token">Токен</label>
                </div>
                <input class="main-settings__dialog_form_row_input"
                  :class="{ 'input-error': v$.token.$errors.length > 0 }" id="token" type="text" placeholder="Токен"
                  v-model.trim="addBotForm.token" @blur="v$.token.$touch()">
                <div class="input-errors" v-for="error of v$.token.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите токен" : "" }}
                  </div>
                </div>
              </div>
              <div class="main-settings__dialog_form_row">
                <div class="main-settings__dialog_form_row_label">
                  <label for="chatId">Чат id группы</label>
                </div>
                <input class="main-settings__dialog_form_row_input"
                  :class="{ 'input-error': v$.chatId.$errors.length > 0 }" id="chatId" type="text"
                  placeholder="Чат id группы" v-model.trim="addBotForm.chatId" @blur="v$.chatId.$touch()">
                <div class="input-errors" v-for="error of v$.chatId.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message === "Value is required" ? "Пожалуйста, введите чат id группы" :
                    "" }}
                  </div>
                </div>
              </div>
              <div class="main-settings__dialog_form_btn">
                <button :disabled="isButtonDisabled" @click.prevent="submitAddBotForm">Добавить</button>
              </div>
            </form>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import { useTelegramStore } from "../stores/telegram"

export default defineComponent({
  name: "HomeSettingsEmptyComponent",
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

    const telegramStore = useTelegramStore()

    const isCreateDialog = ref(false)
    const addBotForm = ref({
      name: "",
      token: "",
      chatId: ""
    })
    const isButtonDisabled = ref(false)

    const rules = {
      name: {
        required
      },
      token: {
        required
      },
      chatId: {
        required
      }
    }

    const v$ = useVuelidate(rules, addBotForm)

    const showDialogCreateBot = () => {
      isCreateDialog.value = true
    }

    const submitAddBotForm = async () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        notifyNeed("Не все поля заполнены", "warning", "top", 1000)
      } else {
        isButtonDisabled.value = true
        $q.loading.show()
        const formData = {
          name: addBotForm.value.name,
          token: addBotForm.value.token,
          chat_id: addBotForm.value.chatId
        }
        await telegramStore.actCreateBot(formData)
        if (telegramStore.isCreateBot === true) {
          notifyNeed("Успешное добавление бота", "positive", "top-right", 2000)
          isCreateDialog.value = false
        } else {
          notifyNeed("Произошла ошибка добавления бота. Попробуйте позже", "warning", "top-right", 2000)
        }
        isButtonDisabled.value = false
        $q.loading.hide()
      }
    }

    return {
      isCreateDialog,
      v$,
      showDialogCreateBot,
      addBotForm,
      submitAddBotForm,
      isButtonDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
.main-settings__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-settings__empty_icon {
  margin-bottom: 10px;
}

.main-settings__empty_icon>i {
  font-size: 56px;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background-color: #fff;
  color: #1b5e20;
}

.main-settings__empty_title {
  margin-bottom: 15px;
  font-size: 24px;
  color: #1b5e20;
}

.main-settings__empty_text {
  font-size: 16px;
  color: #1b5e20;
  text-align: center;
}

.main-settings__empty_btn {
  margin-top: 10px;
}

.main-settings__empty_btn>button {
  cursor: pointer;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  border: none;
  background-color: #1b5e20;
  color: #fff;
}

.main-settings__empty_btn>button:hover {
  background-color: #1b5e20e3;
}

.main-settings__dialog {
  width: 450px;
}

.main-settings__dialog_icon {
  color: #1b5e20
}

.main-settings__dialog_title {
  color: #1b5e20
}

.main-settings__dialog_close {
  color: #1b5e20
}

.main-settings__dialog_form_row_label>label {
  font-size: 14px;
}

.main-settings__dialog_form_row_input {
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

.main-settings__dialog_form_row:not(:first-child) {
  margin-top: 5px;
}

.input-error {
  border: 1px solid #ff0000;
}

.error-msg {
  color: #ff0000;
  font-size: 11px;
}

.main-settings__dialog_form_btn {
  margin-top: 20px;
}

.main-settings__dialog_form_btn>button {
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

.main-settings__dialog_form_btn>button:hover {
  color: #fff;
  background-color: #1b5e1fe8;
  border-color: #1b5e1fe8;
}

@media (max-width: 1024px) {
  .main-settings__empty_title {
    margin-bottom: 28px;
    font-size: 20px;
  }

  .main-settings__empty_text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .main-settings__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 667px) {
  .main-settings__empty_icon>i {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .main-settings__empty_title {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .main-settings__empty_text {
    font-size: 12px;
  }
}

@media (max-width: 568px) {
  .main-settings__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 375px) {
  .main-settings__empty_title {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .main-settings__empty_text {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  .main-settings__empty_icon>i {
    font-size: 35px;
    width: 45px;
    height: 45px;
  }

  .main-settings__empty_title {
    margin-bottom: 18px;
    font-size: 12px;
  }

  .main-settings__empty_text {
    font-size: 10px;
  }
}
</style>
