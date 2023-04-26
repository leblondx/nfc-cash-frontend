<template>
  <div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router"

import { useVerifyStore } from "../stores/verify"

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const verifyStore = useVerifyStore()

    if (route.fullPath.split("/").length === 4) {
      (async () => {
        const formData = {
          uid: route.params.id
        }
        await verifyStore.actCheckEmailVerify(formData)
        if (verifyStore.isCheckVerifyEmail === true) {
          router.push("/notify/a-verify-email")
        } else {
          await verifyStore.actEmailVerify(route.params.id)
          if (verifyStore.isVerifyEmail === true) {
            router.push("/notify/s-verify-email")
          } else {
            router.push("/notify/e-verify-email")
          }
        }
      })()
    }

    return {}
  }
})
</script>

<style lang="scss" scoped></style>
