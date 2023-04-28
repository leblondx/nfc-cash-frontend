<template>
  <q-page>
    <HomeHeader activePage="users" />
    <div class="main-users q-pa-lg">
      <div class="main-users__title">Пользователи</div>
      <div class="main-users__creatu">
        <button @click="userCreateDialog">Создать пользователя</button>
      </div>
      <div class="main-users__content">
        <HomeUsersTable />
      </div>
    </div>
    <div class="main-users__create" v-if="isCreateDialog">
      <HomeUsersCreate :isCreateDialog="isCreateDialog" @isCreateDialogClose="isCreateDialog = false" />
    </div>
    <div class="main-users__edit">
      <HomeUsersEdit />
    </div>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

import HomeHeader from "../components/HomeHeader.vue"
import HomeUsersTable from "../components/HomeUsersTable.vue"
import HomeUsersCreate from "../components/HomeUsersCreate.vue"
import HomeUsersEdit from "../components/HomeUsersEdit.vue"

export default defineComponent({
  setup() {
    const isCreateDialog = ref(false)

    const userCreateDialog = () => {
      isCreateDialog.value = true
    }

    return {
      userCreateDialog,
      isCreateDialog,
    }
  },
  components: {
    HomeHeader,
    HomeUsersTable,
    HomeUsersCreate,
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

.main-users__creatu {
  display: flex;
  justify-content: end;
  padding: 30px 30px 0 30px;
}

.main-users__creatu>button {
  cursor: pointer;
  padding: 8px 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  color: #fff;
  background-color: #21ba45;
  border: none;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 5px;
}

.main-users__creatu>button:hover {
  background-color: #21ba45de;
}

@media (max-width: 1440px) {
  .main-users__content_table_row {
    font-size: 13px;
  }

  .main-users__creatu>button {
    font-size: 13px;
  }
}

@media (max-width: 1280px) {
  .main-users__content_table_row {
    font-size: 12px;
  }

  .main-users__creatu>button {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .main-users__creatu {
    padding: 30px 10px 0 20px;
  }

  .main-users__creatu>button {
    font-size: 11px;
  }

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

@media (max-width: 360px) {
  .main-users__creatu>button {
    padding: 7px 10px;
    font-size: 10px;
  }
}
</style>
