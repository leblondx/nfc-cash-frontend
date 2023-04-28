<template>
  <q-card flat>
    <q-card-section>
      <div class="main-chat-chats">
        <q-virtual-scroll class="main-chat-chats__chat" :items="messages" separator v-slot="{ item, index }">
          <q-chat-message :key="item.id" :name="item.name" :sent="item.isSent === true ? true : false" :avatar="item.img"
            :text="[item.message]" sent :stamp="item.stamp" />
        </q-virtual-scroll>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <form class="main-chat-form">
        <div class="main-chat-form__input">
          <input type="text" placeholder="Сообщение">
          <q-btn round color="green" icon="send" />
        </div>
      </form>
    </q-card-actions>
  </q-card>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "HomeChatChatsComponent",
  setup() {
    const messages = ref([
      {
        id: 1,
        name: "я",
        message: "hey, how are you?",
        isSent: true,
        img: "https://cdn.quasar.dev/img/avatar4.jpg",
        stamp: "7 minutes ago",
      },
      {
        id: 2,
        name: "John Johnson",
        message: "doing fine, how r you?",
        isSent: false,
        img: "https://cdn.quasar.dev/img/avatar3.jpg",
        stamp: "4 minutes ago",
      },
      {
        id: 3,
        name: "я",
        message: "???",
        isSent: true,
        img: "https://cdn.quasar.dev/img/avatar4.jpg",
        stamp: "7 minutes ago",
      },
      {
        id: 4,
        name: "я",
        message: "wtf???",
        isSent: true,
        img: "https://cdn.quasar.dev/img/avatar4.jpg",
        stamp: "6 minutes ago",
      },
      {
        id: 5,
        name: "John Johnson",
        message: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        isSent: false,
        img: "https://cdn.quasar.dev/img/avatar3.jpg",
        stamp: "3 minutes ago",
      },
      {
        id: 6,
        name: "John Johnson",
        message: "And you?",
        isSent: false,
        img: "https://cdn.quasar.dev/img/avatar3.jpg",
        stamp: "3 minutes ago",
      },
      {
        id: 7,
        name: "я",
        message: "Good, i'm fine. What are you doing now?",
        isSent: true,
        img: "https://cdn.quasar.dev/img/avatar4.jpg",
        stamp: "2 minutes ago",
      },
      {
        id: 8,
        name: "John Johnson",
        message: "Im working now! I will call you after one hour later",
        isSent: false,
        img: "https://cdn.quasar.dev/img/avatar3.jpg",
        stamp: "1 minutes ago",
      },
      {
        id: 9,
        name: "John Johnson",
        message: "Ok???",
        isSent: false,
        img: "https://cdn.quasar.dev/img/avatar3.jpg",
        stamp: "1 minutes ago",
      },
      {
        id: 10,
        name: "я",
        message: "Ok, i'm understand you",
        isSent: true,
        img: "https://cdn.quasar.dev/img/avatar4.jpg",
        stamp: "now",
      },
    ])
    return {
      messages
    }
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
</style>
