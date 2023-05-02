<template>
  <div class="main-chats__empty fixed-center">
    <div class="main-chats__empty_icon">
      <q-icon name="hourglass_disabled" />
    </div>
    <div class="main-chats__empty_title">Пусто</div>
    <div class="main-chats__empty_text">Список чатов пуст</div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "HomeChatsEmptyComponent",
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.main-chats__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-chats__empty_icon {
  margin-bottom: 10px;
}

.main-chats__empty_icon>i {
  font-size: 56px;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background-color: #fff;
  color: #1b5e20;
}

.main-chats__empty_title {
  margin-bottom: 15px;
  font-size: 24px;
  color: #1b5e20;
}

.main-chats__empty_text {
  font-size: 16px;
  color: #1b5e20;
  text-align: center;
}

@media (max-width: 1024px) {
  .main-chats__empty_title {
    margin-bottom: 28px;
    font-size: 20px;
  }

  .main-chats__empty_text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .main-chats__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 667px) {
  .main-chats__empty_icon>i {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .main-chats__empty_title {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .main-chats__empty_text {
    font-size: 12px;
  }
}

@media (max-width: 568px) {
  .main-chats__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 375px) {
  .main-chats__empty_title {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .main-chats__empty_text {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  .main-chats__empty_icon>i {
    font-size: 35px;
    width: 45px;
    height: 45px;
  }

  .main-chats__empty_title {
    margin-bottom: 18px;
    font-size: 12px;
  }

  .main-chats__empty_text {
    font-size: 10px;
  }
}
</style>
