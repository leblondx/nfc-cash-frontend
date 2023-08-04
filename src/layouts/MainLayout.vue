<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar()
    const router = useRouter()

    const notify = [
      {
        id: 1,
        uid_event: "9uj4v1rtdj1",
        created: "22:00:06 11.10.21",
        lastOnline: "3 second(s) ago",
        status: "Action required"
      },
      {
        id: 2,
        uid_event: "9uj4v1rtdj2",
        created: "22:01:06 11.10.21",
        lastOnline: "3 second(s) ago",
        status: "Action required"
      },
      {
        id: 3,
        uid_event: "9uj4v1rtdj3",
        created: "22:02:06 11.10.21",
        lastOnline: "3 second(s) ago",
        status: "Action required"
      },
      {
        id: 4,
        uid_event: "9uj4v1rtdj4",
        created: "22:03:06 11.10.21",
        lastOnline: "3 second(s) ago",
        status: "Action required"
      }
    ]

    const notifyNeed = (data) => {
      $q.notify({
        message: `
        <div><div><strong style='border-bottom: 1px solid #c4c4c4'>ID</strong>:${data.uid_event}</div><div><strong style='border-bottom: 1px solid #c4c4c4'>Créé</strong>:${data.created}</div><div><strong style='border-bottom: 1px solid #c4c4c4'>Le dernier en ligne</strong>: ${data.lastOnline}</div><div><strong style='border-bottom: 1px solid #c4c4c4'>Statut</strong>: ${data.status}</div></div>`,
        color: 'green',
        multiLine: true,
        position: "top-right",
        html: true,
        actions: [
          {
            label: 'Ouvrir', color: 'yellow', handler: () => {
              router.push(`/home/chats/${data.id}`)
            }
          }
        ]
      })
    }

    // setInterval(() => {
    //   for (let i = 0; i < notify.length; i++) {
    //     notifyNeed(notify[i])
    //   }
    // }, 5000)

    return {}
  }
})
</script>

<style lang="scss" scoped></style>
