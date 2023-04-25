<template>
  <div>
    <MainHeader activePage="home" />
    Index Page
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import MainHeader from "../components/MainHeader.vue"

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {}
  },
  components: {
    MainHeader
  }
})
</script>

<style lang="scss" scoped></style>
