<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="main-chat-name">
        <div class="main-chat-name__title">ID:</div>
        <div class="main-chat-name__text">9hcpyuib22a</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="main-chat-info">
        <div class="main-chat-info__date">
          <div class="main-chat-info__date_title">Дата создания:</div>
          <div class="main-chat-info__date_text">20:30:56 06.10.21</div>
        </div>
        <div class="main-chat-info__lo">
          <div class="main-chat-info__lo_title">Последний онлайн:</div>
          <div class="main-chat-info__lo_text">28 дней назад</div>
        </div>
        <div class="main-chat-info__status">
          <div class="main-chat-info__status_title">Статус:</div>
          <div class="main-chat-info__status_text">Чат закрыт</div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="main-chat-info__actions">
        <div class="main-chat-info__actions_title">Действия</div>
        <div class="main-chat-info__actions_btns">
          <div class="main-chat-info__actions_btns_go">
            <button>Начать</button>
          </div>
          <div class="main-chat-info__actions_btns_cp">
            <div class="main-chat-info__actions_btns_cp_code">
              <button>Получить код</button>
            </div>
            <div class="main-chat-info__actions_btns_cp_pin">
              <button>Получить пин</button>
            </div>
          </div>
          <div class="main-chat-info__actions_btns_reset">
            <button>Сбросить</button>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="main-chat-info__initdata">
        <div class="main-chat-info__initdata_title">Инициализированные данные:</div>
        <div class="main-chat-info__initdata_currency">
          <div class="main-chat-info__initdata_currency_title">Валюта:</div>
          <div class="main-chat-info__initdata_currency_text">250$</div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-scroll-area class="main-chat-info__ui">
        <div class="main-chat-info__userinfo">
          <div class="main-chat-info__userinfo_title">Пользовательская информация:</div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">UserAgent:</div>
            <div class="main-chat-info__userinfo_ui_text">
              Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) Web Mozilla/5.0 (iPhone; CPU iPhone OS
              14_7_1
              like Mac OS X) Web
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">IP:</div>
            <div class="main-chat-info__userinfo_ui_text">
              223.25.64.115
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">ReverseDNS:</div>
            <div class="main-chat-info__userinfo_ui_text">
              223-25-64-115.myrepublic.com.sg
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">CurrentURL:</div>
            <div class="main-chat-info__userinfo_ui_text">
              https://pizzahut.rest443/v
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">RefererURL:</div>
            <div class="main-chat-info__userinfo_ui_text">
              https://pizzahut.rest/order/checkout/
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">Language:</div>
            <div class="main-chat-info__userinfo_ui_text">
              EN
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">OS:</div>
            <div class="main-chat-info__userinfo_ui_text">
              iPhone
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">Browser:</div>
            <div class="main-chat-info__userinfo_ui_text">
              Handheld Browser
            </div>
          </div>
          <div class="main-chat-info__userinfo_ui">
            <div class="main-chat-info__userinfo_ui_title">affId:</div>
            <div class="main-chat-info__userinfo_ui_text">
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <div class="main-chat-info__back">
        <div class="main-chat-info__back_btn">
          <button @click="goBack">
            <q-icon class="main-chat-info__back_icon" name="arrow_back"></q-icon>
            Назад
          </button>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { useRouter } from "vue-router"

export default defineComponent({
  name: "HomeChatInfoComponent",
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.push("/home/chats")
    }
    return {
      goBack
    }
  }
})
</script>

<style lang="scss" scoped>
.main-chat-name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-chat-name__title {
  font-size: 18px;
  font-weight: 600;
}

.main-chat-name__text {
  font-size: 16px;
  margin-left: 5px;
}

.main-chat-info__date {
  display: flex;
}

.main-chat-info__date_title {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}

.main-chat-info__date_text {
  margin: 1px 0 0 5px;
}

.main-chat-info__lo {
  display: flex;
}

.main-chat-info__lo_title {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}

.main-chat-info__lo_text {
  margin: 1px 0 0 5px;
}

.main-chat-info__status {
  display: flex;
  align-items: center;
}

.main-chat-info__status_title {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}

.main-chat-info__status_text {
  margin-left: 5px;
  font-size: 11px;
  color: #fff;
  background-color: #1b5e20;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #efefefd4;
}

.main-chat-info__status_textw {
  color: #000;
  background-color: #ffa500;
}

.main-chat-info__status_textc {
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
}

.main-chat-info__actions_title {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}

.main-chat-info__actions_btns {
  margin: 10px 0;
}

.main-chat-info__actions_btns_go>button {
  cursor: pointer;
  width: 100%;
  height: 39px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #008000;
  color: #fff;
}

.main-chat-info__actions_btns_go>button:hover {
  background-color: #008000c2;
}

.main-chat-info__actions_btns_cp {
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  margin-top: 13px;
}

.main-chat-info__actions_btns_cp_code>button {
  cursor: pointer;
  // width: 340px;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #1976d2;
  color: #fff;
}

.main-chat-info__actions_btns_cp_code>button:hover {
  background-color: #1976d2d4;
}

.main-chat-info__actions_btns_cp_pin {
  margin-top: 10px;
}

.main-chat-info__actions_btns_cp_pin>button {
  cursor: pointer;
  // width: 340px;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #1976d2;
  color: #fff;
}

.main-chat-info__actions_btns_cp_pin>button:hover {
  background-color: #1976d2d4;
}

.main-chat-info__actions_btns_reset {
  margin-top: 13px;
}

.main-chat-info__actions_btns_reset>button {
  cursor: pointer;
  width: 100%;
  height: 37px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #f2c037;
  color: #fff;
}

.main-chat-info__actions_btns_reset>button:hover {
  background-color: #f2c037d9;
}

.main-chat-info__initdata_title {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}

.main-chat-info__initdata_currency {
  display: flex;
  margin-top: 10px;
}

.main-chat-info__initdata_currency_title {
  width: 50%;
  font-size: 15px;
  font-weight: 600;
  color: #000;
}

.main-chat-info__initdata_currency_text {
  margin-top: 1.5px;
  width: 50%;
  font-size: 14px;
  color: #000;
}

.main-chat-info__ui {
  height: 335px;
  max-width: 100%
}

.main-chat-info__userinfo_title {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}

.main-chat-info__userinfo_ui {
  display: flex;
  // padding: 8px 0;
  margin-top: 10px;
}

.main-chat-info__userinfo_ui_title {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}

.main-chat-info__userinfo_ui_text {
  margin: 1px 0 0 10px;
  font-size: 14px;
  color: #000;
}

.main-chat-info__back {
  width: 100%;
}

.main-chat-info__back_icon {
  font-size: 16px;
  color: #000;
}

.main-chat-info__back_btn>button {
  cursor: pointer;
  width: 100%;
  height: 55px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #e0e0e0;
  color: #000;
}

.main-chat-info__back_btn>button:hover {
  background-color: #cfcfcf;
}

// @media (max-width: 1920px) {
//   .main-chat-info__ui {
//     height: 409px;
//   }

//   .main-chat-info__back {
//     margin-top: 0;
//   }
// }

@media (max-width: 1600px) {
  .main-chat-info__ui {
    height: 229px;
    max-width: 100%;
  }

  .main-chat-info__back {
    margin-top: 0;
  }
}

@media (max-width: 1536px) {
  .main-chat-name__title {
    font-size: 16px;
  }

  .main-chat-name__text {
    font-size: 14px;
  }

  .main-chat-info__date_title {
    font-size: 13px;
  }

  .main-chat-info__date_text {
    font-size: 12px;
  }

  .main-chat-info__lo_title {
    font-size: 13px;
  }

  .main-chat-info__lo_text {
    font-size: 12px;
  }

  .main-chat-info__status_title {
    font-size: 13px;
  }

  .main-chat-info__status_text {
    font-size: 10px;
  }

  .main-chat-info__actions_title {
    font-size: 16px;
  }

  .main-chat-info__actions_btns_go>button {
    height: 37px;
    font-size: 14px;
  }

  .main-chat-info__actions_btns_cp_code>button {
    height: 33px;
    font-size: 12px;
  }

  .main-chat-info__actions_btns_cp_pin>button {
    height: 33px;
    font-size: 12px;
  }

  .main-chat-info__actions_btns_reset>button {
    height: 35px;
    font-size: 12px;
  }

  .main-chat-info__initdata_title {
    font-size: 16px;
  }

  .main-chat-info__initdata_currency_title {
    font-size: 13px;
  }

  .main-chat-info__initdata_currency_text {
    font-size: 12px;
  }

  .main-chat-info__userinfo_title {
    font-size: 16px;
  }

  .main-chat-info__ui {
    height: 222px;
  }

  .main-chat-info__userinfo_ui_title {
    font-size: 13px;
  }

  .main-chat-info__userinfo_ui_text {
    font-size: 12px;
  }

  .main-chat-info__back_btn>button {
    height: 53px;
    font-size: 12px;
  }
}

@media (max-width: 1366px) {
  .main-chat-info__actions_btns {
    margin: 5px 0;
  }

  .main-chat-info__actions_btns_cp {
    margin-top: 10px;
  }

  .main-chat-info__actions_btns_reset {
    margin-top: 10px;
  }

  .main-chat-info__ui {
    height: 150px;
  }

  .main-chat-info__back_btn>button {
    height: 45px;
    font-size: 11px;
  }
}

@media (max-width: 1280px) {
  .main-chat-info__ui {
    height: 182px;
  }
}

@media (max-width: 1194px) {
  .main-chat-info__ui {
    height: 216px;
  }
}

@media (max-width: 1180px) {
  .main-chat-info__ui {
    height: 202px;
  }
}

@media (max-width: 1080px) {
  .main-chat-info__ui {
    height: 192px;
  }
}

@media (max-width: 1024px) {
  .main-chat-info__ui {
    height: 185px;
  }

  .main-chat-name__title {
    font-size: 14px;
  }

  .main-chat-name__text {
    font-size: 12px;
  }

  .main-chat-info__date_title {
    font-size: 11px;
  }

  .main-chat-info__date_text {
    font-size: 10px;
  }

  .main-chat-info__status_title {
    font-size: 11px;
  }

  .main-chat-info__status_text {
    font-size: 8px;
  }

  .main-chat-info__actions_title {
    font-size: 14px;
  }

  .main-chat-info__actions_btns_go>button {
    height: 34px;
    font-size: 12px;
  }

  .main-chat-info__actions_btns_cp_code>button {
    height: 30px;
    font-size: 10px;
  }

  .main-chat-info__actions_btns_cp_pin>button {
    height: 30px;
    font-size: 10px;
  }

  .main-chat-info__actions_btns_reset>button {
    height: 32px;
    font-size: 10px;
  }

  .main-chat-info__initdata_title {
    font-size: 14px;
  }

  .main-chat-info__initdata_currency_title {
    font-size: 11px;
  }

  .main-chat-info__initdata_currency_text {
    font-size: 10px;
  }

  .main-chat-info__userinfo_title {
    font-size: 14px;
  }

  .main-chat-info__userinfo_ui_title {
    font-size: 11px;
  }

  .main-chat-info__userinfo_ui_text {
    font-size: 10px;
  }

  .main-chat-info__back_btn>button {
    height: 40px;
    font-size: 10px;
  }

  .main-chat-info__back_icon {
    font-size: 12px;
  }
}

@media (max-width: 834px) {
  .main-chat-info__ui {
    height: 181px;
  }
}

@media (max-width: 568px) {
  .main-chat-name {
    padding: 10px 0;
  }

  .main-chat-name__title {
    font-size: 12px;
  }

  .main-chat-name__text {
    font-size: 10px;
  }

  .main-chat-info {
    padding: 10px 0;
  }

  .main-chat-info__date_title {
    font-size: 9px;
  }

  .main-chat-info__date_text {
    font-size: 8px;
  }

  .main-chat-info__lo_title {
    font-size: 9px;
  }

  .main-chat-info__lo_text {
    font-size: 8px;
  }

  .main-chat-info__status_title {
    font-size: 9px;
  }

  .main-chat-info__status_text {
    font-size: 7px;
  }

  .main-chat-info__actions {
    padding: 10px 0;
  }

  .main-chat-info__actions_title {
    font-size: 12px;
  }

  .main-chat-info__actions_btns_go>button {
    height: 28px;
    font-size: 10px;
  }

  .main-chat-info__actions_btns_cp_code>button {
    height: 24px;
    font-size: 8px;
  }

  .main-chat-info__actions_btns_cp_pin>button {
    height: 24px;
    font-size: 8px;
  }

  .main-chat-info__actions_btns_reset>button {
    height: 26px;
    font-size: 8px;
  }

  .main-chat-info__initdata {
    padding: 10px 0;
  }

  .main-chat-info__initdata_title {
    font-size: 11px;
  }

  .main-chat-info__initdata_currency_title {
    font-size: 9px;
  }

  .main-chat-info__initdata_currency_text {
    font-size: 8px;
  }

  .main-chat-info__userinfo_title {
    font-size: 11px;
  }

  .main-chat-info__ui {
    height: 266px;
  }

  .main-chat-info__userinfo_ui_title {
    font-size: 9px;
  }

  .main-chat-info__userinfo_ui_text {
    font-size: 8px;
  }

  .main-chat-info__back_btn>button {
    height: 40px;
    font-size: 9px;
  }
}

@media (max-width: 375px) {
  .main-chat-name {
    padding: 0;
  }

  .main-chat-info {
    padding: 0;
  }

  .main-chat-info__actions {
    padding: 0;
  }

  .main-chat-info__initdata {
    padding: 0;
  }
}
</style>
