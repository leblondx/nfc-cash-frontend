<template>
  <q-page>
    <HomeHeader activePage="settings-bot" />
    <div class="main-settings q-pa-lg">
      <div class="main-settings__title">Настройка бота</div>
      <div v-if="isEmptyTelegramBots === false" class="main-settings__content">
        <HomeSettingsBotContent />
      </div>
      <div v-if="isEmptyTelegramBots === true">
        <HomeSettingsBotEmpty />
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

import HomeHeader from "../components/HomeHeader.vue"
import HomeSettingsBotContent from "../components/HomeSettingsBotContent.vue"
import HomeSettingsBotEmpty from "../components/HomeSettingsBotEmpty.vue"

import { useTelegramStore } from "../stores/telegram"

export default defineComponent({
  name: "HomeSettingsPage",
  setup() {
    const $q = useQuasar()

    const { isEmptyTelegramBots } = storeToRefs(useTelegramStore())
    const telegramStore = useTelegramStore()

    onMounted(async () => {
      $q.loading.show()
      await telegramStore.actGetBots()
      $q.loading.hide()
    })
    return {
      isEmptyTelegramBots,
    }
  },
  components: {
    HomeHeader,
    HomeSettingsBotContent,
    HomeSettingsBotEmpty
  }
})
</script>

<style lang="scss" scoped>
.main-settings {
  width: 100%;
  height: 100%;
}

.main-settings__title {
  font-size: 26px;
  color: #000;
}

.main-settings__content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 25px;
  padding: 30px 30px 50px 30px;
}

@media (max-width: 1440px) {
  .main-settings__content_table_row {
    font-size: 13px;
  }
}

@media (max-width: 1280px) {
  .main-settings__content_table_row {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .main-settings__content {
    padding: 30px 20px 50px 20px;
  }
}

@media (max-width: 667px) {
  .main-settings__content {
    padding: 30px 10px 50px 10px;
  }
}

@media (max-width: 428px) {
  .main-settings__content_table_row {
    font-size: 11px;
  }
}
</style>
