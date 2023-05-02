<template>
  <q-card flat>
    <div v-if="isEmptyMessages === true">
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

import HomeChatChatsEmpty from "../components/HomeChatChatsEmpty.vue"

export default defineComponent({
  name: "HomeChatChatsComponent",
  emits: ['textSendMessage'],
  setup(_, context) {
    const $q = useQuasar()
    const route = useRoute()

    const { messages, isEmptyMessages } = storeToRefs(useMessageStore())
    const messageStore = useMessageStore()

    const inputForm = ref("")

    const submitSendMessageForm = () => {
      if (inputForm.value.length > 0) {
        console.log("inputForm.value -->", inputForm.value)
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
.main-chat-chats {
  max-width: 100%;
  height: 850px;
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
    height: 745px;
  }
}

@media (max-width: 1536px) {
  .main-chat-chats {
    height: 711px;
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
    height: 747px;
  }
}

@media (max-width: 1366px) {
  .main-chat-chats {
    height: 623px;
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
    height: 655px;
  }
}

@media (max-width: 1194px) {
  .main-chat-chats {
    height: 689px;
  }
}

@media (max-width: 1180px) {
  .main-chat-chats {
    height: 675px;
  }
}

@media (max-width: 1080px) {
  .main-chat-chats {
    height: 665px;
  }
}

@media (max-width: 1024px) {
  .main-chat-chats {
    height: 628px;
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

@media (max-width: 812px) {
  .main-chat-chats {
    height: 624px;
  }
}

@media (max-width: 780px) {
  .main-chat-chats {
    height: 624px;
  }
}

@media (max-width: 568px) {
  .main-chat-chats {
    height: 743px;
  }
}

@media (max-width: 480px) {
  .main-chat-chats {
    height: 759px;
  }
}

@media (max-width: 428px) {
  .main-chat-chats {
    height: 786px;
  }
}

@media (max-width: 375px) {
  .main-chat-chats {
    height: 706px;
  }
}
</style>
