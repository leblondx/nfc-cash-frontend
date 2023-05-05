<template>
  <div>
    <div class="main-settings-content">
      <div class="main-settings-content__block" v-for="bot in telegramBots" :key="bot.id">
        <div class="main-settings-content__block_left">
          <div v-if="bot.is_work === true">
            <q-icon class="main-settings-content__block_left_icon" style="color: #1b5e20" name="signal_wifi_4_bar" />
          </div>
          <div v-if="bot.is_work === false">
            <q-icon class="main-settings-content__block_left_icon" style="color: #ff0000" name="signal_wifi_bad" />
          </div>
        </div>
        <div class="main-settings-content__block_right">
          <div class="main-settings-content__block_right_row">
            <div class="main-settings-content__block_right_row_title">Имя:</div>
            <div class="main-settings-content__block_right_row_text">{{ bot.name }}</div>
          </div>
          <div class="main-settings-content__block_right_row">
            <div class="main-settings-content__block_right_row_title">Токен:</div>
            <div class="main-settings-content__block_right_row_text">
              {{ bot.token.substr(0, 10) }}...
              <q-tooltip>{{ bot.token }}</q-tooltip>
            </div>
          </div>
          <div class="main-settings-content__block_right_row">
            <div class="main-settings-content__block_right_row_title">Id группы:</div>
            <div class="main-settings-content__block_right_row_text">{{ bot.chat_id }}</div>
          </div>
          <div class="main-settings-content__block_right_row">
            <div class="main-settings-content__block_right_row_title">Статус:</div>
            <div class="main-settings-content__block_right_row_text">
              {{ bot.is_work === true ? "Работает" : "Отключен" }}
              <div class="main-settings-content__block_right_row_status"
                :class="{ 'main-settings-content__block_right_row_status_g': bot.is_work === true, 'main-settings-content__block_right_row_status_b': bot.is_work === false }">
              </div>
            </div>
          </div>
          <div class="main-settings-content__block_right_row">
            <div class="main-settings-content__block_right_row_title">Дата создания:</div>
            <div class="main-settings-content__block_right_row_text">{{ bot.created }}</div>
          </div>
        </div>
        <div class="main-settings-content__block_btns">
          <div class="main-settings-content__block_btns_btno">
            <button @click="showVisibleTurnOrSwitchConfirmMenu(bot.is_work, bot.token)">
              <q-icon class="main-settings-content__block_btns_icon" name="disabled_visible" />
              <q-tooltip>{{ bot.is_work === true ? "Отключить бот" : "Включить бот" }}</q-tooltip>
            </button>
          </div>
          <div class="main-settings-content__block_btns_btnt">
            <button @click="showVisibleDeleteConfirmMenu(bot.token)">
              <q-icon class="main-settings-content__block_btns_icon" name="delete" />
              <q-tooltip>Удалить бот</q-tooltip>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-settings-create">
      <div class="main-settings-create__btn">
        <button @click="showDialogCreateBot">Добавить бота</button>
      </div>
    </div>
    <q-dialog v-model="confirmDialogTurnOn" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_4_bar" color="green" text-color="white" />
          <span class="q-ml-sm">Вы действительно хотите включить бот?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="green" v-close-popup />
          <q-btn flat label="Удалить" color="green" @click="turnOnBot" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDialogSwitchOff" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_bad" color="green" text-color="white" />
          <span class="q-ml-sm">Вы действительно хотите отключить бот?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="green" v-close-popup />
          <q-btn flat label="Удалить" color="green" @click="switchOffBot" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="green" text-color="white" />
          <span class="q-ml-sm">Вы действительно хотите удалить бота?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="green" v-close-popup />
          <q-btn flat label="Удалить" color="green" @click="deleteBot" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
                  <label for="chatId">Чат id группы (со знаком минус)</label>
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
import { storeToRefs } from 'pinia'

import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import { useTelegramStore } from "../stores/telegram"

export default defineComponent({
  name: "HomeSettingsBotContentComponent",
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

    const { telegramBots } = storeToRefs(useTelegramStore())
    const telegramStore = useTelegramStore()

    const confirmDialogTurnOn = ref(false)
    const confirmDialogSwitchOff = ref(false)
    const confirmDialogDelete = ref(false)
    const chooseToken = ref("")

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

    const turnOnBot = async () => {
      confirmDialogTurnOn.value = false
      const formData = {
        token: chooseToken.value
      }
      await telegramStore.actTurnOnBot(formData)
      if (telegramStore.isTurnOnBot === true) {
        notifyNeed("Успешное включение бота", "positive", "top-right", 2000)
        telegramStore.isTurnOnBot = false
      } else {
        notifyNeed("Произошла ошибка включения бота. Попробуйте позже", "warning", "top", 2000)
      }
    }

    const switchOffBot = async () => {
      confirmDialogSwitchOff.value = false
      const formData = {
        token: chooseToken.value
      }
      await telegramStore.actSwitchOffBot(formData)
      if (telegramStore.isSwitchOffBot === true) {
        notifyNeed("Успешное отключение бота", "positive", "top-right", 2000)
        telegramStore.isSwitchOffBot = false
      } else {
        notifyNeed("Произошла ошибка отключение бота. Попробуйте позже", "warning", "top", 2000)
      }
    }

    const deleteBot = async () => {
      confirmDialogDelete.value = false
      const formData = {
        token: chooseToken.value
      }
      await telegramStore.actDeleteBot(formData)
      if (telegramStore.isDeleteBot === true) {
        notifyNeed("Успешное удаление бота", "positive", "top-right", 2000)
        telegramStore.isDeleteBot = false
      } else {
        notifyNeed("Произошла ошибка удаления бота. Попробуйте позже", "warning", "top", 2000)
      }
    }

    const showVisibleDeleteConfirmMenu = (token) => {
      chooseToken.value = token
      confirmDialogDelete.value = true
    }

    const showVisibleTurnOrSwitchConfirmMenu = (isWork, token) => {
      chooseToken.value = token
      if (isWork === true) { // отключить бот
        confirmDialogSwitchOff.value = true
      }
      if (isWork === false) { // включить бот
        confirmDialogTurnOn.value = true
      }
    }

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
      telegramBots,
      confirmDialogTurnOn,
      confirmDialogSwitchOff,
      showVisibleTurnOrSwitchConfirmMenu,
      confirmDialogDelete,
      showVisibleDeleteConfirmMenu,
      turnOnBot,
      switchOffBot,
      deleteBot,
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
.main-settings-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 650px;
  background-color: #81c784;
  padding: 10px 15px;
  border-radius: 10px;
}

.main-settings-content__block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 650px;
  padding: 5px 30px;
  background-color: #fff;
  border-radius: 5px;
}

.main-settings-content__block:not(:first-child) {
  margin-top: 15px;
}

.main-settings-content__block_left_icon {
  font-size: 52px;
}

.main-settings-content__block_right {
  margin-left: 10px;
}

.main-settings-content__block_right_row {
  display: flex;
  align-items: center;
}

.main-settings-content__block_right_row_title {
  font-size: 18px;
  color: #000;
  font-weight: 600;
}

.main-settings-content__block_right_row_text {
  display: flex;
  align-items: center;
  margin: 2px 0 0 5px;
  font-size: 15px;
}

.main-settings-content__block_right_row_status {
  margin-left: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.main-settings-content__block_right_row_status_g {
  background-color: #1b5e20;
}

.main-settings-content__block_right_row_status_b {
  background-color: #ff0000;
}

.main-settings-content__block_btns {
  margin-left: 10px;
}

.main-settings-content__block_btns_btno>button {
  cursor: pointer;
  width: 35px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: #ffa500bf;
}

.main-settings-content__block_btns_btno>button:hover {
  background-color: #ffa5009c;
}

.main-settings-content__block_btns_btnt {
  margin-top: 5px;
}

.main-settings-content__block_btns_btnt>button {
  cursor: pointer;
  width: 35px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: #ff0000bb;
}

.main-settings-content__block_btns_btnt>button:hover {
  background-color: #ff00009f;
}

.main-settings-content__block_btns_icon {
  font-size: 18px;
  color: #fff;
}

.main-settings-create {
  margin-top: 20px;
}

.main-settings-create__btn>button {
  cursor: pointer;
  width: 100%;
  padding: 6px 16px;
  border-radius: 3px;
  border: none;
  box-shadow: 0px 2px 3px #9c9c9c;
  font-size: 17px;
  background-color: #1b5e20;
  color: #fff;
}

.main-settings-create__btn>button:hover {
  color: #fff;
  background-color: #1b5e1fe8;
  border-color: #1b5e1fe8;
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

@media (max-width: 1280px) {
  .main-settings-content {
    width: 580px;
  }

  .main-settings-content__block {
    width: 550px;
  }

  .main-settings-content__block_right_row_title {
    font-size: 15px;
  }

  .main-settings-content__block_right_row_text {
    font-size: 13px;
  }
}

@media (max-width: 1024px) {
  .main-settings-content {
    width: 546px;
  }

  .main-settings-content__block {
    padding: 5px 15px;
    width: 516px;
  }

  .main-settings-content__block_left_icon {
    font-size: 42px;
  }

  .main-settings-content__block_right_row_title {
    font-size: 14px;
  }

  .main-settings-content__block_right_row_text {
    font-size: 12px;
  }
}

@media (max-width: 834px) {
  .main-settings-content__block {
    flex-wrap: wrap;
  }
}

@media (max-width: 568px) {
  .main-settings-content {
    width: 100%;
  }

  .main-settings-content__block {
    width: 100%;
    justify-content: center;
  }

  .main-settings-content__block_right_row_title {
    font-size: 12px;
  }

  .main-settings-content__block_right_row_text {
    font-size: 10px;
  }

  .main-settings-content__block_btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    flex-wrap: wrap;
    width: 100%;
  }

  .main-settings-content__block_btns_btno>button {
    width: 120px;
    height: 35px;
  }

  .main-settings-content__block_btns_btnt {
    margin: 0 0 0 5px;
  }

  .main-settings-content__block_btns_btnt>button {
    width: 120px;
    height: 35px;
  }

  .main-settings-content__block_btns_icon {
    font-size: 16px;
  }
}

@media (max-width: 428px) {
  .main-settings-create__btn>button {
    font-size: 15px;
  }
}

@media (max-width: 390px) {
  .main-settings-content__block_btns_btno>button {
    width: 90px;
    height: 30px;
  }

  .main-settings-content__block_btns_btnt>button {
    width: 90px;
    height: 30px;
  }

  .main-settings-create__btn>button {
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .main-settings-content__block_left_icon {
    font-size: 32px;
  }

  .main-settings-content__block_right_row_title {
    font-size: 11px;
  }

  .main-settings-content__block_btns_btno>button {
    width: 100%;
    height: 30px;
  }

  .main-settings-content__block_btns_btnt>button {
    width: 100%;
    height: 30px;
  }

  .main-settings-content__block_btns_icon {
    font-size: 14px;
  }

  .main-settings-create__btn>button {
    font-size: 13px;
  }
}
</style>
