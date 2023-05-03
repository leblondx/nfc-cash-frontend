<template>
  <q-card flat>
    <div v-if="isEmptyMessages === true">
      <q-card-section>
        <div class="main-user-info" v-for="ord in order" :key="ord.id">
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Bin brand:</div>
            <div class="main-user-info__row_text">{{ ord.bin_brand === "" ? "нет" : order[0].bin_brand }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Bin type:</div>
            <div class="main-user-info__row_text">{{ ord.bin_type === "" ? "нет" : ord.bin_type }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Bin bank:</div>
            <div class="main-user-info__row_text">{{ ord.bin_bank === "" ? "нет" : ord.bin_bank }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Bin country:</div>
            <div class="main-user-info__row_text">{{ ord.bin_country === "" ? "нет" : ord.bin_country }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Address:</div>
            <div class="main-user-info__row_text">{{ ord.address === "" ? "нет" : ord.address }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Mobile phone:</div>
            <div class="main-user-info__row_text">{{ ord.mobile === "" ? "нет" : ord.mobile }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Card number:</div>
            <div class="main-user-info__row_text">{{ ord.card_number === "" ? "нет" : ord.card_number }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Expiration:</div>
            <div class="main-user-info__row_text">{{ ord.exp_month }}/{{ ord.exp_year }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Security Code:</div>
            <div class="main-user-info__row_text">{{ ord.security_code === "" ? "нет" : ord.security_code }}</div>
          </div>
          <div class="main-user-info__row">
            <div class="main-user-info__row_title">Holder Name:</div>
            <div class="main-user-info__row_text">{{ ord.card_holder_name === "" ? "нет" : ord.card_holder_name }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="main-chat-chats">
          <q-virtual-scroll class="main-chat-chats__chat" :items="messages" separator v-slot="{ item, index }">
            <q-chat-message class="main-chat-chats__chat_msg" :key="item.id"
              :name="item.uid_user.length === 8 ? 'я' : 'пользователь'" :sent="item.uid_user.length === 8 ? true : false"
              :text="[item.message]" sent :stamp="item.created" />
          </q-virtual-scroll>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <form class="main-chat-form" @submit.prevent="submitSendMessageForm">
          <div class="main-chat-form__input">
            <input type="text" placeholder="Сообщение" v-model.trim="inputForm">
            <q-btn round color="green" icon="send" @click="submitSendMessageForm" />
          </div>
        </form>
      </q-card-actions>
    </div>
    <div v-if="isEmptyMessages === false">
      <HomeChatChatsEmpty />
    </div>
  </q-card>
</template>

<script lang="js">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from "vue-router"
import { storeToRefs } from 'pinia'

import { useMessageStore } from "../stores/message"
import { useOrdersStore } from "../stores/orders"

import HomeChatChatsEmpty from "../components/HomeChatChatsEmpty.vue"

export default defineComponent({
  name: "HomeChatChatsComponent",
  emits: ['textSendMessage'],
  setup(_, context) {
    const $q = useQuasar()
    const route = useRoute()

    const { messages, isEmptyMessages } = storeToRefs(useMessageStore())
    const { order } = storeToRefs(useOrdersStore())
    const messageStore = useMessageStore()

    const inputForm = ref("")

    const submitSendMessageForm = () => {
      if (inputForm.value.length > 0) {
        context.emit("textSendMessage", inputForm.value)
        inputForm.value = ""
      }
    }

    onMounted(async () => {
      $q.loading.show()
      const formData = {
        uidRoom: route.params.id
      }
      await messageStore.actGetRoomMessages(formData)
      $q.loading.hide()
    })

    return {
      order,
      messages,
      isEmptyMessages,
      inputForm,
      submitSendMessageForm
    }
  },
  components: {
    HomeChatChatsEmpty
  }
})
</script>

<style lang="scss" scoped>
.main-user-info {
  background-color: #81c784;
  padding: 5px 10px;
  border-radius: 10px;
}

.main-user-info__row {
  display: flex;
  align-items: center;
}

.main-user-info__row_title {
  font-size: 13px;
}

.main-user-info__row_text {
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
}

.main-chat-chats {
  max-width: 100%;
  height: 613px;
  width: 100%;
}

.main-chat-chats__chat {
  padding: 0 10px;
  max-height: 100%;
}

.main-chat-form {
  width: 100%;
}

.main-chat-form__input {
  position: relative;
}

.main-chat-form__input>input {
  outline: none;
  padding: 3px 15px;
  outline: none;
  width: 100%;
  height: 55px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  vertical-align: middle;
}

.main-chat-form__input>button {
  position: absolute;
  top: .4em;
  right: .4em;
  height: 2.2em;
  border: 1px solid;
  text-transform: uppercase;
}

// @media (max-width: 1920px) {
//   .main-chat-chats {
//     height: 925px;
//   }
// }

@media (max-width: 1600px) {
  .main-chat-chats {
    height: 508px;
  }
}

@media (max-width: 1536px) {
  .main-user-info__row_title {
    font-size: 12px;
  }

  .main-user-info__row_text {
    font-size: 11px;
  }

  .main-chat-chats {
    height: 489px;
  }

  .main-chat-form__input>input {
    height: 53px;
    font-size: 12px;
  }

  .main-chat-chats__chat_msg {
    font-size: 12px;
  }
}

@media (max-width: 1440px) {
  .main-chat-chats {
    height: 525px;
  }
}

@media (max-width: 1366px) {
  .main-user-info__row_title {
    font-size: 12px;
  }

  .main-user-info__row_text {
    font-size: 11px;
  }

  .main-chat-chats {
    height: 401px;
  }

  .main-chat-form__input>input {
    height: 45px;
    font-size: 11px;
  }

  .main-chat-form__input>button {
    width: 40px;
    height: 40px;
    top: 2px;
  }

  .main-chat-chats__chat_msg {
    font-size: 12px;
  }
}

@media (max-width: 1280px) {
  .main-chat-chats {
    height: 433px;
  }
}

@media (max-width: 1194px) {
  .main-chat-chats {
    height: 467px;
  }
}

@media (max-width: 1180px) {
  .main-chat-chats {
    height: 453px;
  }
}

@media (max-width: 1080px) {
  .main-chat-chats {
    height: 443px;
  }
}

@media (max-width: 1024px) {
  .main-chat-chats {
    height: 406px;
  }

  .main-chat-form__input>input {
    height: 40px;
    font-size: 10px;
  }

  .main-chat-form__input>button {
    top: 0;
  }

  .main-chat-info__back_icon {
    font-size: 14px;
  }
}

@media(max-width: 834px) {
  .main-chat-chats {
    height: 403px;
  }
}

@media (max-width: 812px) {
  .main-chat-chats {
    height: 404px;
  }
}

@media (max-width: 780px) {
  .main-chat-chats {
    height: 403px;
  }
}

@media (max-width: 768px) {
  .main-chat-chats {
    height: 403px;
  }
}

@media (max-width: 568px) {
  .main-chat-chats {
    height: 521px;
  }
}

@media (max-width: 480px) {
  .main-chat-chats {
    height: 537px;
  }
}

@media (max-width: 428px) {
  .main-user-info__row_title {
    font-size: 11px;
  }

  .main-user-info__row_text {
    font-size: 10px;
  }

  .main-chat-chats {
    height: 579px;
  }
}

@media(max-width: 390px) {
  .main-chat-chats {
    height: 601px;
  }
}

@media (max-width: 375px) {
  .main-chat-chats {
    height: 521px;
  }
}

@media (max-width: 360px) {
  .main-chat-chats {
    height: 533px;
  }
}

@media (max-width: 320px) {
  .main-user-info__row_title {
    font-size: 10px;
  }

  .main-user-info__row_text {
    font-size: 9px;
  }

  .main-chat-chats {
    height: 521px;
  }
}
</style>
