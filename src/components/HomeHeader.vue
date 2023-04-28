<template>
  <q-dialog v-model="confirmLogoutAccount" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="exit_to_app" color="green" text-color="white" />
        <span class="q-ml-sm">Вы действительно хотите выйти?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="green" v-close-popup />
        <q-btn flat label="Выйти" color="green" @click="logoutAccount" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-header elevated>
    <q-toolbar class="bg-green-10">
      <q-tabs v-model="tab" shrink>
        <q-tab name="chats" label="Чаты" @click="changeTab" />
        <q-tab v-if="isAdmin || isSuperAdmin" name="users" label="Пользователи" @click="changeTab" />
        <q-tab v-if="isAdmin || isSuperAdmin" name="confirm" label="Подтверждение" @click="changeTab" />
        <q-tab v-if="isAdmin || isSuperAdmin" name="sites" label="Сайты" @click="changeTab" />
        <q-tab name="settings" label="Настройки" @click="changeTab" />
      </q-tabs>
      <q-space />
      <q-tabs>
        <div class="home-header__links">
          <a target="_blank" href="#">@поддержка</a>
        </div>
        <div>
          <q-btn flat round dense icon="person">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Роль:</div>
                  <div style="font-size:13px">{{ userProfile[0].role === 'user' ? 'Пользователь' : userProfile[0].role ===
                    'admin' ?
                    'Администратор' : userProfile[0].role === 'super-admin' ? 'Супер администратор' : '' }}</div>
                </div>
                <q-separator vertical inset class="q-mx-lg" />
                <div class="column items-center">
                  <q-avatar size="42px">
                    <img src="../assets/user-img.png">
                  </q-avatar>
                  <div class="text-subtitle1 q-mt-md q-mb-xs" style="font-size: 13px;">{{ userProfile[0].username }}</div>
                  <q-btn color="green" label="Выйти" push size="sm" @click="showConfirmLogoutAccount" />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script lang="js">
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia'

import { useUserStore } from "../stores/user"

export default defineComponent({
  name: "MainHeaderComponent",
  props: {
    activePage: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const $q = useQuasar()
    const router = useRouter()

    const { userProfile, isAdmin, isSuperAdmin } = storeToRefs(useUserStore())
    const userStore = useUserStore()

    const tab = ref("")
    const confirmLogoutAccount = ref(false)

    if (props.activePage === "chats") {
      tab.value = "chats"
    }
    if (props.activePage === "users") {
      tab.value = "users"
    }
    if (props.activePage === "sites") {
      tab.value = "sites"
    }
    if (props.activePage === "confirm") {
      tab.value = "confirm"
    }
    if (props.activePage === "settings") {
      tab.value = "settings"
    }

    const changeTab = () => {
      try {
        if (tab.value === "chats") {
          router.push("/home/chats")
        } else {
          router.push(`/home/${tab.value}`)
        }
      } catch (error) {
        console.log("error in changeTab func -->", error);
      }
    }

    const showConfirmLogoutAccount = () => {
      confirmLogoutAccount.value = true
    }

    const logoutAccount = () => {
      confirmLogoutAccount.value = false
      $q.loading.show()
      localStorage.removeItem("token");
      setTimeout(() => {
        $q.loading.hide()
        router.push("/sign-in")
      }, 3000)
    }

    onMounted(async () => {
      await userStore.actGetUserProfile()
    })

    return {
      tab,
      changeTab,
      showConfirmLogoutAccount,
      confirmLogoutAccount,
      logoutAccount,
      userProfile,
      isAdmin,
      isSuperAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
.home-header__links {
  margin-right: 20px;
}

.home-header__links>a {
  text-decoration: none;
  color: #fff;
}
</style>
