<template>
  <q-page>
    <HomeHeader activePage="chats" />
    <div v-if="isEmptyOrders === true" class="main-chats q-pa-lg">
      <div class="main-chats__title">Чаты</div>
      <div class="main-chats__content">
        <div class="main-chats__content__block" v-for="order in getData" :key="order.id">
          <router-link class="main-chats__content__block_link" :to="'/home/chats/' + order.uid_order">
            <div class="main-chats__content__block_name">
              <div class="main-chats__content__block_title">{{ order.uid_order }}</div>
              <div class="main-chats__content__block_date">{{ order.created }}</div>
            </div>
            <div class="main-chats__content__block_lastonline">
              <div class="main-chats__content__block_lastonline_title">Закреплённый пользователь:</div>
              <div class="main-chats__content__block_lastonline_text">
                {{
                  order.member_fixed === "" ? "Свободный заказ" : order.member_fixed
                }}
              </div>
            </div>
            <div class="main-chats__content__block_status">
              <div class="main-chats__content__block_status_title">Статус</div>
              <div class="main-chats__content__block_status_text" :class="{
                  'main-chats__content__block_status_textc': order.status === 'Chat closed',
                  'main-chats__content__block_status_textw': order.status === 'Waiting for user'
                }">
                {{
                  order.status === "Action required" ? "Чат активен" : order.status === "Waiting for user" ?
                  "Ожидает пользователя" : order.status === "Chat closed" ? "Чат закрыт" : ""
                }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="orders.length > 16" class="main-chats__pagination absolute-bottom">
        <q-pagination v-model="page" :min="currentPage" :max="Math.ceil(orders.length / totalPages)" direction-links
          outline color="green" active-design="unelevated" active-color="green" active-text-color="white" />
      </div>
    </div>
    <div v-if="isEmptyOrders === false">
      <HomeChatsEmpty />
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

import HomeHeader from "../components/HomeHeader.vue"
import HomeChatsEmpty from "../components/HomeChatsEmpty.vue"

import { useOrdersStore } from "../stores/orders"

export default defineComponent({
  name: "HomeChatsPage",
  setup() {
    const $q = useQuasar()

    const { orders, isEmptyOrders } = storeToRefs(useOrdersStore())
    const ordersStore = useOrdersStore()

    const page = ref(1)
    const currentPage = ref(1)
    const totalPages = ref(16)

    const getData = computed(() => {
      const calculateNeed = orders.value.slice((page.value - 1) * totalPages.value, (page.value - 1) * totalPages.value + totalPages.value)
      return calculateNeed
    })

    onMounted(async () => {
      $q.loading.show()
      await ordersStore.actGetOrders()
      $q.loading.hide()
    })

    return {
      orders,
      isEmptyOrders,
      getData,
      page,
      currentPage,
      totalPages,
    }
  },
  components: {
    HomeHeader,
    HomeChatsEmpty
  }
})
</script>

<style lang="scss" scoped>
.main-chats {
  width: 100%;
  height: 100%;
  // background-color: #c4c4c4;
}

.main-chats__title {
  font-size: 26px;
  color: #000;
}

.main-chats__pagination {
  // display: none;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

.main-chats__content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 25px;
  padding: 30px 30px 100px 30px;
}

.main-chats__content__block {
  background-color: #efefefd4;
  width: 430px;
  padding: 25px;
  border-radius: 5px;
}

.main-chats__content__block:hover {
  background-color: #dfdede;
}

.main-chats__content__block_link {
  text-decoration: none;
}

.main-chats__content__block_name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-chats__content__block_title {
  font-size: 13px;
  font-weight: 800;
  color: #1b5e20;
}

.main-chats__content__block_date {
  color: #000000d9;
  font-size: 14px;
}

.main-chats__content__block_lastonline {
  display: flex;
  align-items: center;
}

.main-chats__content__block_lastonline_title {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.main-chats__content__block_lastonline_text {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #ffa500;
}

.main-chats__content__block_status {
  display: flex;
  align-items: center;
}

.main-chats__content__block_status_title {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.main-chats__content__block_status_text {
  margin-left: 5px;
  font-size: 11px;
  color: #fff;
  background-color: #1b5e20;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #efefefd4;
}

.main-chats__content__block_status_textw {
  color: #000;
  background-color: #ffa500;
}

.main-chats__content__block_status_textc {
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
}

@media (max-width: 926px) {
  .main-chats__content__block {
    width: 380px;
    padding: 25px;
  }
}

@media (max-width: 844px) {
  .main-chats__content__block {
    padding: 20px;
    width: 350px;
  }
}

@media (max-width: 820px) {
  .main-chats__content__block {
    padding: 18px;
    width: 300px;
  }

  .main-chats__content__block_title {
    font-size: 13px;
  }

  .main-chats__content__block_date {
    font-size: 13px;
  }

  .main-chats__content__block_lastonline_title {
    font-size: 13px;
  }

  .main-chats__content__block_lastonline_text {
    font-size: 13px;
  }

  .main-chats__content__block_status_title {
    font-size: 13px;
  }

  .main-chats__content__block_status_text {
    font-size: 10px;
  }
}

@media (max-width: 768px) {
  .main-chats__content {
    padding: 30px 20px 100px 20px;
  }
}

@media (max-width: 667px) {
  .main-chats__content {
    padding: 30px 10px 100px 10px;
  }

  .main-chats__content__block {
    padding: 18px;
    width: 280px;
  }

  .main-chats__content__block_title {
    font-size: 12px;
  }

  .main-chats__content__block_date {
    font-size: 12px;
  }

  .main-chats__content__block_lastonline_title {
    font-size: 12px;
  }

  .main-chats__content__block_lastonline_text {
    font-size: 12px;
  }

  .main-chats__content__block_status_title {
    font-size: 12px;
  }

  .main-chats__content__block_status_text {
    padding: 1px 3px;
  }
}

@media (max-width: 428px) {
  .main-chats__content__block_title {
    font-size: 12px;
  }
}

@media (max-width: 320px) {
  .main-chats__content__block_title {
    font-size: 11px;
  }

  .main-chats__content__block_date {
    font-size: 11px;
  }

  .main-chats__content__block_lastonline_title {
    font-size: 11px;
  }

  .main-chats__content__block_lastonline_text {
    font-size: 11px;
  }

  .main-chats__content__block_status_title {
    font-size: 11px;
  }
}
</style>
