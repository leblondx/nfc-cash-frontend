<template>
  <div class="main">
    <div class="container">
      <div class="main-content fixed-center">
        <div class="main-content__icon">
          <q-icon name="priority_high" />
        </div>
        <div class="main-content__title">Восстановление пароля</div>
        <div class="main-content__text">Время жизни ссылки для восстановления пароля истекла</div>
        <div class="main-content__text">Перейдите на страницу "Забыли пароль?" и заполните форму ещё раз</div>
        <div class="main-content__text">Для перехода на страницу Забыли пароль нажмите кнопку "Забыли пароль?"</div>
        <div class="main-content__link">
          <button @click="goToForgot">Забыли пароль?</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"

export default defineComponent({
  name: "ExpLinkRecoveryPasswordPage",
  setup() {
    const $q = useQuasar()
    const router = useRouter()

    const notifyNeed = (needMessage, needType, needPosition, needTimeout) => {
      $q.notify({
        type: needType,
        message: needMessage,
        progress: true,
        position: needPosition,
        timeout: needTimeout
      })
    }

    notifyNeed("Ссылка для восстановления пароля истекла", "warning", "top-right", 2000)

    const goToForgot = () => {
      $q.loading.show()
      setTimeout(() => {
        $q.loading.hide()
        router.push("/forgot-password")
      }, 3000)
    }

    return {
      goToForgot
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: #f2c037;
}

.container {
  margin: 0 auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 900px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content__icon {
  margin-bottom: 15px;
}

.main-content__icon>i {
  font-size: 56px;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background-color: #fff;
  color: #f2c037;
}

.main-content__title {
  margin-bottom: 32px;
  font-size: 24px;
  color: #fff;
}

.main-content__text {
  font-size: 16px;
  color: #fff;
  text-align: center;
}

.main-content__link>button {
  cursor: pointer;
  color: #f2c037;
  border: none;
  background-color: #fff;
  padding: 14px 16px;
  display: inline-block;
  margin-top: 32px;
  border-radius: 6px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
}

@media (max-width: 1024px) {
  .main-content__title {
    margin-bottom: 28px;
    font-size: 20px;
  }

  .main-content__text {
    font-size: 14px;
  }

  .main-content__link>button {
    font-size: 14px;
    border: none;
  }
}

@media (max-width: 780px) {
  .main-content__title {
    margin-bottom: 20px;
  }
}

@media (max-width: 667px) {
  .main-content__icon>i {
    font-size: 40px;
    width: 50px;
    height: 50px;
  }

  .main-content__title {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .main-content__text {
    font-size: 12px;
  }

  .main-content__link>button {
    font-size: 12px;
    border: none;
  }
}

@media (max-width: 568px) {
  .main-content__title {
    margin-bottom: 20px;
  }
}

@media (max-width: 375px) {
  .main-content__title {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .main-content__text {
    font-size: 11px;
  }

  .main-content__link>button {
    font-size: 11px;
    border: none;
  }
}

@media (max-width: 320px) {
  .main-content__icon>i {
    font-size: 35px;
    width: 45px;
    height: 45px;
  }

  .main-content__title {
    margin-bottom: 18px;
    font-size: 12px;
  }

  .main-content__text {
    font-size: 10px;
  }

  .main-content__link>button {
    margin-top: 22px;
    border: none;
    font-size: 10px;
  }
}
</style>
