<template>
  <div class="main-chat__empty">
    <div class="main-chat__empty_icon">
      <q-icon name="hourglass_disabled" />
    </div>
    <div class="main-chat__empty_title">Пусто</div>
    <div class="main-chat__empty_text">В чате нет сообщений</div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "HomeChatChatsEmpty",
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.main-chat__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.main-chat__empty_icon {
  margin-bottom: 10px;
}

.main-chat__empty_icon>i {
  font-size: 56px;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  background-color: #fff;
  color: #1b5e20;
}

.main-chat__empty_title {
  margin-bottom: 15px;
  font-size: 20px;
  color: #1b5e20;
}

.main-chat__empty_text {
  font-size: 16px;
  color: #1b5e20;
  text-align: center;
}

@media (max-width: 1024px) {
  .main-chat__empty_title {
    margin-bottom: 28px;
    font-size: 20px;
  }

  .main-chat__empty_text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .main-chat__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 667px) {
  .main-chat__empty_icon>i {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .main-chat__empty_title {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .main-chat__empty_text {
    font-size: 12px;
  }
}

@media (max-width: 568px) {
  .main-chat__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 375px) {
  .main-chat__empty_title {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .main-chat__empty_text {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  .main-chat__empty_icon>i {
    font-size: 35px;
    width: 45px;
    height: 45px;
  }

  .main-chat__empty_title {
    margin-bottom: 18px;
    font-size: 12px;
  }

  .main-chat__empty_text {
    font-size: 10px;
  }
}
</style>
