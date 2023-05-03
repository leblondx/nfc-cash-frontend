<template>
  <q-page class="main-chat-page">
    <HomeHeader activePage="chats" />
    <div class="main-chat">
      <q-splitter v-model="splitterModel" :limits="[2, 98]">
        <template v-slot:before>
          <HomeChatInfo />
        </template>
        <template v-slot:after>
          <HomeChatChats @textSendMessage="sendMessage" />
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from "vue-router"
import { storeToRefs } from 'pinia'

import HomeHeader from "../components/HomeHeader.vue"
import HomeChatInfo from "../components/HomeChatInfo.vue"
import HomeChatChats from "../components/HomeChatChats.vue"

import { useUserStore } from "../stores/user"
import { useOrdersStore } from "../stores/orders"
import { useRoomStore } from "../stores/room"
import { useMessageStore } from "../stores/message"

export default defineComponent({
  name: "HomeChatPage",
  setup() {
    const $q = useQuasar()
    const route = useRoute()

    const notifyNeed = (needMessage, needType, needPosition, needTimeout) => {
      $q.notify({
        type: needType,
        message: needMessage,
        progress: true,
        position: needPosition,
        timeout: needTimeout
      })
    }

    const { userProfile } = storeToRefs(useUserStore())
    const { order } = storeToRefs(useOrdersStore())
    const { room } = storeToRefs(useRoomStore())
    const userStore = useUserStore()
    const ordersStore = useOrdersStore()
    const roomStore = useRoomStore()
    const messageStore = useMessageStore()

    let socket
    const splitterModel = ref(38)
    const isConnectChat = ref(false)

    const connect = async (userUid) => {
      socket = new WebSocket(`ws://localhost:8080/room/join-room/${route.params.id}?uidUser=${userUid}`)
      socket.onopen = () => {
        console.log("connect to websocket")
      }
      socket.onmessage = async (e) => {
        const receiveMessage = JSON.parse(e.data)
        console.log("receiveMessage -->", receiveMessage)
        const formData = {
          uidRoom: receiveMessage.roomId,
          uidUser: receiveMessage.uidUser,
          message: receiveMessage.content
        }
        await messageStore.actReceiveMessage(formData)
      }
      socket.onclose = () => {
        console.log("Socket закрыт")
      }
      socket.onerror = () => {
        console.log("Socket произошла ошибка")
      }
    }

    const connectCheck = async (orderStatus, userUid, roomData) => { // подключение к websocket каналу
      if (orderStatus !== "Chat closed") {
        if (roomData.member_count === 2) {
          if (roomData.members.includes(userUid) === true) {
            isConnectChat.value = true
          } else {
            notifyNeed("Этот заказ уже закреплён за другим пользователем", "warning", "top", 3000)
          }
        } else {
          if (roomData.members.includes(userUid) === false) {
            notifyNeed("Успешное подключение к чату. Этот чат закрепился за вами", "positive", "top-right", 2000)
            ordersStore.orders.filter((e) => {
              if (e.uid_order === route.params.id) {
                e.member_fixed = userStore.userProfile[0].username
              }
              return e
            })
            roomStore.room[0].member_fixed = userStore.userProfile[0].username
            isConnectChat.value = true
          }
        }
      }
    }

    const sendMessage = async (data) => { // отправка сообщения по сокетам
      // сохранение в базе данных сообщения
      if (order.value[0].status === "Chat closed") {
        // показать алерт о том, что чат закрыт
        notifyNeed("Пользователь закрыл чат. Отправлять сообщений невозможна", "warning", "top", 3000)
      } else {
        const formData = {
          uidRoom: route.params.id,
          uidUser: userProfile.value[0].uid,
          message: data
        }
        await messageStore.actCreateMessage(formData)
        socket.send(data)
      }
    }

    onMounted(async () => {
      $q.loading.show()
      const formDataRoom = {
        uidRoom: route.params.id
      }
      const formData = {
        uid_order: route.params.id
      }
      await roomStore.actGetRoom(formDataRoom)
      await ordersStore.actGetOrder(formData)
      await connectCheck(order.value[0].status, userProfile.value[0].uid, room.value[0])
      if (isConnectChat.value === true) {
        await connect(userProfile.value[0].uid)
      }
      $q.loading.hide()
    })

    return {
      splitterModel,
      sendMessage
    }
  },
  components: {
    HomeHeader,
    HomeChatInfo,
    HomeChatChats,
  }
})
</script>

<style lang="scss" scoped>
.main-chat-page {
  height: 100%;
}

.main-chat {
  width: 100%;
  height: 100%;
}

// .main-chat-name {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .main-chat-name__title {
//   font-size: 18px;
//   font-weight: 600;
// }

// .main-chat-name__text {
//   font-size: 16px;
//   margin-left: 5px;
// }

// .main-chat-info__date {
//   display: flex;
// }

// .main-chat-info__date_title {
//   font-size: 15px;
//   font-weight: 600;
//   color: #000;
// }

// .main-chat-info__date_text {
//   margin: 1px 0 0 5px;
// }

// .main-chat-info__lo {
//   display: flex;
// }

// .main-chat-info__lo_title {
//   font-size: 15px;
//   font-weight: 600;
//   color: #000;
// }

// .main-chat-info__lo_text {
//   margin: 1px 0 0 5px;
// }

// .main-chat-info__status {
//   display: flex;
//   align-items: center;
// }

// .main-chat-info__status_title {
//   font-size: 15px;
//   font-weight: 600;
//   color: #000;
// }

// .main-chat-info__status_text {
//   margin-left: 5px;
//   font-size: 11px;
//   color: #fff;
//   background-color: #1b5e20;
//   padding: 2px 4px;
//   border-radius: 3px;
//   border: 1px solid #efefefd4;
// }

// .main-chat-info__status_textw {
//   color: #000;
//   background-color: #ffa500;
// }

// .main-chat-info__status_textc {
//   color: #000;
//   background-color: #fff;
//   border: 1px solid #ccc;
// }

// .main-chat-info__actions_title {
//   font-size: 18px;
//   text-align: center;
//   font-weight: 600;
// }

// .main-chat-info__actions_btns {
//   margin: 10px 0;
// }

// .main-chat-info__actions_btns_go>button {
//   cursor: pointer;
//   width: 100%;
//   height: 39px;
//   border-radius: 5px;
//   border: none;
//   font-size: 16px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background-color: #008000;
//   color: #fff;
// }

// .main-chat-info__actions_btns_go>button:hover {
//   background-color: #008000c2;
// }

// .main-chat-info__actions_btns_cp {
//   // display: flex;
//   // align-items: center;
//   // justify-content: space-between;
//   margin-top: 13px;
// }

// .main-chat-info__actions_btns_cp_code>button {
//   cursor: pointer;
//   // width: 340px;
//   width: 100%;
//   height: 35px;
//   border-radius: 5px;
//   border: none;
//   font-size: 14px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background-color: #1976d2;
//   color: #fff;
// }

// .main-chat-info__actions_btns_cp_code>button:hover {
//   background-color: #1976d2d4;
// }

// .main-chat-info__actions_btns_cp_pin {
//   margin-top: 10px;
// }

// .main-chat-info__actions_btns_cp_pin>button {
//   cursor: pointer;
//   // width: 340px;
//   width: 100%;
//   height: 35px;
//   border-radius: 5px;
//   border: none;
//   font-size: 14px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background-color: #1976d2;
//   color: #fff;
// }

// .main-chat-info__actions_btns_cp_pin>button:hover {
//   background-color: #1976d2d4;
// }

// .main-chat-info__actions_btns_reset {
//   margin-top: 13px;
// }

// .main-chat-info__actions_btns_reset>button {
//   cursor: pointer;
//   width: 100%;
//   height: 37px;
//   border-radius: 5px;
//   border: none;
//   font-size: 14px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background-color: #f2c037;
//   color: #fff;
// }

// .main-chat-info__actions_btns_reset>button:hover {
//   background-color: #f2c037d9;
// }

// .main-chat-info__initdata_title {
//   font-size: 18px;
//   text-align: center;
//   font-weight: 600;
// }

// .main-chat-info__initdata_currency {
//   display: flex;
//   margin-top: 10px;
// }

// .main-chat-info__initdata_currency_title {
//   width: 50%;
//   font-size: 15px;
//   font-weight: 600;
//   color: #000;
// }

// .main-chat-info__initdata_currency_text {
//   margin-top: 1.5px;
//   width: 50%;
//   font-size: 14px;
//   color: #000;
// }

// .main-chat-info__userinfo_title {
//   font-size: 18px;
//   text-align: center;
//   font-weight: 600;
// }

// .main-chat-info__userinfo_ui {
//   display: flex;
//   // padding: 8px 0;
//   margin-top: 10px;
// }

// .main-chat-info__userinfo_ui_title {
//   font-size: 15px;
//   font-weight: 600;
//   color: #000;
// }

// .main-chat-info__userinfo_ui_text {
//   margin: 1px 0 0 10px;
//   font-size: 14px;
//   color: #000;
// }

// .main-chat-info__back {
//   // padding: 15px 0;
//   width: 100%;
// }

// .main-chat-info__back_icon {
//   font-size: 16px;
//   color: #000;
// }

// .main-chat-info__back_btn>button {
//   cursor: pointer;
//   width: 100%;
//   height: 37px;
//   border-radius: 5px;
//   border: none;
//   font-size: 14px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background-color: #e0e0e0;
//   color: #000;
// }

// .main-chat-info__back_btn>button:hover {
//   background-color: #cfcfcf;
// }

// .main-chat-chats {
//   max-width: 100%;
//   height: 850px;
//   width: 100%;
// }

// .main-chat-form {
//   width: 100%;
// }

// .main-chat-form__input {
//   position: relative;
// }

// .main-chat-form__input>input {
//   outline: none;
//   padding: 3px 15px;
//   outline: none;
//   width: 100%;
//   height: 55px;
//   border: 1px solid #e0e0e0;
//   border-radius: 5px;
//   vertical-align: middle;
// }

// .main-chat-form__input>button {
//   position: absolute;
//   top: .4em;
//   right: .4em;
//   height: 2.2em;
//   border: 1px solid;
//   text-transform: uppercase;
// }
</style>
