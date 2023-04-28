<template>
  <q-header elevated>
    <q-toolbar class="bg-green-10">
      <q-tabs v-model="tab" shrink>
        <q-tab name="chats" label="Чаты" @click="changeTab('Чаты')" />
        <q-tab name="users" label="Пользователи" @click="changeTab('Пользователи')" />
        <q-tab name="sites" label="Сайты" @click="changeTab('Сайты')" />
        <q-tab name="settings" label="Настройки" @click="changeTab('Настройки')" />
      </q-tabs>
      <q-space />
      <q-tabs>
        <div class="home-header__links">
          <a target="_blank" href="#">@support</a>
        </div>
        <div>
          <q-btn flat round dense icon="person">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Role:</div>
                  <div>Admin</div>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="52px">
                    <img src="../assets/user-img.png">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                  <q-btn color="green" label="Logout" push size="sm" v-close-popup />
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
import { useRouter } from "vue-router"

export default defineComponent({
  name: "MainHeaderComponent",
  props: {
    activePage: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const router = useRouter()

    const tab = ref("")

    const changeTab = (needName) => {
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

    onMounted(() => {
      if (props.activePage === "chats") {
        tab.value = "chats"
      }
      if (props.activePage === "users") {
        tab.value = "users"
      }
      if (props.activePage === "sites") {
        tab.value = "sites"
      }
      if (props.activePage === "settings") {
        tab.value = "settings"
      }
    })

    return {
      tab,
      changeTab
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
