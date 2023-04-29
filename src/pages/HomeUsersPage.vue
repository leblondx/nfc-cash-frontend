<template>
  <q-page>
    <HomeHeader activePage="users" />
    <div class="main-users q-pa-lg">
      <div class="main-users__title">Пользователи</div>
      <div v-if="isEmptyUsers === true" class="main-users__content">
        <HomeUsersTable />
      </div>
      <div v-if="isEmptyUsers === false">
        <HomeUsersEmpty />
      </div>
    </div>
    <div class="main-users__edit">
      <HomeUsersEdit />
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

import HomeHeader from "../components/HomeHeader.vue"
import HomeUsersTable from "../components/HomeUsersTable.vue"
import HomeUsersEmpty from "../components/HomeUsersEmpty.vue"
import HomeUsersEdit from "../components/HomeUsersEdit.vue"

import { useAdminStore } from "../stores/admin"

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const { isEmptyUsers } = storeToRefs(useAdminStore())
    const adminStore = useAdminStore()

    return {
      isEmptyUsers,
    }
  },
  components: {
    HomeHeader,
    HomeUsersTable,
    HomeUsersEmpty,
    HomeUsersEdit
  }
})
</script>

<style lang="scss" scoped>
.main-users {
  width: 100%;
  height: 100%;
}

.main-users__title {
  font-size: 26px;
  color: #000;
}

.main-users__content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 25px;
  padding: 30px 30px 50px 30px;
}

.main-users__content_table {
  width: 100%;
}

.main-users__content_table_row {
  font-size: 14px;
}

@media (max-width: 1440px) {
  .main-users__content_table_row {
    font-size: 13px;
  }
}

@media (max-width: 1280px) {
  .main-users__content_table_row {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .main-users__content {
    padding: 30px 20px 50px 20px;
  }
}

@media (max-width: 667px) {
  .main-users__content {
    padding: 30px 10px 50px 10px;
  }
}

@media (max-width: 428px) {
  .main-users__content_table_row {
    font-size: 11px;
  }
}
</style>
