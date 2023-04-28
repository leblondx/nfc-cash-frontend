<template>
  <q-page>
    <HomeHeader activePage="confirm" />
    <div class="main-confirm q-pa-lg">
      <div class="main-confirm__title">Подтверждение</div>
      <div class="main-confirm__content">
        <HomeConfirmTable />
      </div>
      <div v-if="isEmpty">
        <HomeConfirmEmpty />
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

import HomeHeader from "../components/HomeHeader.vue"
import HomeConfirmTable from "../components/HomeConfirmTable.vue"
import HomeConfirmEmpty from "../components/HomeConfirmEmpty.vue"

export default defineComponent({
  name: "HomeConfirmPage",
  setup() {
    const isEmpty = ref(false)
    return {
      isEmpty,
    }
  },
  components: {
    HomeHeader,
    HomeConfirmTable,
    HomeConfirmEmpty
  }
})
</script>

<style lang="scss" scoped>
.main-confirm {
  width: 100%;
  height: 100%;
}

.main-confirm__title {
  font-size: 26px;
  color: #000;
}

.main-confirm__content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 25px;
  padding: 30px 30px 50px 30px;
}

@media (max-width: 768px) {
  .main-confirm__content {
    padding: 30px 20px 50px 20px;
  }
}

@media (max-width: 667px) {
  .main-confirm__content {
    padding: 30px 10px 50px 10px;
  }
}
</style>
