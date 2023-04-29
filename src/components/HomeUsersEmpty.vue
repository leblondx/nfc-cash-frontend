<template>
  <div class="main-users__empty fixed-center">
    <div class="main-users__empty_icon">
      <q-icon name="hourglass_disabled" />
    </div>
    <div class="main-users__empty_title">Пусто</div>
    <div class="main-users__empty_text">Список пользователей пуст</div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "HomeUsersEmptyComponent",
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.main-users__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-users__empty_icon {
  margin-bottom: 10px;
}

.main-users__empty_icon>i {
  font-size: 56px;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background-color: #fff;
  color: #1b5e20;
}

.main-users__empty_title {
  margin-bottom: 15px;
  font-size: 24px;
  color: #1b5e20;
}

.main-users__empty_text {
  font-size: 16px;
  color: #1b5e20;
  text-align: center;
}

@media (max-width: 1024px) {
  .main-users__empty_title {
    margin-bottom: 28px;
    font-size: 20px;
  }

  .main-users__empty_text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .main-users__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 667px) {
  .main-users__empty_icon>i {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .main-users__empty_title {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .main-users__empty_text {
    font-size: 12px;
  }
}

@media (max-width: 568px) {
  .main-users__empty_title {
    margin-bottom: 20px;
  }
}

@media (max-width: 375px) {
  .main-users__empty_title {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .main-users__empty_text {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  .main-users__empty_icon>i {
    font-size: 35px;
    width: 45px;
    height: 45px;
  }

  .main-users__empty_title {
    margin-bottom: 18px;
    font-size: 12px;
  }

  .main-users__empty_text {
    font-size: 10px;
  }
}
</style>
